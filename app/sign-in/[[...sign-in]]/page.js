import { SignIn } from "@clerk/nextjs"
import { AppBar, Container, Toolbar, Typography, Button, Link, Box} from "@mui/material"

export default function SignUpPage(){
    return (
    <Box 
    sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(to bottom, #000046, #000000)',
    }}
    maxWidth="100vw">
        <Box
        display = "flex"
        flexDirection = "column"
        alignItems = "center"
        justifyContent = "center"
        >
            <Typography
            variant = "h4"
            gutterBottom>
                 Sign In
            </Typography>
            <SignIn />

        </Box>
    </Box>
    
)
}