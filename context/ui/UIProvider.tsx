import { FC, ReactNode, useReducer } from 'react'

import { UIContext, UIReducer } from './'
import type { UISTate } from '../../interfaces'

type Props = {
  children: ReactNode
}
const UI_INITIAL_STATE: UISTate = {
  sidemenuOpen: false,
  isAdding: false,
  isDragging: false,
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

  const handleOpenMenu = () => {
    dispatch({ type: 'UI - Open Menu' })
  }

  const handleCloseMenu = () => dispatch({ type: 'UI - Close Menu' })

  const handleIsAdding = (isAdding: boolean) => {
    // setIsAdding(!isAdding)
    // const value = setIsAdding(!isAdding)

    dispatch({ type: 'UI - setIsAddingEntry', payload: isAdding })
  }

  const draggingStart = () => {
    dispatch({ type: 'UI - Dragging Start' })
    console.log('start')
  }

  const draggingEnd = () => {
    dispatch({ type: 'UI - Dragging End' })
    console.log('end')
  }

  return (
    <UIContext.Provider
      value={{
        ...state,

        // methods
        handleOpenMenu,
        handleCloseMenu,
        handleIsAdding,
        draggingStart,
        draggingEnd,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
