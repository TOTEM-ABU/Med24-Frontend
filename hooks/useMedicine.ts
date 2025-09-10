import { getAllMedicine } from "@/api/medicine/medicine.api";
import { Medication } from "@/types/medications/medication.types";
import { useQuery } from "@tanstack/react-query";

export function useGetAllMedicine () {
        return useQuery({
                queryKey: ['medicine'],
                queryFn: getAllMedicine
        })
}