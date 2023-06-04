import { createContext } from 'react'

interface ContextProps {
  sidemenuOpen: boolean
  isAdding: boolean
  isDragging: boolean
  // methods
  handleOpenMenu: () => void
  handleCloseMenu: () => void
  handleIsAdding: (isAdding: boolean) => void
  draggingStart: () => void
  draggingEnd: () => void
}

export const UIContext = createContext({} as ContextProps)
