import { useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Clinic = {
  id: string;
  name: string;
  address: string;
  logo_url?: string;
};

const normalize = (s: string) => s.toLowerCase().trim();

const slugToNameMap: Record<string, string> = {
  olmazor: "Olmazor",
  bektemir: "Bektemir",
  mirobod: "Mirobod",
  "mirzo-ulugbek": "Mirzo-Ulug'bek",
  sergeli: "Sergeli",
  uchtepa: "Uchtepa",
  chilonzor: "Chilonzor",
  shayxontohur: "Shayxontohur",
  yunusobod: "Yunusobod",
  yakkasaroy: "Yakkasaroy",
  yangihayot: "Yangihayot",
  yashnobod: "Yashnobod",
};

export default function ClinicsByDistrictPage() {
  const router = useRouter();
  const { district } = router.query as { district?: string };

  const districtName = useMemo(() => {
    if (!district) return undefined;
    return slugToNameMap[normalize(district)];
  }, [district]);

  const {
    data: clinics,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clinics-all"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/clinics?include=Region&limit=1000`
      );
      return res.data?.data as Clinic[];
    },
    enabled: true,
  });

  const filtered = useMemo(() => {
    if (!clinics || !districtName) return [] as Clinic[];
    const token = normalize(districtName);
    return clinics.filter((c) => normalize(c.address || "").includes(token));
  }, [clinics, districtName]);

  if (!districtName) return <p>Tuman topilmadi.</p>;
  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi!</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{districtName} tumanidagi klinikalar</h2>
      {filtered.length === 0 ? (
        <p>Klinika topilmadi.</p>
      ) : (
        <ul>
          {filtered.map((c) => (
            <li key={c.id}>
              {c.name} — {c.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
