interface RecordItem {
  tag: Tag;
  notes: string;
  type: '-'|'+';
  amount: number;
  createdAt?: string;
}

type Tag = { name: string, text: string, type?:'-'|'+' }