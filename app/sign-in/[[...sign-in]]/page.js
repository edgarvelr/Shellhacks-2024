import { SignIn } from "@clerk/nextjs";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Link,
  Box,
} from "@mui/material";

export default function SignUpPage() {
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
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <SignIn />
    </Box>
  );
}
