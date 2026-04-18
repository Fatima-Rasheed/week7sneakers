'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      {/* --- MAIN HERO BANNER --- */}
      <Box
        sx={{
          width: '100%', 
          height: { xs: '220px', md: '300px' },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'black',
        }}
      >
        {/* 1. Background Image */}
        <Image
          src="/hero.png" 
          alt="Nike 50th Anniversary"
          fill
          style={{
            objectFit: 'cover',
            zIndex: 0,
          }}
          priority
        />

        {/* 2. Text Overlay Content */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: { xs: '20px', md: '60px' },
            color: 'white',
            zIndex: 1,
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              lineHeight: 0.9,
              mb: 1.5,
              fontFamily: 'var(--font-montserrat)',
            }}
          >
            We Are Never Done
          </Typography>

          <Typography
            variant="body2"
            sx={{
              maxWidth: { xs: '100%', md: '540px' },
              mb: 3,
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 900,
              lineHeight: 1.4,
              opacity: 0.9,
              pr: { xs: '80px', md: '0px' }, // ensure text doesn't overlap with QR code on mobile if keeping it
            }}
          >
            Celebrating 50 years of Nike from May 16th! Exclusive products, 
            experiences and much more await you for five days. 
            Scan and join the Nike app!
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: 'white',
              color: 'black',
              borderRadius: '12px',
              px: 4,
              py: 1,
              fontWeight: 700,
              width: 'fit-content',
              fontSize: '0.75rem',
              '&:hover': { bgcolor: '#e0e0e0' },
            }}
          >
            Celebrate with us
          </Button>
        </Box>

        {/* 3. QR Code Overlay */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'block' },
            position: 'absolute',
            top: { xs: '20px', md: '30px' },
            right: { xs: '20px', md: '10%', lg: '25%' },
            width: { xs: '70px', md: '90px' },
            height: { xs: '70px', md: '90px' },
            bgcolor: 'white',
            p: '6px',
            borderRadius: '4px',
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url(/qr-code.png)', 
              backgroundSize: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* --- 4. NEW TICKER SECTION (IMAGE LINK) --- */}
      <Box
        sx={{
          width: '100%',
          height: '40px', // Matches the height shown in screenshot
          position: 'relative',
          borderTop: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white'
        }}
      >
        {/* This represents the 'JUST DO IT' scrolling/static image bar */}
        <Image 
          src="/img.gif" // Use the image file containing the 'JUST DO IT' logos
          alt="Nike Ticker Tape"
          fill
          style={{ objectFit: 'contain' }} 
        />
      </Box>
    </Box>
  );
}