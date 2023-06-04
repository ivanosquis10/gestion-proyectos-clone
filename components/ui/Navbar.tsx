import NextLink from 'next/link'

import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { useUiContext } from '@/hooks/useUiContext'

export const Navbar = () => {
  const { handleOpenMenu } = useUiContext()
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton onClick={handleOpenMenu} size='large'>
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink href='/' passHref style={{ textDecoration: 'none' }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='h5'>
            OpenJira
          </Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
