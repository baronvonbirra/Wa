export interface Accommodation {
  name: string;
  check_in: string;
  check_out: string;
  location: string;
}

export interface DayItinerary {
  date: string;
  title: string;
  activities: string[];
}

export interface Stage {
  stage_id: number;
  name: string;
  start_date: string;
  end_date: string;
  accommodations: Accommodation[];
  days: DayItinerary[];
}

export interface TripItinerary {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  stages: Stage[];
}
