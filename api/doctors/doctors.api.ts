import api from "@/lib/api";

export async function getAllDoctors() {
  const res = await api.get(`/doctors`);
  return res.data;
}

export async function getDoctorById(id: string) {
  try {
    const res = await api.get(`/doctors/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(`Shifokor ID=${id} topilmadi`);
  }
}
