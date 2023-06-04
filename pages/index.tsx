import { Grid, Card, CardHeader, Box, Typography } from '@mui/material'
import { EntryList, NewEntry } from '@/components/ui'

import { Layout } from '@/components/layouts'

import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined'

export default function HomePage() {
  return (
    <Layout title='Home'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            {/* <Box>
              <Typography>Pendientes</Typography>
            </Box> */}
            <CardHeader
              title='Pendientes'
              avatar={<PendingActionsOutlinedIcon />}
            />
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='En Progreso' />
            <EntryList status='progress' />
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completadas' />
            <EntryList status='finished' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}
