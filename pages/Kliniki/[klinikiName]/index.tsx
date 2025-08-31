import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Service } from "@/types/Service.types";
import {
  Clinic as ClinicType,
  default as ClinicCard,
} from "@/components/ClinicCard";

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
    } catch {}
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

  type ClinicServiceForCard = {
    id: string;
    price?: string | number;
    duration_minutes?: number;
    Services?: { id?: string; name?: string };
  };

  const clinics: ClinicType[] = useMemo(() => {
    const source = Array.isArray(data) ? data : [];
    const byId = new Map<string, ClinicType>();
    for (const cs of source) {
      const c = cs.Clinics;
      if (!c?.id) continue;
      const existing = byId.get(c.id);
      const serviceEntry: ClinicServiceForCard = {
        id: cs.id,
        price: cs.price,
        duration_minutes: cs.duration_minutes,
        Services: { id: cs.Services?.id, name: cs.Services?.name },
      };
      if (!existing) {
        byId.set(c.id, {
          id: c.id,
          name: c.name,
          address: c.address,
          logo_url: c.logo_url,
          clinicservices: [
            serviceEntry,
          ] as unknown as ClinicType["clinicservices"],
        } as unknown as ClinicType);
      } else {
        if (Array.isArray(existing.clinicservices)) {
          (existing.clinicservices as unknown as ClinicServiceForCard[]).push(
            serviceEntry
          );
        } else {
          existing.clinicservices = [
            serviceEntry,
          ] as unknown as ClinicType["clinicservices"];
        }
      }
    }
    return Array.from(byId.values());
  }, [data]);

  if (!matchedService && services && serviceName) {
    return <p>Xizmat topilmadi: {serviceName}</p>;
  }
  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi!</p>;

  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      <h2 style={{ marginBottom: 12 }}>
        &quot;{serviceName}&quot; bo&#39;yicha klinikalar
      </h2>
      <div
        style={{
          maxWidth: 874,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {clinics.map((c) => (
          <ClinicCard key={c.id} clinic={c} />
        ))}
      </div>
    </div>
  );
};

export default KlinikiByServicePage;
