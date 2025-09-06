import { getAllSpecialities } from "@/api/specialities/specialities.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllSpecialities() {
  return useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialities,
  });
}
