import React, { useState, useRef, useEffect } from "react";
import { RiLoader2Line } from "react-icons/ri";
import useUserStore from '../../Zustand_State/UserStore.js';
import useAuthStore from '../../Zustand_State/AuthStore.js';
import LoginG from "../../components/Google_Login/LoginG.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import "./Homepage.css";

let hasFetchedUserStatusGlobal = false;

const Mainpage = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState("python");
  const [file, setFile] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [languagelimiterror, setLanguagelimiterror] = useState(false);
  const [formatError, setFormatError] = useState('');
  const fileInputRef = useRef(null);

  //For DialogBox
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ message: "", fileList: [] });

  const {
    setConRedMessage,
    validationCheck,
    lineLimitError,
    setLineLimitError,
    convertFile,
    conRedMessage,
    isLoading,
    setIsLoading,
    fetchUserStatus,
    languages, allowedLanguages, extensions,
    UserStatusLoading,
  } = useUserStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser && !hasFetchedUserStatusGlobal) {
      fetchUserStatus();
      hasFetchedUserStatusGlobal = true;
    }
    if (!authUser) {
      hasFetchedUserStatusGlobal = false;
    }
  }, [authUser, fetchUserStatus]);

  // Reset state when user logs out or changesconvert
  useEffect(() => {
    if (!authUser) {
      // resetUserState(); 
      setTimeout(() => setFileType("python"), 0);
      setFileType("python");
      setFile(null);
      setShowLoginPopup(false);
      setLanguagelimiterror(false);
      setFormatError('');
      setLineLimitError('');
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [authUser, setLineLimitError])

  const processFileUpload = async (file) => {
    setFormatError('');
    setLanguagelimiterror(false);
    setLineLimitError(false);
    if (!file) return false;



    if (!allowedLanguages.includes(fileType)) {
      setLanguagelimiterror(true);
      setFormatError('');
      return false;
    }

    // Check if extension is allowed
    const validExts = extensions[fileType] || [];
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!validExts.includes(ext)) {
      setFormatError(`Invalid file format. Allowed: ${validExts.join(', ')}`);
      setLanguagelimiterror(false);
      return false;
    }


    // All validations passed
    setFormatError('');
    setLanguagelimiterror(false);
    return true;
  };

  const handleFiletypeChange = (e) => {
    const selected = e.target.value;
    setFileType(selected);
    setFile(null);
    setFormatError('');
    setLanguagelimiterror(false);
    setLineLimitError(false);

    if (!allowedLanguages.includes(selected)) {
      setLanguagelimiterror(true);
    } else {
      setLanguagelimiterror(false);
    }
  };

  const handleFileChange = async (e) => {
    // Reset conRedMessage at the start of a new upload
    setConRedMessage(""); // <-- Add this line

    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);


    setLineLimitError('');
    const passedValidation = await processFileUpload(uploadedFile);
    if (!passedValidation) {
      setIsLoading(false);
      setConRedMessage(""); // <-- Reset here too
      return;
    }
    const res = await validationCheck(uploadedFile, fileType);

    const messageHtml = `
  <div style="margin-bottom: 10px;">
    ${res?.message?.replace(/\n/g, "<br/>") || "Do you want to proceed?"}
  </div>
  <div style="
    max-height: 150px;
    overflow-y: auto;
    background: #f1f1f1;
    padding: 10px;
    border-radius: 5px;
    font-size: 13px;
    text-align: left;
    border: 1px solid #ddd;
  ">
    <ul style="margin: 0; padding-left: 20px;">
      ${res?.processing_files_list?.map(file => `<li>${file}</li>`).join('')}
    </ul>
  </div>
`;

    const result = await Swal.fire({
      title: "Are you sure?",
      html: messageHtml,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      didOpen: () => {
        // Enable or disable the "Yes" button based on res.flag
        const confirmBtn = Swal.getConfirmButton();
        if (confirmBtn) {
          confirmBtn.disabled = !res?.flag;
        }
      }
    });


    if (!result.isConfirmed) {
      setFile(null);
      setConRedMessage(""); // <-- Reset here too
      if (fileInputRef.current) fileInputRef.current.value = ""; // <-- Reset here
      return;
    }

    // setIsLoading(true);

    await convertFile(uploadedFile, fileType);


    if (fileInputRef.current) fileInputRef.current.value = "";
  };



  // Intercept click on upload area
  const handleUploadAreaClick = (e) => {
    if (!authUser || !allowedLanguages.includes(fileType)) {
      e.preventDefault();
      setShowLoginPopup(!authUser); // Only show login if not logged in
      return;
    }
    // Reset file input value before opening dialog
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // Intercept drag and drop
  const handleDrop = async (e) => {
    e.preventDefault();
    if (!authUser) {
      setShowLoginPopup(true);
      return;
    }
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fakeEvent = { target: { files: e.dataTransfer.files } };
      await handleFileChange(fakeEvent);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  if (UserStatusLoading) {
    return (
      <div className="loader-fullscreen">
        <RiLoader2Line className="loader-icon" />
        <p>Loading user status...</p>
      </div>
    );
  }

  return (
    <>
      <div className="upload-container">
        <h2>CONVERT CODE TO DOCUMENT</h2>
        <p className="description">
          Auto-generate detailed documentation from any code snippet.
          <br />
          Break down logic, syntax, and structure step by step.
          <br />
          Ideal for teaching, reviewing, or sharing.
        </p>

        <div className="dropdown-section">
          <label htmlFor="fileType">Choose your Code</label>
          <select
            id="fileType"
            value={fileType}
            onChange={handleFiletypeChange}
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div
          className={`upload-area ${!allowedLanguages.includes(fileType) ? 'disabled-upload' : ''}`}
          onClick={handleUploadAreaClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          tabIndex={0}
          style={{ cursor: "pointer" }}
        >
          <span className="upload-inline">
            <span className="upload-icon" style={{ verticalAlign: "middle", fontSize: "28px" }}>
              📄
            </span>
            <span
              className="upload-text"
              style={{
                color: "#0056d2",
                fontWeight: "bold",
                margin: "0 6px",
              }}
            >
              Click to upload
            </span>
            or Drag and Drop File or Image.
            <span className="file-info">
              {fileType && extensions[fileType]
                ? `Allowed: ${extensions[fileType].join(", ")}`
                : ""}
              &nbsp; (max: 10MB). Up to 400 lines of code allowed.
            </span>
          </span>
          <input
            type="file"
            id="fileUpload"
            className="file-input"
            onChange={handleFileChange}
            tabIndex={-1}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
        </div>

        {/* Error messages */}
        {lineLimitError && <p className='error-text'> {lineLimitError} </p>}
        {formatError && <p className="error-text">{formatError}</p>}
        {languagelimiterror && (
          <p style={{ color: 'red', marginTop: '8px' }}>
            This language is not allowed for your account. Allowed: {allowedLanguages.join(", ")}
          </p>
        )}

        {/* Status and Download */}
        {file && (
          <div className="status-container">
            <span className="file-name">{file.name}</span>
            <span className="status">
              {isLoading ? (
                <>
                  <RiLoader2Line className="rotating" size={20} color="#0b3d91" />
                  &nbsp; Processing...
                </>
              ) : conRedMessage ? (
                (() => {
                  // Show toast and navigate only once
                  if (!window.__hasNavigatedToDownloads) {
                    window.__hasNavigatedToDownloads = true;
                    toast.success(conRedMessage || "File converted successfully!");
                    setTimeout(() => {
                      navigate("/downloads");
                      window.__hasNavigatedToDownloads = false;
                    }, 1200); // Delay for user to see the toast
                  }
                  return null;
                })()
              ) : null}
            </span>
          </div>
        )}
      </div>

      {/* Login popup/modal */}
      {showLoginPopup && (
        <div
          className="modal-backdrop"
          onClick={() => setShowLoginPopup(false)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <LoginG onClose={() => setShowLoginPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Mainpage;