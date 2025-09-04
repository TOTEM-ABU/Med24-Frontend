import React, { useState } from "react";
import styles from "./Doctors.module.css";
import {
  Button,
  CatalogCard,
  DoctorCard,
  Input,
  Select,
  Typography,
} from "./components";
import Link from "next/link";
import CommentsList from "./sections/comments";
// import PopularDoctors from "./sections/doctors";

const DoctorsPage = () => {
  const doctorsType = [
    "Akusher",
    "Allergolog",
    "Androlog",
    "Anesteziolog",
    "Aritmolog",
    "Artirolog",
    "Audiolog",
    "Defektolog",
    "Dermatolog",
    "Dermotevonetolog",
    "Diagnost",
    "Diyetolog",
    "Embriolog",
    "Endikrionolog",
    "Fizioterapevt",
    "Flebolog",
    "Foniatr",
    "Ftiziatr",
  ];
  const districts = [
    "Mirobod tumani",
    "Bektemir",
    "Olmazor",
    "Mirzo-Ulug'bek",
    "Sergeli",
    "Uchtepa",
    "Chilonzor",
    "Shayxontohur",
    "Yunusobod",
    "Yakkasaroy",
    "Yangihayot",
    "Yashnobod",
  ];

  const popularDoctors = [
    {
      fullName: "Xankeldiyev Nariman Zuxriddinovich",
      type: "Neyrojarroh",
      patients: 12,
      firstPrice: "narx so'rov bo'yicha",
      consistentPrice: "narx so'rov bo'yicha",
      clinic: "M-Clinic",
      rate: 5,
      comments: 3,
      location: "Tantan ko'chasi, 1-uy",
      clinicNumber: 912345678,
      telegram: "t.me/something",
    },
  ];
  const medicalCenters = ["Davlat tibbiyot markazlari", "Xususiy klinikalar"];
  const doctorGender = ["Erkak", "Ayol"];

  const groupedDoctors = doctorsType.reduce(
    (acc: { [key: string]: string[] }, doctor) => {
      const firstLetter = doctor[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(doctor);
      return acc;
    },
    {}
  );

  const initialShowAll: { [key: string]: boolean } = {};
  Object.keys(groupedDoctors).forEach((letter) => {
    initialShowAll[letter] = false;
  });

  const [expandedLetters, setExpandedLetters] = useState<{
    [key: string]: boolean;
  }>(initialShowAll);

  const toggleLetter = (letter: string) => {
    setExpandedLetters((prev) => ({
      ...prev,
      [letter]: !prev[letter] || false,
    }));
  };

  return (
    <div className={styles.miniContainer}>
      <div className={styles.searchSection}>
        <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
        <Button>Qidirish</Button>
      </div>
      <div className={styles.commonCatalogStyle}>
        <Typography size="28" weight="600" bottom="30">
          Ommabop Mutaxassislar
        </Typography>
        <ul>
          <li>
            <CatalogCard title="kardiolog">Kardiolog</CatalogCard>
          </li>
          <li>
            <CatalogCard title="ortoped">Ortoped</CatalogCard>
          </li>
          <li>
            <CatalogCard title="pulmonolog">Pulmonolog</CatalogCard>
          </li>
          <li>
            <CatalogCard title="stomotolog">Stomotolog</CatalogCard>
          </li>
          <li>
            <CatalogCard title="terapevt">Terapevt</CatalogCard>
          </li>
          <li>
            <CatalogCard title="travmatolog">Travmatolog</CatalogCard>
          </li>
        </ul>
      </div>
      <div className={styles.catalogStyle}>
        <Typography size="28" weight="600" bottom="30">
          Shifokorlar mutaxassisligi bo‘yicha
        </Typography>
        <div className={styles.catalogListStyle}>
          <div>
            <Typography size="24" weight="500" bottom="20">
              A
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["A"]
                ?.slice(
                  0,
                  expandedLetters["A"] ? groupedDoctors["A"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["A"]?.length > 5 && (
                <button
                  className={styles.activeButton}
                  onClick={() => toggleLetter("A")}
                >
                  {expandedLetters["A"] ? "Yashirish" : "Hammasi"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              D
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["D"]
                ?.slice(
                  0,
                  expandedLetters["D"] ? groupedDoctors["D"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["D"]?.length > 5 && (
                <button onClick={() => toggleLetter("D")}>
                  {expandedLetters["D"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              E
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["E"]
                ?.slice(
                  0,
                  expandedLetters["E"] ? groupedDoctors["E"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["E"]?.length > 5 && (
                <button onClick={() => toggleLetter("E")}>
                  {expandedLetters["E"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              F
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["F"]
                ?.slice(
                  0,
                  expandedLetters["F"] ? groupedDoctors["F"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["F"]?.length > 5 && (
                <button onClick={() => toggleLetter("F")}>
                  {expandedLetters["F"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              G
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["G"]
                ?.slice(
                  0,
                  expandedLetters["G"] ? groupedDoctors["G"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["G"]?.length > 5 && (
                <button onClick={() => toggleLetter("G")}>
                  {expandedLetters["G"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              I
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["I"]
                ?.slice(
                  0,
                  expandedLetters["I"] ? groupedDoctors["I"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["I"]?.length > 5 && (
                <button onClick={() => toggleLetter("I")}>
                  {expandedLetters["I"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              J
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["J"]
                ?.slice(
                  0,
                  expandedLetters["J"] ? groupedDoctors["J"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["J"]?.length > 5 && (
                <button onClick={() => toggleLetter("J")}>
                  {expandedLetters["J"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              K
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["K"]
                ?.slice(
                  0,
                  expandedLetters["K"] ? groupedDoctors["K"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["K"]?.length > 5 && (
                <button onClick={() => toggleLetter("K")}>
                  {expandedLetters["K"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              L
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["L"]
                ?.slice(
                  0,
                  expandedLetters["L"] ? groupedDoctors["L"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["L"]?.length > 5 && (
                <button onClick={() => toggleLetter("L")}>
                  {expandedLetters["L"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              M
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["M"]
                ?.slice(
                  0,
                  expandedLetters["M"] ? groupedDoctors["M"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["M"]?.length > 5 && (
                <button onClick={() => toggleLetter("M")}>
                  {expandedLetters["M"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              N
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["N"]
                ?.slice(
                  0,
                  expandedLetters["N"] ? groupedDoctors["N"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["N"]?.length > 5 && (
                <button onClick={() => toggleLetter("N")}>
                  {expandedLetters["N"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              O
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["O"]
                ?.slice(
                  0,
                  expandedLetters["O"] ? groupedDoctors["O"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["O"]?.length > 5 && (
                <button onClick={() => toggleLetter("O")}>
                  {expandedLetters["O"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              P
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["P"]
                ?.slice(
                  0,
                  expandedLetters["P"] ? groupedDoctors["P"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["P"]?.length > 5 && (
                <button onClick={() => toggleLetter("P")}>
                  {expandedLetters["P"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              Q
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["Q"]
                ?.slice(
                  0,
                  expandedLetters["Q"] ? groupedDoctors["Q"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["Q"]?.length > 5 && (
                <button onClick={() => toggleLetter("Q")}>
                  {expandedLetters["Q"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              R
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["R"]
                ?.slice(
                  0,
                  expandedLetters["R"] ? groupedDoctors["R"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["R"]?.length > 5 && (
                <button onClick={() => toggleLetter("R")}>
                  {expandedLetters["R"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              S
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["S"]
                ?.slice(
                  0,
                  expandedLetters["S"] ? groupedDoctors["S"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["S"]?.length > 5 && (
                <button onClick={() => toggleLetter("S")}>
                  {expandedLetters["S"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              T
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["T"]
                ?.slice(
                  0,
                  expandedLetters["T"] ? groupedDoctors["T"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["T"]?.length > 5 && (
                <button onClick={() => toggleLetter("T")}>
                  {expandedLetters["T"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              U
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["U"]
                ?.slice(
                  0,
                  expandedLetters["U"] ? groupedDoctors["U"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["U"]?.length > 5 && (
                <button onClick={() => toggleLetter("U")}>
                  {expandedLetters["U"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              V
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["V"]
                ?.slice(
                  0,
                  expandedLetters["V"] ? groupedDoctors["V"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["V"]?.length > 5 && (
                <button onClick={() => toggleLetter("V")}>
                  {expandedLetters["V"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
          <div>
            <Typography size="24" weight="500" bottom="20">
              Y
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["Y"]
                ?.slice(
                  0,
                  expandedLetters["Y"] ? groupedDoctors["Y"].length : 5
                )
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["Y"]?.length > 5 && (
                <button onClick={() => toggleLetter("Y")}>
                  {expandedLetters["Y"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.selectionsStyle}>
        <Typography size="28" weight="600" bottom="30">
          Toshkentda shifokolar mutaxassisligi bo`yicha
        </Typography>
        <div className={styles.selections}>
          <Select
            options={doctorsType}
            placeholder="Mutaxassisligi bo'yicha"
            name="doctorsType"
            id="doctorsType"
          />
          <Select
            options={districts}
            placeholder="Tuman"
            name="districts"
            id="districts"
          />
          <Select
            options={medicalCenters}
            placeholder="Tibbiyot muassas turi"
            name="medicalCenter"
            id="medicalCenter"
          />
          <Select
            options={doctorGender}
            placeholder="Shifokor jinsi"
            name="doctorGender"
            id="doctorGender"
          />
        </div>
      </div>
      <div className={styles.popularDoctors}>
        {popularDoctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            fullname={doctor.fullName}
            type={doctor.type}
            patients={doctor.patients}
            clinicName={doctor.clinic}
            location={doctor.location}
            clinicNumber={doctor.clinicNumber}
            telegramBotLink={doctor.telegram}
            photo="xankeldiyevnarimanzuhritdinovich"
            clinicPhoto="m-clinic"
            priceOne={doctor.firstPrice}
            priceTwo={doctor.consistentPrice}
          />
        ))}
        <div className={styles.throwTelegram}>
          <Typography size="20" weight="500" bottom="8px" top="0">
            Kerakli ma`lumot topmadingizmi?
          </Typography>
          <Typography size="14" color="#1e1e1e70" bottom="26" top="8">
            Bizga Telegramda yozing, biz sizga shifokor topib, qabuliga yozib
            beramiz
          </Typography>
          <button className={styles.telegramLinkButton}>
            <Link className={styles.telegramLink} href="https://t.me/telegram">
              Telegramda yozish
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.commentSection}>
        <Typography size="24" weight="500" bottom="20">
          So`nggi sharhlar
        </Typography>
        <div className={styles.commentBlocks}>
          <CommentsList />
        </div>
      </div>
      <div className={styles.commonServices}>
        <Typography size="22" bottom="24" weight="600">
          Keng tarqalgan tibbiy xizmatlar
        </Typography>
        <div className={styles.commonServicesLinks}>
          <Link href="/" className={styles.navLink}>
            Breket o`rnatish
          </Link>
          <Link href="/" className={styles.navLink}>
            Buyrakdagi toshlarni olib tashlash
          </Link>
          <Link href="/" className={styles.navLink}>
            Doppler (ultratovushli doppler)
          </Link>
          <Link href="/" className={styles.navLink}>
            Elektroansefalografika (EEG)
          </Link>
          <Link href="/" className={styles.navLink}>
            Exokardiyografiya (EXOKG)
          </Link>
          <Link href="/" className={styles.navLink}>
            Gastroskopiya
          </Link>
          <Link href="/" className={styles.navLink}>
            Gemoroyni lazer yordamida olib tashlash
          </Link>
          <Link href="/" className={styles.navLink}>
            Hollarni olib tashlash
          </Link>
          <Link href="/" className={styles.navLink}>
            Ko`z lazer operatsiyasi
          </Link>
        </div>
      </div>
      <div className={styles.details}>
        <Typography size="28" bottom="20">
          Shifokor qabuliga onlayn yozilish
        </Typography>
        <div className={styles.content}>
          ed24.uz - bu Toshkent aholisi uchun shifokor yoki klinikani izlash
          hamda tanlashni osonlashtiruvchi onlayn-servis. Servis yordamida
          shifokor qabuliga yozilish esa bir necha barobar osonroq va
          samaraliroq bo`ladi! Endilikda Toshkent shahrida shifokor qabuliga
          yozilish onlayn tarzda amalga oshirilmoqda. Med24.uz sayti sizga
          malakali shifokorlar va birinchi darajali klinikalarning nihoyatda
          katta onlayn ma`lumotlar bazasini taqdim etadi. <br /> <br /> Onlayn
          portalimizda siz bir nechta tugmani bosish orqali shifokor qabuliga
          yozilishingiz mumkin. Shuningdek, saytda bizning xizmatlarimizdan
          foydalanib shifokor ko`rigidan o`tgan foydalanuvchilarning sharhlarini
          o`qing. <br /> <br /> Biz sizni mutaxassislar va klinikalarning
          telefon raqamlarini uzoq izlashdan xalos qilamiz. Shuningdek, biz
          o`qimagan mutaxassis qo’liga tushib qolishingiz xavfidan himoya
          qilamiz. Shifokor qabuliga yozilishingiz kerakmi? Bu bir zumda amalga
          oshiriladi! Shifokorni toping, mutaxassislikni tanlang, o’zingizga
          qulay bo’lgan shahrimiz tumanini yoki metro bekatini belgilang. Boshqa
          foydalanuvchilarning sharhlarini o’qib chiqing va sizga eng yoqqan
          shifokorni tanlang. Murojaatnoma qoldirganingizdan so`ng, ma`lumotni
          aniqlashtirish va savollaringizni muhokama qilish uchun sizga
          qo`ng`iroq qilamiz.
        </div>
        <Typography size="28" bottom="20">
          Saytimizning afzalliklari:
        </Typography>
        <ul className={styles.listDetails}>
          <li>
            Uyda yuqori malakali shifokorga qo`ng`iroq qilish yoki siz uchun
            qulay bo`lgan shifoxonaga yozilish bizning saytimizda mutlaqo bepul
            va kunning istalgan vaqtida, bir necha daqiqada amalga oshiriladi.
          </li>
          <li>
            Med24.uz sayti bilan siz poliklinikalardagi uzoq va charchoqli
            navbatlarni unutasiz. Boshqa hech qachon qabulxona bilan bog’lanish
            uchun uzoq urinishlar qilmaysiz. Endi muammolarsiz Toshkentdagi
            shifokor qabuliga yozilishingiz mumkin.
          </li>
          <li>
            Hamkor klinikalarimiz tufayli siz narx va sifat jihatidan yaxshi
            takliflarni topa olasiz. Takliflarning to’liq katalogi bizning
            onlayn portalimizda, ``Aksiyalar`` sahifasida joylashgan. Bizning
            maxsus takliflarimiz bilan siz qulay narxda sifatli tibbiy xizmatdan
            bahramand bo`lishingiz mumkin!
          </li>
          <li>
            Klinikani va kerakli mutaxassisni tanlash uchun bizning saytimizdan
            foydalaning, sog`ligingizni asrang!
          </li>
        </ul>
      </div>
      {/* <PopularDoctors /> */}
    </div>
  );
};

export default DoctorsPage;
