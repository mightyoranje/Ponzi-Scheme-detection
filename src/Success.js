// Success.js

import React, { useState } from 'react';

const Success = () => {
  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State to store the result from the backend
  const [result, setResult] = useState(null);
  // State to store any error message
  const [error, setError] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to send file to the backend
  const sendFileToBackend = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/success', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        setError(null); // Reset error state
        console.log(data.result)
      } else {
        setError('Failed to upload file.');
        // Reset result state if needed
        setResult(null);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
      // Reset result state if needed
      setResult(null);
    }
  };

  return (
    <div className='div'>
      <h1>Ponzi Scheme Detection System</h1>
      <input type="file" onChange={handleFileSelect} />
      
      <button onClick={sendFileToBackend}>Check</button>

      {/* Display result */}
      {result && (
        <div>
          <h2>Result:</h2>
            <p>{result.map((item, index) => (
              <li key={index}>{item}</li>
            ))}</p>
        </div>
      )}

      {/* Display error message */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Success;
