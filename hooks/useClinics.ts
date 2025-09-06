import { getAllClinics } from "@/api/clinics/clinics.api";
import { useQuery } from "@tanstack/react-query";

export function useGetAllClinics () {
        return useQuery({
                queryKey: ['clinics'],
                queryFn: getAllClinics
        })
}