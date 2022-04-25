interface RecordItem {
  tags: Tag[];
  notes: string;
  type: '-'|'+';
  amount: number;
  createdAt?: string;
}

type Tag = { name: string, text: string, type?:'-'|'+' }