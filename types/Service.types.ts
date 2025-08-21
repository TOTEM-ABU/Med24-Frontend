export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  createdAt: string;
  clinicservices?: Array<{
    id: string;
    price: string;
    duration_minutes: number;
    clinicsId: string;
    servicesId: string;
    createdAt: string;
  }>;
}
