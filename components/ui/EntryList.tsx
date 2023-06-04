import { FC, useMemo, DragEvent } from 'react'
import { List, Paper } from '@mui/material'

import { useEntriesContext, useUiContext } from '@/hooks'
import { EntryCard } from './'
import { EntryStatus } from '@/interfaces'

import styles from './EntryList.module.css'
import Link from 'next/link'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  // traemos nuestro estado con las tareas
  const { entries, updateEntry } = useEntriesContext()
  const { isDragging, draggingEnd } = useUiContext()

  // filtramos las tareas dependiendo del status que tengan y la memoizamos porque el proceso del filter se puede hacer pesado y seria bueno que solo que reconstruyera si las entries cambian
  const entriesByStatus = useMemo(
    () => entries.filter(entry => entry.status === status),
    [entries]
  )

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    // obtenemos el id de la card a la cual se va a hacer drag and drop
    const id = e.dataTransfer.getData('text')

    // iteramos sobre nuestras entries y comparamos el id para encontrar todo el objeto y enviarlo al reducer
    const entryUpdate = entries.find(entry => entry._id === id)!
    // y actualizamos el status
    entryUpdate.status = status
    updateEntry(entryUpdate)
    draggingEnd()
  }

  return (
    // Todo: aqui ira el drag and drop
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        className='scrollbar'
        sx={{
          overflow: 'scroll',
          height: 'calc(100vh - 150px)',
          // height: '60vh',
          backgroundColor: 'transparent',
          padding: 1,
          overflowX: 'hidden',
        }}
      >
        {/* TODO: cambiara el estilo cuando se este haciendo el drag */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {entriesByStatus.map(entry => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
