import api from "@/lib/api";

export async function getAllReviews() {
  const res = await api.get(`/reviews`);
  return res.data;
}
