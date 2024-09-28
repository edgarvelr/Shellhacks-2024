'use client'

import { Box, Typography, AppBar, Toolbar, Button, UserButton, } from "@mui/material";
import { SignedOut, SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{flexGrow: 1}}>
        Flashcard SaaS
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

  );
}
