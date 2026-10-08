export interface PackingCategory {
  id: string;
  name: string;
  items: string[];
}

export interface PackingData {
  categories: PackingCategory[];
}
