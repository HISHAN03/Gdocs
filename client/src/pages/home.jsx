import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ResponsiveAppBar from "../components/navbar"
import BasicCard from "../components/cards"
import "./home.css"
import CreateDac from "../components/createDoc/index"

export default function Home() {
  const [socket, setSocket] = useState();
  const [documentName, setDocumentName] = useState("");
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    if (documentName) {
      navigate(`/${documentName}`);
    }
  };
 
 // Function to handle document button click and redirect to the document
  const handleDocumentClick = (document) => {
    const documentName = document._id; // Assuming the document name is stored in the _id property
    navigate(`/${documentName}`);
  };

  useEffect(() => {
    const s = io("http://localhost:3000");
    s.emit("id-send", documentName);
    setSocket(s);
    s.emit("getdoc");

    s.on("gotdoc", documents => {
      setDocuments(documents);
    });

    return () => {
      s.disconnect();
    };
  }, [documentName]);

  return (
    <>

    <ResponsiveAppBar />
    <CreateDac setDocumentName={setDocumentName} />

      <div>
        {/* <h1>Create a New Document</h1>
        <input
          type="text"
          placeholder="Enter Document Name"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <button onClick={handleCreateDocument}>Create Document</button> */}

        <div className="cards-section">
          <p className="subhead" >Open recent docs</p>
        {documents.map((document, index) => (
          <BasicCard
            key={index}
            documentName={document._id}
            onClick={handleDocumentClick}
          />
        ))}
      </div>
    </div>
   
  </>
  );
}
