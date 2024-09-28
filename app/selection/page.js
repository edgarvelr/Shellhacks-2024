"use client";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { styled } from "@mui/system";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: 2, // Space between the boxes
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/images/fiu.jpg)", // Image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5, // Adjust the opacity of the background image
            zIndex: -1, // Ensures the background is behind the content
          },
        }}
      />
      <Box
        sx={{
          width: "250px", // Set width for each box
          height: "250px", // Set height for each box
          backgroundColor: "transparent", // Transparent white
          boxShadow: "0 4px 15px rgba(0, 0, 0, 1)", // Shadow effect
          borderRadius: "10px", // Rounded corners
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Chatbot
        </Typography>
        <Typography variant="h8" gutterBottom>
          This chatbot will answer any question you need. Just input your
          question and you will be met with your answer!
        </Typography>

        <Button variant="contained" color="primary" href="/chatbot">
          Select
        </Button>
      </Box>

      <Box
        sx={{
          width: "250px", // Set width for each box
          height: "250px", // Set height for each box
          backgroundColor: "transparent", // Transparent white
          boxShadow: "0 4px 15px rgba(0, 0, 0, 1)", // Shadow effect
          borderRadius: "10px", // Rounded corners
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Flashcards
        </Typography>
        <Typography variant="h8" gutterBottom>
          You will be able to create flashcards based off of the topic you input. Practice your topic with ease!
        </Typography>
        <Button variant="contained" color="primary" href="/generate">
          Select
        </Button>
      </Box>
    </Box>
  );
}
