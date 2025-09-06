import api from "@/lib/api";

export async function getAllClinics() {
  const res = await api.get(`/clinics`);
  return res.data;
}

export const getClinicById = async (clinicId: string) => {
  try {
    const response = await fetch(`/api/clinics/${clinicId}`);
    if (!response.ok) {
      throw new Error("Klinika ma'lumotlarini olishda xatolik yuz berdi");
    }
    return response.json();
  } catch (error) {
    console.error("API xatosi:", error);
    throw error;
  }
};
