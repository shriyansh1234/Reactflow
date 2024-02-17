// Dialog.jsx
import React from 'react';
import Modal from 'react-modal';
import { Button } from '@mui/material';

const Dialog = ({dialogObjs, id, isOpen, onClose}) => {
  
  const handleDelete = () => {
    // Call onDelete with the nodeId when delete is pressed
    console.log(`Deleting label ID ${id}`)
    dialogObjs(id)
    onClose()
  };
   const clickTest = () =>{
        console.log("button test")
        dialogObjs('test1')
    };
  
  // const handleChangeLabel = () => {
  //   onChangeLabel(id, newLabel);
  //   onClose();
  // };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Node Options"
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="modal-content">
        <p>Node Options:{id}</p>
        
        {/* <ul> */}
        
          <li>
            <Button onClick={handleDelete}>Delete Node</Button>
            <Button className = 'refresh-button' onClick = {clickTest} >TEST</Button>
          </li>

          {/* <li>
            <button onClick={handleChangeLabel}>Change Label</button>
          </li> */}
        {/* </ul> */}
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default Dialog;
