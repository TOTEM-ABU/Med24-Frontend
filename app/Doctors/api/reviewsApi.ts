// lib/api.ts
export type Review = {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
};

export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("http://45.76.94.219:3132/api/reviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}
