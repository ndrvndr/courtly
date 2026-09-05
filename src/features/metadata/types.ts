export interface Sport {
  id: string;
  name: string;
  slug: string;
}

export interface SportsResponse {
  data: Sport[];
}

export interface CitiesResponse {
  data: string[];
}
