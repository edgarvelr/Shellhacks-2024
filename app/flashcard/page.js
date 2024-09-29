"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, docRef } from "firebase/firestore";
import { db } from "@/firebase";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  Drawer,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      async function getFlashcard() {
        if (!search) return;
  
        const colRef = collection(doc(collection(db, "users"), user.id), search);
        const docs = await getDocs(colRef);
        const flashcards = [];
        docs.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
      }
  
      getFlashcard();
    }
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  
  return (
    <Box sx={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}
    >
  
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/images/fiu.jpg)', // Image path
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.5, // Adjust the opacity of the background image
              zIndex: -1, // Ensures the background is behind the content
            },
          }}
        />

<Toolbar // Taskbar with different pages
        sx={{
          position: "fixed",
          width: "100%",
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
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }} />
        <SignedOut>
          <Button sx={{ color: "white" }} href="/sign-in">
            Login
          </Button>
          <Button sx={{ color: "white" }} href="/sign-up">
            Signup
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            background: "#261482", // Custom background color
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header inside Drawer */}
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor: "transparent",
              color: "#fff",
            }}
          >
            <Typography variant="h6">PantherPal</Typography>
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
                  backgroundColor: "#002D72",
                  color: "#B6862C",
                  "&:hover": {
                    backgroundColor: "#B6862C",
                    color: "#002D72",
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
                  backgroundColor: " #002D72",
                  color: "#B6862C",
                  "&:hover": {
                    backgroundColor: "#B6862C",
                    color: "#002D72",
                  },
                }}
              >
                chatbot
              </Button>
            </Box>
            <Box sx={{ my: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="#B6862C"
                href="/generate"
                sx={{
                  my: 1,
                  backgroundColor: " #002D72",
                  color: "#B6862C",
                  "&:hover": {
                    backgroundColor: "#B6862C",
                    color: "#002D72",
                  },
                }}
              >
                Generate
              </Button>
            </Box>
            <Box sx={{ my: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="#B6862C"
                href="/flashcards"
                sx={{
                  my: 1,
                  backgroundColor: "#002D72",
                  color: "#B6862C",
                  "&:hover": {
                    backgroundColor: "#B6862C",
                    color: "#002D72",
                  },
                }}
              >
                Flashcards
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>

      {flashcards.length > 0 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            mb: "8px",
          }}
        >
          <Typography variant="h3" align="center" sx={{ mb: 17 }}>
            Preview
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handlePrev} sx={{ color: "white" }}>
              <ArrowBack />
            </IconButton>

            <Card
              sx={{
                maxWidth: 280,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <CardActionArea onClick={() => handleCardClick(currentIndex)}>
                <CardContent>
                  <Box
                    sx={{
                      perspective: "1000px",
                      width: "250px",
                      height: "200px",
                      "& > div": {
                        transition: "transform 0.6s",
                        transformStyle: "preserve-3d",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        boxShadow: "0 4px 8px 0 rgba(0,0,0, 0.2)",
                        transform: flipped[currentIndex]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      },
                      "& > div > div": {
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                        boxSizing: "border-box",
                      },
                      "& > div > div:nth-of-type(2)": {
                        transform: "rotateY(180deg)",
                      },
                    }}
                  >
                    <div>
                      <div>
                        <Typography variant="h5" sx={{ fontSize: "1.1rem" }}>
                          {flashcards[currentIndex].front}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h5" sx={{ fontSize: "1.1rem" }}>
                          {flashcards[currentIndex].back}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>

            <IconButton onClick={handleNext} sx={{ color: "white" }}>
              <ArrowForward />
            </IconButton>
          </Box>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          </Box>
        </Box>
      )}
    </Box>
  );
}
