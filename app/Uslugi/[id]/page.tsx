import Image from "next/image";
import React from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  createdAt: string;
}

interface ServicePageProps {
  params: { id: string };
}

export default async function ServicePage({ params }: ServicePageProps) {
  // API’dan ma’lumot olish
  const res = await fetch(`http://localhost:3000/api/services/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <h1>Xizmat topilmadi</h1>;
  }

  const service: Service = await res.json();

  return (
    <div style={{ padding: "20px" }}>
      <h1>{service.name}</h1>
      <p>
        <strong>Tavsif:</strong> {service.description}
      </p>
      <p>
        <strong>Kategoriya:</strong> {service.category}
      </p>
      <p>
        <strong>Qo‘shilgan vaqt:</strong>{" "}
        {new Date(service.createdAt).toLocaleDateString()}
      </p>
      <Image
        src={service.image_url}
        alt={service.name}
        width={300}
        height={200}
        style={{ marginTop: "20px", borderRadius: "10px" }}
      />
    </div>
  );
}
