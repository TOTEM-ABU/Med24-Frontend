export interface Doctor {
  id: string;
  name: string;
  surname: string;
  experience_years: number;
  rating: number;
  bio: string;
  photo_url: string;
  specialtiesId: string;
  Specialties?: {
    id: string;
    name: string;
  };
  clinicsId: string;
  Clinics?: {
    id: string;
    name: string;
  };
}

export interface ApiResponse<T> {
  data: T[];
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
