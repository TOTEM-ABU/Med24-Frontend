import { getAllClinicServices } from "@/api/clinicServices/clinicServices.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllClinicServices() {
  return useQuery({
    queryKey: ["clinicservices"],
    queryFn: getAllClinicServices,
  });
}
