interface RecordItem {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
}

interface TagListModel {
  data: Tag[];
  fetch: () => Tag[];
  add: (name: string) => 'success' | 'duplicated';
  update: (id: string, name: string) => 'success' | 'notFound' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}

type Tag = { id: string, name: string }