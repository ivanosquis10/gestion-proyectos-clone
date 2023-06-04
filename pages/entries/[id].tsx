import { ChangeEvent, FC, useState } from 'react'
import { GetServerSideProps } from 'next'

import {
  capitalize,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
} from '@mui/material'

import { Layout } from '@/components/layouts'
import { EntryStatus, Entry } from '@/interfaces'

import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'
import { dbEntries } from '@/database'
import { useEntriesContext } from '@/hooks'
import { getDateDistanceFromNow } from '@/utils'

const estados: EntryStatus[] = ['pending', 'progress', 'finished']

interface Props {
  entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
  const { status: estado, description, createdAt } = entry

  const { updateEntry, deleteEntry } = useEntriesContext()

  const [inputValue, setInputValue] = useState(description)
  const [status, setStatus] = useState<EntryStatus>(estado)

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value)

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status,
    }

    updateEntry(updatedEntry, true)
  }

  const handleClickDelete = () => {
    deleteEntry(entry._id)
  }

  return (
    <Layout title='Entrada...'>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={`Entrada: ${inputValue}`}
              subheader={`Creada ${getDateDistanceFromNow(createdAt)}`}
            />
            <CardContent>
              <TextField
                variant='outlined'
                size='medium'
                label='Nueva entrada'
                placeholder='Ex: hacer la tarea'
                fullWidth
                autoFocus
                multiline
                value={inputValue}
                onChange={handleChangeText}
                helperText={inputValue.length <= 0 && 'Ingrese un valor'}
              />

              <FormControl sx={{ marginTop: 2 }}>
                <FormLabel>Estado:</FormLabel>

                <RadioGroup row onChange={handleRadioChange} value={status}>
                  {estados.map(estado => (
                    <FormControlLabel
                      key={estado}
                      value={estado}
                      control={<Radio />}
                      label={capitalize(estado)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  backgroundColor: '#27272a',
                  boxShadow:
                    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  '&:hover': {
                    backgroundColor: '#18181b',
                  },
                }}
                size='small'
                endIcon={<BookmarkAddedOutlinedIcon />}
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          backgroundColor: 'error.dark',
          right: 30,
          bottom: 30,
        }}
        size='large'
        onClick={handleClickDelete}
      >
        <DeleteSweepOutlinedIcon fontSize='large' />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // sacamos el id de los params
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  // validamos si es un id valido de mongo
  if (!entry) {
    // en caso de que no sea valido, sacamos al usuario al home
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      entry,
    },
  }
}

export default EntryPage
