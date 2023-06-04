interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  createdAt: number
  status: string
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pendiente: Velit fugiat fugiat quis proident do. Velit fugiat fugiat quis proident do.',
      createdAt: Date.now(),
      status: 'pending',
    },
    {
      description:
        'En Progreso: Non qui elit sit ea dolor laborum ex amet fugiat tempor fugiat aliqua.',
      createdAt: Date.now(),
      status: 'progress',
    },
    {
      description:
        'Completada: Ullamco ea qui sit sunt velit. qui sit sunt velit.',
      createdAt: Date.now(),
      status: 'finished',
    },
    {
      description:
        'Pendiente: Ullamco ea qui sit sunt velit. qui sit sunt velit.',
      createdAt: Date.now(),
      status: 'pending',
    },
  ],
}
