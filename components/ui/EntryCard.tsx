import { FC, DragEvent } from 'react'
import { useRouter } from 'next/router'

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'

import { useUiContext } from '@/hooks'
import { Entry } from '@/interfaces'
import { getDateDistanceFromNow } from '@/utils'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { draggingEnd, draggingStart } = useUiContext()
  const router = useRouter()

  // funciones necesarias para que funcione el drag and drop
  const dragStart = (e: DragEvent) => {
    console.log(e)
    e.dataTransfer?.setData('text', entry._id)
    draggingStart()
  }

  const handleClick = () => router.push(`/entries/${entry._id}`)

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={dragStart}
      onDragEnd={draggingEnd}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Typography variant='body2'>
            {getDateDistanceFromNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
