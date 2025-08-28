import React, { useState } from "react";
import styles from "./Doctors.module.css";
import { Button, CatalogCard, Input, Typography } from "./components";
import Link from "next/link";

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
      patiens: 12,
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

  // showAll uchun tur aniqlash
  const [showAll, setShowAll] = useState<{ [key: string]: boolean }>({});

  // Harf bo‘yicha guruhlash
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

  const toggleShowAll = (letter: string) => {
    setShowAll((prev) => ({
      ...prev,
      [letter]: !prev[letter],
    }));
  };

  return (
    <div className={styles.miniContainer}>
      <div className={styles.searchSection}>
        <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
        <Button>Qidirish</Button>
      </div>
      <div className={styles.commonCatalogStyle}>
        <Typography size="28" weight="800" bottom="30">
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
        <Typography size="28" weight="800" bottom="30">
          Shifokorlar mutaxassisligi bo‘yicha
        </Typography>
        <div className={styles.catalogListStyle}>
          <div>
            <Typography size="24" weight="500" bottom="20">
              A
            </Typography>
            <div className={styles.linkStyle}>
              {groupedDoctors["A"]
                ?.slice(0, showAll["A"] ? groupedDoctors["A"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["A"]?.length > 5 && (
                <button onClick={() => toggleShowAll("A")}>
                  {showAll["A"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["D"] ? groupedDoctors["D"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["D"]?.length > 5 && (
                <button onClick={() => toggleShowAll("D")}>
                  {showAll["D"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["E"] ? groupedDoctors["E"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["E"]?.length > 5 && (
                <button onClick={() => toggleShowAll("E")}>
                  {showAll["E"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["F"] ? groupedDoctors["F"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["F"]?.length > 5 && (
                <button onClick={() => toggleShowAll("F")}>
                  {showAll["F"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["G"] ? groupedDoctors["G"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["G"]?.length > 5 && (
                <button onClick={() => toggleShowAll("G")}>
                  {showAll["G"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["I"] ? groupedDoctors["I"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["I"]?.length > 5 && (
                <button onClick={() => toggleShowAll("I")}>
                  {showAll["I"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["J"] ? groupedDoctors["J"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["J"]?.length > 5 && (
                <button onClick={() => toggleShowAll("J")}>
                  {showAll["J"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["K"] ? groupedDoctors["K"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["K"]?.length > 5 && (
                <button onClick={() => toggleShowAll("K")}>
                  {showAll["K"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["L"] ? groupedDoctors["L"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["L"]?.length > 5 && (
                <button onClick={() => toggleShowAll("L")}>
                  {showAll["L"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["M"] ? groupedDoctors["M"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["M"]?.length > 5 && (
                <button onClick={() => toggleShowAll("M")}>
                  {showAll["M"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["N"] ? groupedDoctors["N"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["N"]?.length > 5 && (
                <button onClick={() => toggleShowAll("N")}>
                  {showAll["N"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["O"] ? groupedDoctors["O"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["O"]?.length > 5 && (
                <button onClick={() => toggleShowAll("O")}>
                  {showAll["O"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["P"] ? groupedDoctors["P"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["P"]?.length > 5 && (
                <button onClick={() => toggleShowAll("P")}>
                  {showAll["P"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["Q"] ? groupedDoctors["Q"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["Q"]?.length > 5 && (
                <button onClick={() => toggleShowAll("Q")}>
                  {showAll["Q"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["R"] ? groupedDoctors["R"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["R"]?.length > 5 && (
                <button onClick={() => toggleShowAll("R")}>
                  {showAll["R"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["S"] ? groupedDoctors["S"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["S"]?.length > 5 && (
                <button onClick={() => toggleShowAll("S")}>
                  {showAll["S"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["T"] ? groupedDoctors["T"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["T"]?.length > 5 && (
                <button onClick={() => toggleShowAll("T")}>
                  {showAll["T"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["U"] ? groupedDoctors["U"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["U"]?.length > 5 && (
                <button onClick={() => toggleShowAll("U")}>
                  {showAll["U"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["V"] ? groupedDoctors["V"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["V"]?.length > 5 && (
                <button onClick={() => toggleShowAll("V")}>
                  {showAll["V"] ? "Yashirish" : "Barchasini ko‘rsatish"}
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
                ?.slice(0, showAll["Y"] ? groupedDoctors["Y"].length : 5)
                .map((doctor: string, idx: number) => (
                  <div key={idx}>
                    <Link href="/" className={styles.link}>
                      {doctor}
                    </Link>
                  </div>
                ))}
              {groupedDoctors["Y"]?.length > 5 && (
                <button onClick={() => toggleShowAll("Y")}>
                  {showAll["Y"] ? "Yashirish" : "Barchasini ko‘rsatish"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <h3>Toshkentda shifokorlar mutaxassisligi bo‘yicha</h3>
      <div className={styles.SelectionStyle}>
        <select name="doctorsType" id="doctorsType">
          <option value="1">Mutaxassisliklar bo‘yicha qidiring</option>
          {doctorsType.map((val, idx) => (
            <option value={idx} key={idx}>
              {val}
            </option>
          ))}
        </select>
        <select name="districts" id="districts">
          <option value="1">Tuman</option>
          {districts.map((val, idx) => (
            <option value={idx} key={idx}>
              {val}
            </option>
          ))}
        </select>
        <select name="medicalCenters" id="medicalCenters">
          <option value="1">Tibbiy muassasa turi</option>
          {medicalCenters.map((val, idx) => (
            <option value={idx} key={idx}>
              {val}
            </option>
          ))}
        </select>
        <select name="doctorGender" id="doctorGender">
          <option value="1">Shifokor jinsi</option>
          {doctorGender.map((val, idx) => (
            <option value={idx} key={idx}>
              {val}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.popularDoctors}>
        {popularDoctors.map((val, idx) => (
          <div key={idx}>
            <p>{val.type}</p>
            <h4>{val.fullName}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;
