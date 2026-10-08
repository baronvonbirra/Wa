export interface PackingItem {
  id: string;
  text: string;
  categoryId: 'docs' | 'tech' | 'clothes' | 'family' | 'toiletries';
}

export interface PackingCategory {
  id: 'docs' | 'tech' | 'clothes' | 'family' | 'toiletries';
  name: string;
  items: PackingItem[];
}
