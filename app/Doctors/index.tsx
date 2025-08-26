import React, { useState } from "react";
import styles from "./Doctors.module.css";
import { Button, Input } from "./components";

const DoctorsPage = () => {
  const doctorsA = [
    "Akusher",
    "Allergolog",
    "Androlog",
    "Anesteziolog",
    "Aritmolog",
    "Artirolog",
    "Audiolog",
  ];
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

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={styles.miniContainer}>
      <div className={styles.searchSection}>
        <Input inputPlaceholder="Shifokor ismi, mutaxassislik nomini yoki dori-darmon kiriting" />
        <Button>Qidirish</Button>
      </div>
      <div className={styles.commonCatalogStyle}>
        <h3>Ommabop mutaxassisliklar</h3>
        <ul>
          <li>
            <p>Kardiolog</p>
          </li>
          <li>
            <p>Ortoped</p>
          </li>
          <li>
            <p>Pulmonolog</p>
          </li>
          <li>
            <p>Stomatolog</p>
          </li>
          <li>
            <p>Terapevt</p>
          </li>
          <li>
            <p>Travmatolog</p>
          </li>
        </ul>
      </div>
      <h3>Shifokorlar mutaxassisligi boyicha</h3>
      <div className={styles.catalogStyle}>
        <div>
          <h5>A</h5>
          <div>
            {doctorsA.slice(0, showAll ? doctorsA.length : 5).map((a, idx) => (
              <div key={idx}>{a}</div>
            ))}
            {doctorsA.length > 5 && (
              <button onClick={toggleShowAll}>
                {showAll ? "Yashirish" : "Barchasini ko'rsatish"}
              </button>
            )}
          </div>
        </div>
        <div>
          <h5>D</h5>
        </div>
        <div>
          <h5>E</h5>
        </div>
        <div>
          <h5>F</h5>
        </div>
        <div>
          <h5>G</h5>
        </div>
        <div>
          <h5>I</h5>
        </div>
        <div>
          <h5>J</h5>
        </div>
        <div>
          <h5>K</h5>
        </div>
        <div>
          <h5>L</h5>
        </div>
        <div>
          <h5>M</h5>
        </div>
        <div>
          <h5>N</h5>
        </div>
        <div>
          <h5>O</h5>
        </div>
        <div>
          <h5>P</h5>
        </div>
        <div>
          <h5>Q</h5>
        </div>
        <div>
          <h5>R</h5>
        </div>
        <div>
          <h5>S</h5>
        </div>
        <div>
          <h5>T</h5>
        </div>
        <div>
          <h5>U</h5>
        </div>
        <div>
          <h5>V</h5>
        </div>
        <div>
          <h5>Y</h5>
        </div>
      </div>
      <h3>Toshkentda shifokorlar mutaxassisligi boyicha</h3>
      <div className={styles.SelectionStyle}>
        <select name="doctorsType" id="doctorsType">
          <option value="1">Mutaxassisliklar bo`yicha qidiring</option>
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
