import api from "@/lib/api";

export async function getAllSpecialities() {
  const res = await api.get(`/specialties`);
  return res.data;
}
