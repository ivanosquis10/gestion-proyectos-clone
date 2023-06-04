import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { useUiContext } from '../../hooks/useUiContext'

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const Sidebar = () => {
  const { sidemenuOpen, handleCloseMenu } = useUiContext()
  return (
    <Drawer anchor='left' open={sidemenuOpen} onClose={handleCloseMenu}>
      <Box
        sx={{
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h6'>Dashboard</Typography>
        <IconButton onClick={handleCloseMenu}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ width: 200 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item}>
              <ListItemIcon>
                {index % 2 ? (
                  <InboxOutlinedIcon />
                ) : (
                  <MarkEmailReadOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item}>
              <ListItemIcon>
                {index % 2 ? (
                  <InboxOutlinedIcon />
                ) : (
                  <MarkEmailReadOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
