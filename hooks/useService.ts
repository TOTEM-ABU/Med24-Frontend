import { getAllServices } from "@/api/services/services.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });
}
