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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

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
        backgroundImage: "url(/images/fiu.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 3,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      }}
    >
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1}}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            color: "white",
            mb: 6,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Flashcard Collections
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 10,
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
                    background: "linear-gradient(45deg, #B6862C 30%, #002D72 90%)",
                    borderRadius: 1,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: 'medium',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      }}
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
