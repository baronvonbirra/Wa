export interface TodoItem {
  id: string;
  text: string;
  categoryId: 'tramites' | 'reservas' | 'logistica';
}

export interface TodoCategory {
  id: 'tramites' | 'reservas' | 'logistica';
  name: string;
  description: string;
  items: TodoItem[];
}
