 'use client'

import { Box, Typography, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { styled } from '@mui/system';



const HeaderGradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(to right, #f0f0f0, #5a66d6)', // Gradient colors
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: '',
  fontWeight: 'bold',
  fontSize: '6rem',
  animation: `shimmer 2s linear infinite, fadeIn 2s ease-in-out`,
'@keyframes shimmer': {
  '0%': {
    backgroundPosition: '-200% 0',
  },
  '100%': {
    backgroundPosition: '200% 0',
  },
},
'@keyframes fadeIn': {
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
},
  [theme.breakpoints.down('lg')]: {
    fontSize: '5rem', // Size for large screens
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '4rem', // Size for medium screens
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem', // Size for small screens
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '2rem', // Size for extra small screens
  },
}));

export default function Home() {
  return (
  <Box sx={{
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: 'url(/images/fiu.jpg)'
  }}
  >
    <Toolbar position="fixed">
        <Typography variant="h6" style={{ flexGrow: 1 }} />
        <SignedOut>
          <Button sx={{ color: 'white' }} href="/sign-in">
            {" "}
            Login{" "}
          </Button>
          <Button sx={{ color: 'white' }} href="/sign-up">
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
        <Typography
          variant="h2"
          gutterBottom
          color="white"
        >
          {" "}
          <HeaderGradientText>PantherPal</HeaderGradientText>
        </Typography>{" "}
      </Box>
  </Box>

  );
}
