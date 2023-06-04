import type { UISTate } from '../../interfaces'

type UIActionType =
  | { type: 'UI - Open Menu' }
  | { type: 'UI - Close Menu' }
  | { type: 'UI - setIsAddingEntry'; payload: boolean }
  | { type: 'UI - Dragging Start' }
  | { type: 'UI - Dragging End' }

export const UIReducer = (state: UISTate, action: UIActionType): UISTate => {
  if (action.type === 'UI - Open Menu') return { ...state, sidemenuOpen: true }
  if (action.type === 'UI - Close Menu')
    return { ...state, sidemenuOpen: false }

  if (action.type === 'UI - setIsAddingEntry') {
    return {
      ...state,
      isAdding: action.payload,
    }
  }

  if (action.type === 'UI - Dragging Start')
    return { ...state, isDragging: true }

  if (action.type === 'UI - Dragging End')
    return { ...state, isDragging: false }

  return state
}
