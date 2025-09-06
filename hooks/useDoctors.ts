import { getAllDoctors } from "@/api/doctors/doctors.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });
}
