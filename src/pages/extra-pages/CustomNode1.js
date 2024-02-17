// CustomNode1.jsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import './style.css';
import Dialog1 from './Dialog1';

export default function CustomNode1({dialogObjs}) {

  return (
    <div>
        <Dialog1 
        dialogObjs = {dialogObjs}
        />
    </div>
  );
}

