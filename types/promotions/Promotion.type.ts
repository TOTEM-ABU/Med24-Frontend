export interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string | null;
  logo_url: string
  image_url: string
  opening_hours: {
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
  };
  rating: string;
  regionId: string;
  type: string;
  yandex_map_url: string | null;
  createdAt: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount_percent: string;
  clinicsId: string;
  certificate_conditions: string | null;
  createdAt: string;
  Clinics: Clinic;
}

export interface PromotionResponse {
  data: Promotion[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    [key: string]: any; 
  };
}
