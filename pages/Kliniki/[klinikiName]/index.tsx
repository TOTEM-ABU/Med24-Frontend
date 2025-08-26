import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Service } from "@/types/Service.types";

interface ClinicServiceItem {
  id: string;
  price: string;
  duration_minutes: number;
  clinicsId: string;
  servicesId: string;
  Clinics: {
    id: string;
    name: string;
    address: string;
    logo_url: string;
  };
  Services: {
    id: string;
    name: string;
  };
}

const fetchAllServices = async () => {
  const endpoints = ["/serivce", "/services", "/service"];
  for (const ep of endpoints) {
    try {
      const { data } = await api.get(ep, { params: { limit: 1000 } });
      const payload = data;
      if (Array.isArray(payload?.data)) return payload.data as Service[];
      if (Array.isArray(payload)) return payload as Service[];
    } catch (e) {
      // try next endpoint
    }
  }
  return [];
};

const fetchClinicServices = async (servicesId?: string) => {
  const { data } = await api.get("/clinicservices", {
    params: { servicesId, limit: 20 },
  });
  return data.data as ClinicServiceItem[];
};

const normalize = (s: string) => s.trim().toLowerCase();

const KlinikiByServicePage: React.FC = () => {
  const router = useRouter();
  const { klinikiName } = router.query as { klinikiName?: string };
  const serviceName = useMemo(
    () => (klinikiName ? decodeURIComponent(klinikiName) : undefined),
    [klinikiName]
  );

  const { data: services } = useQuery({
    queryKey: ["services-all"],
    queryFn: fetchAllServices,
    enabled: true,
  });

  const matchedService = useMemo(() => {
    if (!services || !serviceName) return undefined;
    return services.find((s) => normalize(s.name) === normalize(serviceName));
  }, [services, serviceName]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clinicservices", { servicesId: matchedService?.id }],
    queryFn: () => fetchClinicServices(matchedService?.id),
    enabled: Boolean(matchedService?.id),
  });

  if (!matchedService && services && serviceName) {
    return <p>Xizmat topilmadi: {serviceName}</p>;
  }
  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi!</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>"{serviceName}" bo'yicha klinikalar</h2>
      <ul>
        {data?.map((cs) => (
          <li key={cs.id}>
            {cs.Clinics?.name} — {cs.price} so'm
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KlinikiByServicePage;
