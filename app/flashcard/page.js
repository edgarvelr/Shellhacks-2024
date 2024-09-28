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
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];
      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <Container maxWidth="md">
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
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Flashcards Preview
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
    </Container>
  );
}
