import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box, IconButton } from '@mui/material'
import { MdHeadphones } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom'

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 1 }}>
            <MdHeadphones size="1.5rem" />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            React Audio Player App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 3, backgroundColor: 'background.default' }}>
        <Container maxWidth="md">{children || <Outlet />}</Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ backgroundColor: 'background.paper', py: 1 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()}{' '}
              <Box component="span" sx={{ display: { xs: 'block', sm: 'inline' } }}>
                <IconButton size="small" color="inherit">
                  <MdHeadphones />
                </IconButton>{' '}
                React Audio Player App
              </Box>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
