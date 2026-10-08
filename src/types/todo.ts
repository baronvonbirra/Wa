export interface TodoCategory {
  id: string;
  name: string;
  items: string[];
}

export interface TodoData {
  categories: TodoCategory[];
}
