import { ClinicCarousel } from "@/components";
import SimpleClinicCard from "@/components/ClinicCardSimple/SimpleClinicCard";

const items = [
  {
    id: "1",
    name: "MDS Servis",
    logo_url: "/next.svg",
  },
  {
    id: "2",
    name: "Shox Med Center",
    logo_url: "/next.svg",
  },
  {
    id: "3",
    name: "Doctor D",
    logo_url: "/next.svg",
  },
  {
    id: "4",
    name: "Horev Medical Center",
    logo_url: "/next.svg",
  },
  {
    id: "5",
    name: "M-Clinic",
    logo_url: "/next.svg",
  },
  {
    id: "6",
    name: "Medion Clinic 24/7",
    logo_url: "/next.svg",
  },
  {
    id: "7",
    name: "Vitros Diagnostics",
    logo_url: "/next.svg",
  },
  {
    id: "8",
    name: "Hayat Medical Centre",
    logo_url: "/next.svg",
  },
  {
    id: "9",
    name: "Doktor Servis",
    logo_url: "/next.svg",
  },
];

const Cards = () => {
  return (
    <>
      <ClinicCarousel items={items} />
      <SimpleClinicCard
        title="MDS Servis"
        logoSrc="/next.svg"
        href="/Clinics/mds"
      />

      <SimpleClinicCard
        logoSrc="/next.svg"
        title="Biolife - birinchi osteopad klinikasi"
      />

      <SimpleClinicCard
        logoSrc="/shoxmed.jpg"
        title="Shox Med - zamonaviy diagnostika markazi"
      />
    </>
  );
};

export default Cards;
