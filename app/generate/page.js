"use client";
import { useUser } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  writeBatch,
  getFirestore,
} from "firebase/firestore";
import {
  Toolbar,
  Typography,
  Button,
  Box,
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
  Container,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { db } from "@/firebase";
import MenuIcon from "@mui/icons-material/Menu";


export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const SaveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
  
    try {
      const batch = writeBatch(db);
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);
  
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        if (collections.find((f) => f.name === name)) {
          alert("Flashcard collection with the same name already exists");
          return;
        } else {
          collections.push({ name });
          batch.set(userDocRef, { flashcards: collections }, { merge: true });
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] });
      }
  
      const colRef = collection(userDocRef, name);
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef);
        batch.set(cardDocRef, flashcard);
      });
  
      await batch.commit();
      handleClose();
      router.push("/flashcards");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter some text to generate flashcards.");
      return;
    }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to generate flashcards");
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("An error occurred while generating flashcards. Please try again.");
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [currentIndex, setCurrentIndex] = useState(0);

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
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#ffffff" }}

          >
            Generate Flashcards
          </Typography>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: 1,
              backdropFilter: "blur(3px)",
            }}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "white" } }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{
              mb: 4,
              py: 1.5,
              fontWeight: "bold",
              backgroundImage: "linear-gradient(to right, #4b6cb7, #182848)",
              "&:hover": {
                backgroundImage: "linear-gradient(to right, #182848, #4b6cb7)",
              },
            }}
          >
            Generate Flashcards
          </Button>
        </Box>

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
            <Typography
              variant="h5"
              align="center"
              sx={{ mb: 2, color: "#ffffff" }}
            >
              Flashcards Preview
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={handlePrev} sx={{ color: "white" }}>
                <ArrowBack />
              </IconButton>

              <Card
                sx={{
                  maxWidth: 280,
                  boxShadow: "0 4px 8px rgba(255, 255, 255, 0.2)",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
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
                          boxShadow: "0 4px 8px 0 rgba(255,255,255, 0.2)",
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
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "1.1rem", color: "white" }}
                          >
                            {flashcards[currentIndex].front}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="h5"
                            sx={{ fontSize: "1.1rem", color: "white" }}
                          >
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundImage:
                    "linear-gradient(to right, #4b6cb7, #182848)",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #182848, #4b6cb7)",
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { backgroundColor: "#1a1a2e", color: "white" } }}
        >
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Please enter a name for your flashcards collection
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Collection Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: 1,
                "& .MuiInputBase-input": { color: "white" },
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "white" }}>
              Cancel
            </Button>
            <Button onClick={SaveFlashcards} sx={{ color: "white" }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
