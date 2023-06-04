export interface Entry {
  _id: string
  description: string
  createdAt: number
  status: EntryStatus
}

export type EntryStatus = 'pending' | 'progress' | 'finished'

export interface EntriesSTate {
  entries: Entry[]
}
