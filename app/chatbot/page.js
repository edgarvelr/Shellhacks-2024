'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, useEffect, useRef } from 'react'


export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi I am Fiu's Studying assistant",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessage('') 
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },  
      { role: 'assistant', content: '' }, 
      
      

    ])

    setIsLoading(true) 

    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      });

      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader()  
      const decoder = new TextDecoder() 

      let result = ''

      await reader.read().then(function processText({ done, value }) {
        if (done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true })  
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]  
          let otherMessages = messages.slice(0, messages.length - 1)  
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text }, 
          ]
        })
        return reader.read().then(processText)  
      })
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)  
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: "url(/images/fiu.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid rgba(255, 255, 255, 0.3)"
        p={2}
        spacing={3}
        bgcolor="transparent"
        borderRadius={4}
        sx={{
          backdropFilter: 'blur(3px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor="#002D72"  
                color={message.role === 'assistant' ? '#B6862C' : '#B6862C'}                
                color="#B6862C"
                borderRadius={16}
                p={3}
                sx={{
                  maxWidth: '80%',
                  wordWrap: 'break-word',
                }}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            sx={{
            backgroundColor: '#002D72',  // Blue background for the input box
            color: '#B6862C',            // Gold color for the input text
            '& .MuiInputBase-root': {
            backgroundColor: '#002D72',  // Ensure the input field background stays blue
            color: '#B6862C',            // Gold text inside the input
          },
          '& .MuiInputLabel-root': {
          color: '#B6862C',            // Gold color for the label
          },
        }}
              
          />
          <Button variant="contained" onClick={sendMessage} disabled={isLoading}

          sx={{
          backgroundColor: '#002D72', // Blue color
          color: '#B6862C',           // Gold color for the text
          '&:hover': {
          backgroundColor: '#B6862C', // Slightly darker blue on hover (optional)
  },
}}
          
          >
            
            {isLoading ? 'Sending...' : 'Send'}
            
          </Button>
        </Stack>
      </Stack>
    </Box>
 )
}


  