import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>EasyShare</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={onUploadClick}>Upload</button>

        {result && (
          <>
            <p>Click the link to download.</p>
            <a href={result} target='_blank' rel="noreferrer">{result}</a>
            <button onClick={copyToClipboard} className="copy-button">Copy Link</button>
          </>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
    </div>
  );
}

export default App;
