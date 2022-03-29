interface RecordItem  {
  tags: Tag[]
  notes: string
  type: string
  amount: number
  createdAt?: Date
}

type Tag = { id: string, name: string }