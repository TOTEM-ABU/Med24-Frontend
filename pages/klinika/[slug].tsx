import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import type { ParsedUrlQueryInput } from "querystring";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import KlinikiNameHeader from "@/app/KlinikiName";

// Clinic type removed (unused)

type ReviewItem = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  User?: {
    name?: string;
    surname?: string;
  };
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

  // 1) Try dedicated by-slug endpoint if backend supports it
  try {
    const { data } = await api.get(
      `/clinics/by-slug/${slug}?include=${include}`
    );
    const direct = data?.data ?? data;
    if (direct && typeof direct === "object" && direct.id) return direct;
  } catch (e) {}

  // 2) Fetch a list and match using the same slug strategy used in cards
  try {
    const { data } = await api.get(`/clinics`, {
      params: { include, limit: 1000 },
    });
    const list: Array<any> = data?.data ?? [];
    const matched = list.find(
      (c) => c?.name && slugify(String(c.name)) === slug
    );
    if (matched) return matched;
  } catch (e) {}

  // 3) Last resort: search by decoded name token
  try {
    const token = decodeURIComponent(String(slug).replace(/-/g, " "));
    const { data } = await api.get(`/clinics`, {
      params: { search: token, include, limit: 5 },
    });
    const list: Array<any> = data?.data ?? [];
    if (Array.isArray(list) && list.length) return list[0];
  } catch (e) {}

  return null;
};

const postReview = async ({
  clinicsId,
  comment,
  rating,
}: {
  clinicsId: string;
  comment: string;
  rating: number;
}) => {
  const { data } = await api.post(`/reviews`, { clinicsId, comment, rating });
  return data;
};

const ClinicDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };
  const queryClient = useQueryClient();
  const reviewAnchorRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: clinic,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clinic", slug],
    queryFn: () => fetchClinicBySlug(slug as string),
    enabled: Boolean(slug),
  });

  const clinicId = useMemo(() => clinic?.id as string | undefined, [clinic]);

  const reviews = useMemo(() => {
    console.log("Clinic reviews:", clinic?.reviews);
    return clinic?.reviews ?? [];
  }, [clinic?.reviews]);

  // Debug: Log clinic data
  useEffect(() => {
    if (clinic) {
      console.log("Full clinic data:", clinic);
    }
  }, [clinic]);

  const { mutateAsync: submitReview, isPending: isPosting } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      if (clinicId)
        queryClient.invalidateQueries({ queryKey: ["clinic", slug] });
    },
  });

  useEffect(() => {
    if (router.asPath.includes("#review") && reviewAnchorRef.current) {
      reviewAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  // Sync modal with URL (?review=open)
  useEffect(() => {
    const open = router.query?.review === "open";
    setIsModalOpen(Boolean(open));
  }, [router.query]);

  const openReviewModal = () => {
    const nextQuery = { ...router.query, review: "open" };
    router.push({ pathname: router.pathname, query: nextQuery }, undefined, {
      shallow: true,
    });
  };

  const closeReviewModal = () => {
    const rest = Object.fromEntries(
      Object.entries(
        router.query as Record<string, string | string[] | undefined>
      ).filter(([key]) => key !== "review")
    ) as ParsedUrlQueryInput;
    router.push({ pathname: router.pathname, query: rest }, undefined, {
      shallow: true,
    });
  };

  return (
    <div style={{ maxWidth: 874, margin: "0 auto", padding: 16 }}>
      {clinic ? (
        <KlinikiNameHeader
          clinic={{
            name: clinic?.name,
            address: clinic?.address,
            rating: clinic?.rating,
            reviewsCount: Array.isArray(clinic?.reviews)
              ? clinic.reviews.length
              : 0,
            cover_url: clinic?.cover_url ?? null,
            logo_url: clinic?.logo_url ?? null,
            description: clinic?.description,
            clinicservices: clinic?.clinicservices,
          }}
        />
      ) : null}

      <div id="review" ref={reviewAnchorRef} />

      {isLoading ? <p>Yuklanmoqda...</p> : null}
      {isError || !clinic ? (
        <p style={{ color: "#EF4444" }}>
          Klinika topilmadi yoki server xatosi.
        </p>
      ) : null}

      <h2 style={{ margin: "8px 0 12px" }}>
        {reviews.length > 0 ? `${reviews.length} Sharhlar` : "Sharhlar"}
      </h2>

      <button
        onClick={openReviewModal}
        style={{
          marginBottom: 12,
          padding: "10px 14px",
          background: "#1D4ED8",
          color: "#fff",
          borderRadius: 10,
        }}
      >
        Sharh qoldirish
      </button>

      {reviews.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#6B7280",
          }}
        >
          <p>Sharhlar yo&apos;q</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {reviews.map((r: ReviewItem) => (
            <div
              key={r.id}
              style={{ borderTop: "1px solid #e5e7eb", paddingTop: 12 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 9999,
                    background: "#e5e7eb",
                  }}
                />
                <div style={{ fontWeight: 600 }}>
                  {r.User?.name && r.User?.surname
                    ? `${r.User.name} ${r.User.surname}`
                    : "Anonim"}
                </div>
                {typeof r.rating === "number" ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginLeft: 8,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="#F59E0B"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 0 0-.1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                    </svg>
                    <span>{r.rating}</span>
                  </div>
                ) : null}
              </div>
              <div style={{ marginTop: 8, color: "#111827" }}>{r.comment}</div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.45)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "min(560px, 92vw)",
              background: "#fff",
              borderRadius: 14,
              padding: 18,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>
                Sharh qoldirish
              </div>
              <button onClick={closeReviewModal} aria-label="Yopish">
                ✕
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!clinicId) return;
                const formData = new FormData(
                  e.currentTarget as HTMLFormElement
                );
                const comment = String(formData.get("content") || "");
                const rating = Number(formData.get("rating") || 5);
                if (!comment.trim()) return;
                await submitReview({ clinicsId: clinicId, comment, rating });
                closeReviewModal();
              }}
              style={{ marginTop: 12, display: "grid", gap: 12 }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                <input
                  name="name"
                  placeholder="Ismingiz"
                  style={{
                    flex: 1,
                    padding: 10,
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                  }}
                />
                <input
                  name="phone"
                  placeholder="+998"
                  style={{
                    flex: 1,
                    padding: 10,
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                  }}
                />
              </div>
              <label style={{ fontSize: 14 }}>
                Reyting
                <select
                  name="rating"
                  defaultValue={5}
                  style={{ marginLeft: 8 }}
                >
                  {[5, 4, 3, 2, 1].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <textarea
                name="content"
                placeholder="Sharhingiz matni"
                rows={5}
                style={{
                  padding: 10,
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                }}
              />
              <button
                type="submit"
                disabled={isPosting}
                style={{
                  marginTop: 4,
                  padding: "12px 16px",
                  background: "#0B66FF",
                  color: "#fff",
                  borderRadius: 12,
                }}
              >
                {isPosting ? "Yuborilmoqda..." : "Yuborish"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ClinicDetailPage;
