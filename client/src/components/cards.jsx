import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./cards.css"
const cardStyle = {
  width: "150px",
  height: "200px",
  margin: "10px",
  display: "inline-block",
  cursor: "pointer",
};

const theme = createTheme({
  typography: {
    fontFamily: "'Your Custom Font', sans-serif", // Change 'Your Custom Font' to your desired font
  },
});

export default function BasicCard({ documentName }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${documentName}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={cardStyle} onClick={handleCardClick}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontSize: "1.2rem" }}>
            {documentName}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
