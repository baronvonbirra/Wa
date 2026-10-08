export interface EmergencyContact {
  id: string;
  title: string;
  number: string;
  description: string;
  badge?: string;
  iconName: string;
}

export interface TransportNote {
  id: string;
  title: string;
  summary: string;
  details: string[];
  iconName: string;
}
