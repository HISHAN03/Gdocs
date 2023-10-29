import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import PlusDocs from "../../assets/plusDocs.png";
import "./index.css"
export default function CreateDoc({ handleCreateDocument,setDocumentName }) {
    const navigate = useNavigate();
  const handleCreateClick = () => {
    const documentName = window.prompt("Enter the document name:");
    if (documentName) {
        setDocumentName(documentName)
        navigate(`/${documentName}`);
    }
   // Call the function to create the document with the provided name
  };

  return (
    <div className="new-doc-container">
      <div className="new-doc-inner">
        <p id="head">Start a new document</p>
        <img
          className="start-doc"
          src={PlusDocs}
          alt="w"
          onClick={handleCreateClick}
        />
        <p>Blank</p>
      </div>
    </div>
  );
}
