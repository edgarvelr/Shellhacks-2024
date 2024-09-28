'use client'

import { Box, Typography, AppBar, Toolbar, Button, UserButton, } from "@mui/material";
import { SignedOut, SignedIn } from "@clerk/nextjs";

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
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{flexGrow: 1}}>
        Panther Pal
      </Typography>
      <SignedOut>
        <Button color="inherit" href="/sign-in">Login</Button>
        <Button color="inherit" href="/sign-up">Sign Up</Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Toolbar>
  </AppBar>
  </Box>

  );
}
