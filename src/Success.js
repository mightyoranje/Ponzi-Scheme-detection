// // Success.js

// import React, { useState } from 'react';

// const Success = () => {
//   // State to store the selected file
//   const [selectedFile, setSelectedFile] = useState(null);
//   // State to store the result from the backend
//   const [result, setResult] = useState(null);
//   // State to store any error message
//   const [error, setError] = useState(null);

//   // Function to handle file selection
//   const handleFileSelect = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // Function to send file to the backend
//   const sendFileToBackend = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await fetch('http://localhost:5000/success', {
//         method: 'POST',
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setResult(data.result);
//         setError(null); // Reset error state
//         console.log(data.result)
//       } else {
//         setError('Failed to upload file.');
//         // Reset result state if needed
//         setResult(null);
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setError('Error uploading file. Please try again.');
//       // Reset result state if needed
//       setResult(null);
//     }
//   };

//   return (
//     <div className='div'>
//       <h1>Ponzi Scheme Detection System</h1>
//       <input type="file" onChange={handleFileSelect} />
      
//       <button onClick={sendFileToBackend}>Check</button>

//       {/* Display result */}
//       {result && (
//         <div>
//           <h2>Result:</h2>
//             <p>{result.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}</p>
//         </div>
//       )}

//       {/* Display error message */}
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Success;

import React, { useState } from 'react';

function FileUploadPage() {
  
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);


  const [wordResult, setWordResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    setFile(selectedFile);
  };
  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
      };

      

  // const handleSubmit = () => {
  //   // Simulate processing the file and extracting a word
  //   if (file) {
  //     // For demonstration purposes, we'll just extract the first word from the file name
  //     const fileName = file.name;
  //     const word = fileName.split('.')[0];
  //     setWordResult(word);
  //   }
  // };

  const handleDragOver = (e) => {
    e.preventDefault();
  };



  const sendFileToBackend = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/success', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setWordResult(data.result);
        setError(null); // Reset error state
        console.log(data.result)
      } else {
        setError('Failed to upload file.');
        // Reset result state if needed
        setWordResult(null);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
      // Reset result state if needed
      setWordResult(null);
    }
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-white">
      <div className="max-w-xl w-full p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Ponzi Scheme Detection</h1>
        <div className="w-full bg-gray-100 border border-gray-200 rounded-lg shadow-lg p-8 mb-8 flex flex-col items-center justify-center"
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}>
          <input type="file" className="hidden" onChange={handleFileChange} accept=".txt" />
          <label htmlFor="fileInput" className="cursor-pointer text-blue-500 font-semibold mb-4">
            Drag & drop or click to upload a file (.txt)
          </label>
          {file && (
            <div className="text-gray-600 mb-4">
              File Selected: {file.name}
            </div>
          )}
          <input className=" text-gray-700" type="file" onChange={handleFileSelect} />
        </div>
        
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 focus:outline-none"
          onClick={sendFileToBackend}>
          Submit
        </button>
        {error && <p>{error}</p>}
        {wordResult && (
          <div className="mt-8 text-lg text-gray-800 font-semibold">
            Result: <span className="text-blue-500">{wordResult}</span>

          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full py-4 bg-gradient-to-t from-blue-500 to-indigo-600 text-center text-sm">
        Made with ❤️ by Aryan Patel
      </div>
    </div>
  );
}

export default FileUploadPage;
