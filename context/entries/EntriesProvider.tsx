import { FC, ReactNode, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router'
import { enqueueSnackbar } from 'notistack'

import { EntriesContext, EntriesReducer } from './'
import { entriesApi } from '@/apis'
import { EntriesSTate, Entry } from '@/interfaces'

type Props = {
  children: ReactNode
}

const ENTRIES_INITIAL_STATE: EntriesSTate = {
  entries: [],
}

const notificationSnack = (msg: string, show?: boolean) => {
  // mostrar notificacion
  const notification = enqueueSnackbar(msg, {
    autoHideDuration: 2000,
    variant: 'success',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  })

  return notification
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE)
  // const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', {
        description,
      })

      dispatch({ type: '[ENTRY - Add Entry]', payload: data })

      notificationSnack('Entrada Agregada Correctamente!')
    } catch (error) {
      console.log(error)
    }
  }

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnack = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })

      dispatch({ type: '[ENTRY - Updated Entry]', payload: data })

      notificationSnack('Entrada Actualizada Correctamente!', showSnack)
    } catch (error) {
      console.log({ error })
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      const { data } = await entriesApi.delete<Entry>(`/entries/${id}`)

      dispatch({ type: '[ENTRY - Updated Entry]', payload: data })

      notificationSnack('Entrada Eliminada Correctamente!')
      router.push('/')
    } catch (error) {
      console.log({ error })
    }
  }

  // function encargada de trae los datos de las entradas y cargarlos por primera vez
  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[ENTRY - Refresh Entries]', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // methods
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
