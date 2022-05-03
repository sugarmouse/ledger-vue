interface RecordItem {
  tag: Tag;
  notes: string;
  type: '-' | '+';
  amount: number;
  id: number;
  createdAt?: string;
}

interface Tag {
  name: string,
  text: string,
  type?: '-' | '+'
}

interface GroupedRecordItem {
  title: string,
  items: RecordItem[],
  total?: number
}

interface TagGroupedRecordItem {
  tag: Tag,
  items: RecordItem[]
}
type Type = '-' | '+'
type TagGroupRecordList = TagGroupedRecordItem[]

type GroupedList = GroupedRecordItem[]
type ExtendType = '-' | '+' | 'all'
