import { EntriesSTate, Entry } from '../../interfaces'

type EntriesActionType =
  | { type: '[ENTRY - Add Entry]'; payload: Entry }
  | { type: '[ENTRY - Updated Entry]'; payload: Entry }
  | { type: '[ENTRY - Delete Entries]'; payload: string }
  | { type: '[ENTRY - Refresh Entries]'; payload: Entry[] }

export const EntriesReducer = (
  state: EntriesSTate,
  action: EntriesActionType
): EntriesSTate => {
  if (action.type === '[ENTRY - Add Entry]') {
    return {
      ...state,
      entries: [...state.entries, action.payload],
    }
  }

  if (action.type === '[ENTRY - Updated Entry]') {
    return {
      ...state,
      entries: state.entries.map(entry => {
        if (entry._id === action.payload._id) {
          entry.status = action.payload.status
          entry.description = action.payload.description
        }
        return entry
      }),
    }
  }

  if (action.type === '[ENTRY - Delete Entries]') {
    return {
      ...state,
      entries: state.entries.filter(entry => entry._id !== action.payload),
    }
  }

  if (action.type === '[ENTRY - Refresh Entries]') {
    return {
      ...state,
      entries: [...action.payload],
    }
  }

  return state
}
