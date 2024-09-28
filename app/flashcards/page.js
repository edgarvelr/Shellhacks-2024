"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Box,
  Drawer,
  CardActionArea,
  Card,
  Grid,
  CardContent,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import { db } from "@/firebase";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url(/images/fiu.jpg)", // Image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 3,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: "white", mb: 4 }}
        >
          Flashcard Collections
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleCardClick(flashcard.name)}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
