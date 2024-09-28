'use client'

import { Box, Typography, AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
  <Box sx={{
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(to bottom, #000046, #000000)',
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
          <Typography>Panther Pal</Typography>
        </Typography>{" "}
        <Typography variant="h5" gutterBottom color="white">
          <Typography
          sx={{}}
          >Your Personal Study Pal</Typography>
        </Typography>
      </Box>
  </Box>

  );
}
