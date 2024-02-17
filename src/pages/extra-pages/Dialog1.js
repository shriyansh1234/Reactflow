// Dialog.jsx
import React from 'react';

import { Button } from '@mui/material';

const Dialog1 = ({dialogObjs, isOpen, onClose }) => {

    const clickTest = () =>{
        console.log("button test")
        dialogObjs('test1')
    };

  return (
    
    <Button className = 'refresh-button' onClick = {clickTest} >TEST</Button>
  );
};

export default Dialog1;
