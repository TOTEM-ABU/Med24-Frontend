export interface Doctor {
  id: string;
  name: string;
  surname: string;
  bio?: string;
  experience_years?: number;
  rating?: number;
  image_url?: string;
  phone?: string;
  email?: string;
  clinic?: string;
  Specialties?: {
    id: string;
    name: string;
  };
}

export type DoctorsResponse = Doctor[];
