import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'Layout';
import classnames from 'classnames';
import { PulseLoader } from 'react-spinners';
import './RoomsList.css';

import axios from 'axios';

class RoomsList extends Component {
  constructor(props) {
    super(props);
  }

  state = {  
    rooms: null
  }

  componentDidMount() {
    this.getRooms();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.rooms === null)
      this.getRooms();
  }

  getRooms = () => {
    axios.get(`${location.protocol}//${location.hostname}:${location.port}/api/history`)
      .then(res => {   
        let roomlist = []

        res.data.filter(x => x.status == "active").map(row => {
          roomlist.push({
            name: row.room
          });
        });

        this.setState({ rooms: roomlist });
      });
  }

  render() { 
    /* default props */
    const { id, className, contentClassName, children, style } = this.props;
    /* Rooms List props */
    const { show, toggle, fade, changeRoom } = this.props;
    const { rooms } = this.state;
    let classNames = classnames(
      className, fade ? "fade-in" : ``
    );

    return (  
      <Modal id={"rooms"} show={show} toggle={toggle}
        className={classNames} contentClassName={contentClassName}>
        <ModalHeader>
          <h2>Super Chat Room List</h2>
          <h4>Please select a room:</h4>
        </ModalHeader>
        <ModalBody>
          { rooms ?
              rooms.length ?
                rooms.map(room => 
                  <div key={room.name} id={room.name} className="room" onClick={changeRoom}>{room.name}</div>
                )
              : <h3 className="center-absolute">There are currently no active chat rooms.</h3>
            : <div className="loading center-absolute">
                <h3>
                  Hi there! We are finding some rooms for you.
                  <br/>This will take a moment...
                </h3>
                <PulseLoader />
              </div>
          }
        </ModalBody>
      </Modal>
    );
  }
}
 
export { RoomsList };