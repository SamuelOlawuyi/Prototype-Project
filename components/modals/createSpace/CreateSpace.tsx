import { Link } from 'react-router-dom';
import './CreateSpace.css';
import Button from './../../Button';
import { useState, ChangeEvent, ReactElement } from 'react';
import uploadImage from './../../../assets/images/uploadImage.png';

interface CreateSpaceformProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateSpaceform({ setOpenModal }: CreateSpaceformProps): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="modalBackground"> 
    <div className="create-space-container">
      <form className="create-space-centered-form">
        <div className="create-space-form-input">
          <div className="maintitle-clear">
            <h3 className="create-space-maintitle">Create a Space</h3>
            <svg
              className="icon-clear"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setOpenModal(false);
              }}
              >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#757575"
              /> 
            </svg>
          </div>
          <h6 className="create-space-sub-title1">
            Share your interests, curate content, host discussions, and more.
          </h6>
        </div>

        <div className="create-space-form-input">
          <label className="create-space-title">Name</label>
          <h6 className="create-space-sub-title2">
            You can use your nickname in space.
          </h6>
          <input
            type="text"
            placeholder="Type your name"
            className="create-space-sub-input"
          />
        </div>

        <div className="create-space-form-input">
          <label className="create-space-title">Brief Description</label>
          <textarea
            className="create-space-description"
            placeholder="Write here..."
          />
        </div>

        <div className="create-space-form-input">
          <label className="create-space-title">Attach Picture</label>
          <div className="custom-file-input">
            <input
              type="file"
              id="fileInput"
              className="file-input"
              onChange={(e) => handleFileChange(e)}
            />
            <label htmlFor="fileInput" className="custom-file-label">
              <span className="upload-icon">
                <img
                  src={uploadImage} // Replace with your image icon URL
                  alt="Upload Icon"
                  className="upload-icon"
                />
              </span>
              <span className="upload-text">Upload Image</span>
            </label>
          </div>
        </div>

        <div className="create-space-cancel-create-button">
          <Link to="#" className="create-space-cancel-button"  onClick={() => {
              setOpenModal(false);
            }}>
            <Button
              text="Cancel"
              backgroundColor="#FFFFFF"
              color="#101828"
              width="78px"
            />
          </Link>

          <Link to="#" className="create-space-button">
            <Button
              text="Create Space"
              backgroundColor="#34A853"
              color="#FFFFFF"
              width="124px"
            />
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
}

export default CreateSpaceform;
