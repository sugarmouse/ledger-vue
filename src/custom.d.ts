interface RecordItem {
  tag: Tag;
  notes: string;
  type: '-' | '+';
  amount: number;
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


 type GroupedList = GroupedRecordItem[]
 type ExtendType = '-' | '+' | 'all'
