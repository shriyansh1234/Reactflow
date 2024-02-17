import React, { useState, useEffect } from 'react';
import './index.css';

export default () => {
  const [documents, setDocuments] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newDocumentName, setNewDocumentName] = useState('');

  // use this to add more documents in the ui or add it directly to the list at the bottom
  // useEffect(() => {
  //    Load documents from localStorage when the component mounts
  //   const storedDocuments = JSON.parse(localStorage.getItem('documents')) || [];
  //   setDocuments(storedDocuments);
  // }, []);

  const onDragStart = (event, label) => {
    event.dataTransfer.setData('application/reactflow', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleRunButtonClick = () => {
    // Handle the "Run" button click event
  };

  // const handleAddButtonClick = () => {
  //   setShowInput(true);
  // };

  // const handleConfirmButtonClick = () => {
  //   if (newDocumentName.trim() === '') {
  //     // Prevent adding an empty document name
  //     return;
  //   }

    // Add a new document to the list in state
  //   const newDocument = {
  //     type: newDocumentName,
  //     id: Date.now(),
  //   };

  //   setDocuments((prevDocuments) => [...prevDocuments, newDocument]);

  //   // Save updated documents to localStorage
  //   localStorage.setItem('documents', JSON.stringify([...documents, newDocument]));

  //   setNewDocumentName(''); // Clear the input field after adding a document
  //   setShowInput(false); // Hide the input field after adding a document
  // };

  return (
    <div className="dndflow">
      <aside className="sidebar">
        <div className="documents">
          You can drag these documents to the pane on the right to create a workflow. <br>
          </br>
         
          
        
          {/* <div className="dndnode add" onClick={handleAddButtonClick}>
            
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 12H19"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div> */}

          {/* Editable field for new document name (conditionally rendered) */}
          {/* {showInput && (
            <div>
              <input
                type="text"
                placeholder="Enter document name"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
              />
              <button onClick={handleConfirmButtonClick}>Confirm</button>
            </div>
          )} */}

          {/* Display existing documents */}
          {documents.map((document) => (
            <div
              key={document.id}
              className="dndnode"
              onDragStart={(event) => onDragStart(event, document.label)}
              draggable
            >
              {document.label}
            </div>
          ))}

          <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Upload Document')} draggable>
            Upload Document
          </div>
          <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Redline Document')} draggable>
            Redline Document
          </div>
          <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Research Document')} draggable>
            Research Document
          </div>
          <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Run Analytics')} draggable>
            Run Analytics
          </div>
          To delete any document or connecting edge from the workflow press "backspace" key after clicking on them
        </div>
        <div className="run-buttons">
          <div className="run-button" onClick={() => handleRunButtonClick()}>
            Run
          </div>
        </div>
      </aside>
    </div>
  );
};
