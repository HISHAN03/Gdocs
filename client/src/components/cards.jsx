import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./cards.css";

const cardStyle = {
  
  width: "150px",
  height: "200px",
  margin: "10px",
  display: "inline-block",
  cursor: "pointer",
  border: "2px solid transparent", // Start with a transparent border
};


const theme = createTheme({
  typography: {
    fontFamily: "'Your Custom Font', sans-serif", // Change 'Your Custom Font' to your desired font
  },
});

export default function BasicCard({ documentName }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/${documentName}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          ...cardStyle,
          borderColor: isHovered ? "light-blue" : "transparent", // Set border color based on hover state
        }}
        className="cardddddddd"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Set hover state to false on mouse leave
      >
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontSize: "1.2rem" }}>
          </Typography>
      {documentName}  
        </CardContent>
      </Card>
  
      
    </ThemeProvider>
  );
}
