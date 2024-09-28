"use client";

import { useState } from "react";
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
  Grid,
} from "@mui/material";

import { ArrowBack, ArrowForward } from "@mui/icons-material";

export default function Generate() {
  const [text, setText] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [setName, setSetName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);
  const [flipped, setFlipped] = useState([]);
  const [open, setOpen] = useState(false);


  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }


    try {
      const userDocRef = doc(collection(db, "users"), user.id);
      const userDocSnap = await getDoc(userDocRef);

      const batch = writeBatch(db);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [
          ...(userData.flashcardSets || []),
          { name: setName },
        ];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
      }

      const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
      batch.set(setDocRef, { flashcards });

      await batch.commit();

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
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
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
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
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{
          mt: 4, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column" ,
          mb: "8px"
        }}>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>Flashcards Preview</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handlePrev} sx={{color:"white"}}>
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
  
            <IconButton onClick={handleNext} sx={{color:"white"}}>
              <ArrowForward />
            </IconButton>
          </Box>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained"
          color="primary"
          onClick={handleOpen}
          fullWidth
          sx={{
            borderRadius: 2,
            py: 1.5,
            fontWeight: "bold",
            backgroundImage: "linear-gradient(to right, #f0f0f0, #91bbff)", 
            color: "#1d1d6b",
            "&:hover": {
              backgroundImage: "linear-gradient(to right, #f0f0f0, #6161fa)",
            },
          }}>
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
