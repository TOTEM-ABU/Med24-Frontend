"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import KlinikiNameHeader from "@/app/KlinikiName";

type BasicClinic = {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  logo_url?: string;
  cover_url?: string;
  description?: string;
  clinicservices?: Array<{
    id: string;
    price?: string | number;
    Services?: { id?: string; name?: string };
  }>;
  doctors?: Array<{
    id?: string;
    name?: string;
    surname?: string;
    Specialties?: { id: string; name?: string } | null;
  }>;
  reviews?: Array<{
    id: string;
    comment?: string;
    rating?: number;
    userId?: string;
    user?: { name?: string; surname?: string };
    createdAt?: string;
  }>;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[\u2019'`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const fetchClinicBySlug = async (slug: string) => {
  if (!slug) return null;
  const include = [
    "reviews.User",
    "doctors.Specialties",
    "clinicservices.Services",
    "Region",
    "promotions",
  ].join(",");

  try {
    const { data } = await api.get(
      `/clinics/by-slug/${slug}?include=${include}`
    );
    const direct = data?.data ?? data;
    if (direct && typeof direct === "object" && direct.id) return direct;
  } catch (e) {
    console.log(e);
  }

  try {
    const { data } = await api.get(`/clinics`, {
      params: { include, limit: 1000 },
    });
    const list: BasicClinic[] = data?.data ?? [];
    const matched = list.find(
      (c) => c?.name && slugify(String(c.name)) === slug
    );
    if (matched) return matched;
  } catch (e) {
    console.log(e);
  }

  try {
    const token = decodeURIComponent(String(slug).replace(/-/g, " "));
    const { data } = await api.get(`/clinics`, {
      params: { search: token, include, limit: 5 },
    });
    const list: BasicClinic[] = data?.data ?? [];
    if (Array.isArray(list) && list.length) return list[0];
  } catch (e) {
    console.log(e);
  }

  return null;
};

const ClinicDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };

  const { data: clinic } = useQuery({
    queryKey: ["clinic", slug],
    queryFn: () => fetchClinicBySlug(slug as string),
    enabled: Boolean(slug),
  });

  const clinicId = useMemo(() => clinic?.id as string | undefined, [clinic]);
  console.log("Clinic ID:", clinicId);

  useEffect(() => {
    if (clinic) {
      console.log("Full clinic data:", clinic);
    }
  }, [clinic]);

  return (
    <>
      {clinic ? (
        <KlinikiNameHeader
          clinic={{
            id: clinic?.id,
            name: clinic?.name,
            address: clinic?.address,
            rating: clinic?.rating,
            reviewsCount: clinic?.reviews?.length,
            cover_url: clinic?.cover_url ?? null,
            logo_url: clinic?.logo_url ?? null,
            description: clinic?.description,
            clinicservices: clinic?.clinicservices,
            doctors: clinic?.doctors,
            reviews: clinic?.reviews,
          }}
        />
      ) : null}
    </>
  );
};

export default ClinicDetailPage;
