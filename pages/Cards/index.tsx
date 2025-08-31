import { ClinicCard, ClinicCarousel } from "@/components"

const items = [
  { title: 'MDS Servis', logoSrc: '/next.svg', href: '/Clinics/mds' },
  { title: 'Shox Med Center', logoSrc: '/next.svg', href: '/Clinics/shox-med' },
  { title: 'Doctor D', logoSrc: '/next.svg', href: '/Clinics/doctor-d' },
  { title: 'Horev Medical Center', logoSrc: '/next.svg', href: '/Clinics/horev' },
  { title: 'M-Clinic', logoSrc: '/next.svg', href: '/Clinics/m-clinic' },
  { title: 'Medion Clinic 24/7', logoSrc: '/next.svg', href: '/Clinics/medion' },
  { title: 'Vitros Diagnostics', logoSrc: '/next.svg', href: '/Clinics/vitros' },
  { title: 'Hayat Medical Centre', logoSrc: '/next.svg', href: '/Clinics/hayat' },
  { title: 'Doktor Servis', logoSrc: '/next.svg', href: '/Clinics/doktor-servis' },
]

const Cards = () => {
  return (
    <>
      <ClinicCarousel items={items} />
      <ClinicCard title="MDS Servis" logoSrc="/next.svg" href="/Clinics/mds" />

        <ClinicCard
          logoSrc="/next.svg"
          title="Biolife - birinchi osteopad klinikasi"
        />

        <ClinicCard
          logoSrc="/shoxmed.jpg"
          title="Shox Med - zamonaviy diagnostika markazi"
        />
   
    </>
    
  )
}

export default Cards
