'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

const leftLinks = ['ALL', 'WOMAN', 'MEN'];
const rightLinks = ['WORKOUT', 'RUN', 'FOOTBALL'];

export default function Footer() {
  return (
    <Box component="footer">
      {/* Glory to Ukraine Section - White */}
      <Box
        sx={{
          bgcolor: 'white',
          textAlign: 'center',
          py: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: { xs: '14px', md: '24px' },
            lineHeight: 1,
            letterSpacing: 0,
            textTransform: 'uppercase',
            color: 'text.secondary',
            display: 'block',
            mb: 1,
          }}
        >
          THANKS FOR WATCHING
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: { xs: '28px', md: '48px' },
            lineHeight: 1,
            letterSpacing: 0,
            mb: 1,
          }}
        >
          Glory to Ukraine
        </Typography>

        {/* Ukrainian Flag Image */}
        <Box
          component="img"
          src="/ukr.png"
          alt="Ukraine Flag"
          sx={{
            width: 60,
            height: 40,
            mt: 1,
            mx: 'auto',
            display: 'block',
          }}
        />
      </Box>

      {/* Main Black Footer */}
      <Box sx={{ bgcolor: 'black', width: '100%', position: 'relative', zIndex: 0 }}>
        <Box
          sx={{
            color: 'white',
            width: '100%',
            maxWidth: 1400,
            mx: 'auto',
            minHeight: { xs: 'auto', md: 280 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            px: { xs: 3, md: 8 },
            py: { xs: 5, md: 0 },
            gap: { xs: 4, md: 0 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Center - Nike Swoosh (shown first on mobile via order) */}
          <Box
            sx={{
              position: { xs: 'static', md: 'absolute' },
              left: { md: '50%' },
              transform: { md: 'translateX(-50%)' },
              width: { xs: 140, md: 380 },
              height: { xs: 96, md: 260 },
              order: { xs: -1, md: 0 },
              flexShrink: 0,
            }}
          >
            {/* Bottom layer - animated GIF */}
            <Box
              component="img"
              src="/f8a397411dd98da96eb45b0e651b5a782c9383d7.gif"
              alt="Nike Swoosh"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 1,
              }}
            />
            {/* Top layer - static Nike vector */}
            <Box
              component="img"
              src="/Vector (25).png"
              alt="Nike Swoosh"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                zIndex: 2,
              }}
            />
          </Box>

          {/* Links row on mobile, columns on desktop */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: { xs: 4, md: 2.5 },
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
            }}
          >
            {leftLinks.map((link) => (
              <Typography
                key={link}
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.85rem' },
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                  transition: 'opacity 0.2s',
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* Right Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              gap: { xs: 4, md: 2.5 },
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'center',
              textAlign: { xs: 'center', md: 'right' },
            }}
          >
            {rightLinks.map((link) => (
              <Typography
                key={link}
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.85rem' },
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.7 },
                  transition: 'opacity 0.2s',
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}