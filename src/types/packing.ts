export interface PackingItem {
  id: string;
  text: string;
  categoryId: string;
}

export interface PackingCategory {
  id: string;
  name: string;
  items: PackingItem[];
}
