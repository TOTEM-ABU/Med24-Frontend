import { getAllPromotions } from "@/api/promotions/promotions.api";
import { Promotion, PromotionResponse } from "@/types/promotions/Promotion.type";
import { useQuery } from "@tanstack/react-query";

export function useGetAllPromotions () {
        return useQuery<PromotionResponse, Error, Promotion[]>({
                queryKey: ['promotions'],
                queryFn: getAllPromotions,
                select: (response) => response.data,
        })
}