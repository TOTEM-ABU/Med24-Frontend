import { getAllReviews } from "@/api/reviews/rewiews.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllServices() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getAllReviews,
  });
}
