"use client";
import { useRouter } from "next/router";

export default function ServiceLanding() {
  const router = useRouter();
  const { name } = router.query as { name?: string };
  const decoded = name ? decodeURIComponent(name) : "";
  return (
    <div style={{ padding: 16 }}>
      <h1>{decoded}</h1>
      <p>Bu sahifa hozircha tayyor emas. Navigatsiya sinovi uchun qo'yildi.</p>
    </div>
  );
}
