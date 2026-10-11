export interface TodoItem {
  id: string;
  text: string;
  categoryId: string;
}

export interface TodoCategory {
  id: string;
  name: string;
  description: string;
  items: TodoItem[];
}
