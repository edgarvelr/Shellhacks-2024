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
import { keyframes } from "@mui/material";

const HeaderGradientText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(to right, #f0f0f0, #5a66d6)", // Gradient colors
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
  fontSize: "6rem",
  animation: `shimmer 2s linear infinite, fadeIn 2s ease-in-out`,
  "@keyframes shimmer": {
    "0%": {
      backgroundPosition: "-200% 0",
    },
    "100%": {
      backgroundPosition: "200% 0",
    },
  },
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "5rem", // Size for large screens
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "4rem", // Size for medium screens
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem", // Size for small screens
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "2rem", // Size for extra small screens
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeInButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #1b1e80 30%, #80751b 90%)",
  color: "white",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "10px",
  boxShadow: "0px 4px 15px rgba(0, 191, 166, 0.4)",
  textTransform: "none",
  transition: "all 0.3s ease",
  animation: `${fadeIn} 1s ease-in`,
  "&:hover": {
    background: "linear-gradient(45deg, #80751b 30%, #1b1e80 90%)",
    boxShadow: "0px 6px 20px rgba(0, 191, 166, 0.6)",
  },
}));

export default function Home() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
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
      <Toolbar position="fixed">
        <Typography variant="h6" style={{ flexGrow: 1 }} />
        <SignedOut>
          <Button sx={{ color: "white" }} href="/sign-in">
            {" "}
            Login{" "}
          </Button>
          <Button sx={{ color: "white" }} href="/sign-up">
            {" "}
            Signup{" "}
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Centers vertically
          alignItems: "center", // Centers horizontally
          height: "100vh", // Full viewport height
          textAlign: "center",
          paddingBottom: "150px", // Adjust according to AppBar heigh
        }}
      >
        <Typography variant="h2" gutterBottom color="white">
          {" "}
          <HeaderGradientText>PantherPal</HeaderGradientText>
        </Typography>{" "}
        <SignedIn>
          <FadeInButton
            sx={{
              background: "linear-gradient(45deg, #1b1e80 30%, #80751b 90%)", // Tropical gradient colors
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px", // Rounded corners for a fun look
              boxShadow: "0px 4px 15px rgba(0, 191, 166, 0.4)", // Tropical color shadow
              textTransform: "none", // Keeps text casing normal
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #80751b 30%, #1b1e80 90%)", // Invert colors on hover
                boxShadow: "0px 6px 20px rgba(0, 191, 166, 0.6)",
              },
            }}
            href="/selection"
          >
            Get Started
          </FadeInButton>
        </SignedIn>
        <SignedOut>
          <FadeInButton
            sx={{
              background: "linear-gradient(45deg, #1b1e80 30%, #80751b 90%)", // Tropical gradient colors
              color: "white",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px", // Rounded corners for a fun look
              boxShadow: "0px 4px 15px rgba(0, 191, 166, 0.4)", // Tropical color shadow
              textTransform: "none", // Keeps text casing normal
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #80751b 30%, #1b1e80 90%)", // Invert colors on hover
                boxShadow: "0px 6px 20px rgba(0, 191, 166, 0.6)",
              },
            }}
            href="/sign-in"
          >
            Sign In
          </FadeInButton>
        </SignedOut>
      </Box>
    </Box>
  );
}
