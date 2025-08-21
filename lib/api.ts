const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Region {
  id: string;
  name: string;
  createdAt: string;
}

export interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  opening_hours: {
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };
  logo_url: string;
  type: 'PUBLIC' | 'PRIVATE';
  regionId: string;
  createdAt: string;
  Region: Region;
  doctors: any[];
  clinicservices: any[];
  appointments: any[];
  reviews: any[];
  promotions: any[];
}

export const fetchClinics = async (): Promise<Clinic[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clinics`);
    if (!response.ok) {
      throw new Error('Failed to fetch clinics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching clinics:', error);
    return [];
  }
};

export const fetchClinicById = async (id: string): Promise<Clinic | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/clinics/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch clinic');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching clinic:', error);
    return null;
  }
};