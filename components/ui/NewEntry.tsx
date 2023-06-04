import { ChangeEvent, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useEntriesContext, useUiContext } from '@/hooks'

export const NewEntry = () => {
  const [input, setInput] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  // TODO: HACER LA NEW ENTRY COMO UN MODAL

  const { addNewEntry } = useEntriesContext()
  const { handleIsAdding, isAdding } = useUiContext()

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)

  const onSave = async () => {
    if (input.length <= 0) return

    setInput('')
    setIsTouched(false)
    handleIsAdding(false)
    await addNewEntry(input)
  }

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        paddingX='10px'
        alignItems='center'
      >
        {isAdding ? (
          <>
            <TextField
              variant='outlined'
              size='medium'
              label='Agrega una entrada'
              placeholder='Ex: hacer la tarea'
              fullWidth
              autoFocus
              multiline
              value={input}
              error={input.length <= 0 && isTouched}
              helperText={
                input.length <= 0 && isTouched && 'Ingrese un valor válido'
              }
              onChange={handleChangeText}
              onBlur={() => setIsTouched(true)}
            />

            <Box
              display='flex'
              justifyContent='space-between'
              width='100%'
              marginY='5px'
              gap={2}
            >
              <Button
                variant='outlined'
                color='error'
                size='small'
                endIcon={<ClearOutlinedIcon />}
                fullWidth
                onClick={() => handleIsAdding(false)}
              >
                Cancelar
              </Button>

              <Button
                variant='outlined'
                color='success'
                size='small'
                endIcon={<BookmarkAddedOutlinedIcon />}
                fullWidth
                onClick={onSave}
              >
                Guardar
              </Button>
            </Box>
          </>
        ) : (
          <Button
            sx={{ marginBottom: '10px' }}
            fullWidth
            startIcon={<AddIcon />}
            variant='outlined'
            onClick={() => handleIsAdding(true)}
          >
            Agregar una entrada
          </Button>
        )}
      </Box>
    </>
  )
}
