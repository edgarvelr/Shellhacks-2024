"use client";
import { useState, useMemo } from "react";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer
} from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";


export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => () => {
    setDrawerOpen(false); // Close the drawer
    router.push(path); // Navigate to the selected page
  };

  const FeatureCard = ({ title, description, link }) => (
    <Box
      sx={{
        width: 280,
        height: 280,
        backgroundColor: 'transparent',
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
        transform: 'scale(1.05)',
        },
        backdropFilter: "blur(3px)",
      }}
    >
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1">{description}</Typography>
      <Button variant="contained" color="primary" href={link} sx={{ mt: 2 }}>
        Select
      </Button>
    </Box>
  );


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
      <Toolbar 
        sx={{
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          zIndex: 1200,
        }} 
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }} />
        <SignedOut>
          <Button sx={{ color: 'white' }} href="/sign-in">Login</Button>
          <Button sx={{ color: 'white' }} href="/sign-up">Signup</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            background: '#261482', // Custom background color
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header inside Drawer */}
          <Box sx={{ p: 2, textAlign: 'center', backgroundColor: 'transparent', color: '#fff' }}>
            <Typography variant="h6" >PantherPal</Typography>
          </Box>

          {/* Buttons for Navigation */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ my: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="#B6862C"
                href="/"
                sx={{
                  my: 1,
                  backgroundColor: '#002D72',
                  color: '#B6862C',
                  '&:hover': {
                    backgroundColor: '#B6862C',
                    color:'#002D72'
                  },
                }}
              >
                Home
              </Button>
            </Box>
            <Box sx={{ my: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="#B6862C"
                href="/chatbot"
                sx={{
                  my: 1,
                  backgroundColor: ' #002D72',
                  color: '#B6862C',
                  '&:hover': {
                    backgroundColor: '#B6862C',
                    color:'#002D72'
                  },
                }}
              >
                Chatbot
              </Button>
            </Box>
            <Box sx={{ my: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="#B6862C"
                href ="/generate"
                sx={{
                  my: 1,
                  backgroundColor: '#002D72',
                  color: '#B6862C',
                  '&:hover': {
                    backgroundColor: '#B6862C',
                    color:'#002D72'
                  },
                }}
              >
                Flashcards
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
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


      <FeatureCard 
      title = "Chatbot" 
      description = "Get answers to any question you need. Just input your question and receive an instant response!"
      link = '/chatbot'/>

      {/* <Box
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
          backdropFilter: 'blur(3px)',
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
      </Box> */}

    <FeatureCard 
      title = "Flashcards" 
      description = "Create flashcards based on your chosen topic. Practice and reinforce your knowledge with ease!"
      link = '/generate'/>


    </Box>
  );
}
