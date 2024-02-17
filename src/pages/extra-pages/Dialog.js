// Dialog.jsx
import React from 'react';
import Modal from 'react-modal';
import { Button } from '@mui/material';

const Dialog = ({dialogObjs, id, isOpen, onClose}) => {

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
        <p>To delete node please press "backspace" key</p>
      
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default Dialog;
