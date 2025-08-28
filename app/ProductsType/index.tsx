import React from "react";
import styles from "./ProductsType.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import imgMain from "./images/main-image.webp";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import brand1 from "./images/brand1.svg";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import medImg from "./images/medicineImg.png";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import heart from "./../ProductsPage/images/heart.png";

const ProductsType = () => {
    const products = [
        {
            image: medImg.src,
            name: "ENDOMASTIN kapsulalar",
            owner: "DAMAR (O'zbekiston)",
            price: "566 000",
        },
        {
            image: medImg.src,
            name: "CARDIOMAGNIL tabletka",
            owner: "TAKEDA (Rossiya)",
            price: "245 500",
        },
        {
            image: medImg.src,
            name: "ASPIRIN CARDIO kapsulalar",
            owner: "BAYER (Germaniya)",
            price: "189 000",
        },
        {
            image: medImg.src,
            name: "OMEPRAZOL kapsulalar",
            owner: "GEDEON RICHTER (Vengriya)",
            price: "125 000",
        },
        {
            image: medImg.src,
            name: "METFORMIN tabletka",
            owner: "TEVA (Isroil)",
            price: "89 500",
        },
        {
            image: medImg.src,
            name: "PARACETAMOL sirop",
            owner: "JULPHAR (BAA)",
            price: "45 000",
        },
        {
            image: medImg.src,
            name: "VITAMIN D3 kapsulalar",
            owner: "SOLGAR (AQSh)",
            price: "320 000",
        },
        {
            image: medImg.src,
            name: "CITRAMON tabletka",
            owner: "FARMSTANDART (Rossiya)",
            price: "12 500",
        },
        {
            image: medImg.src,
            name: "NOSHPA tabletka",
            owner: "CHINOIN (Vengriya)",
            price: "67 800",
        },
        {
            image: medImg.src,
            name: "IBUPROFEN gel",
            owner: "KRKA (Sloveniya)",
            price: "34 000",
        },
        {
            image: medImg.src,
            name: "AMOXICILLIN kapsulalar",
            owner: "SANDOZ (Shveytsariya)",
            price: "156 000",
        },
        {
            image: medImg.src,
            name: "CETIRIZIN tabletka",
            owner: "HEXAL (Germaniya)",
            price: "78 500",
        },
    ];

    return (
        <div className="container">
            <div className={styles["product-type-container"]}>
                <Breadcrumb
                    items={[
                        { label: "Asosiy sahifa", href: "/" },
                        { label: "Dorilar", href: "/products" },
                        { label: "Antiallergik dorilar" },
                    ]}
                />
                <a href="#" className={styles["main-link"]}>
                    <img
                        src={imgMain.src}
                        alt="rek-image"
                        className={styles["main-image"]}
                    />
                </a>

                <h1 className={styles["main-text"]}>
                    Allergiyaga qarshi dorilar Toshkentda
                </h1>

                <div className={styles["input-container"]}>
                    <Input
                        label="Shifokor ismi, mutaxassislik nomini yoki dor-darmon kiriting"
                        width="100%"
                    />
                    <Button
                        name="Qidirish"
                        variant="primary"
                        padding="0 38px 0 38px"
                    />
                </div>

                <div className={styles["brand-container"]}>
                    <h2 className={styles["brands"]}>Brendlar</h2>
                    <div className={styles["brand-image-container"]}>
                        <a href="#">
                            <img src={brand1.src} alt="brand-image" />
                        </a>
                        <a href="#">
                            <img src={brand1.src} alt="brand-image" />
                        </a>
                        <a href="#">
                            <img src={brand1.src} alt="brand-image" />
                        </a>
                        <a href="#">
                            <img src={brand1.src} alt="brand-image" />
                        </a>
                    </div>
                </div>

                <div>
                    <h2>Ommabop mahsulotlar</h2>
                    <div className={styles["products-container"]}>
                        {products.map((product, index) => {
                            return (
                                <div key={index}>
                                    <ProductDetailsCard
                                        image={product.image}
                                        name={product.name}
                                        owner={product.owner}
                                        price={product.price}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles["button-container"]}>
                    <Button name="Yana ko'rsatish" className={styles["btn"]} />
                </div>

                <div className={styles["links-container"]}>
                    <h2>Shifokorlarning keng tarqalgan mutaxassisliklari</h2>
                    <div className={styles["doctor-types"]}>
                        <DoctorTypeCard
                            image={heart.src}
                            name="Kardiolog"
                            className={styles["wide"]}
                        />
                        <DoctorTypeCard image={heart.src} name="Nevrolog" />
                        <DoctorTypeCard image={heart.src} name="Ortoped" />
                        <DoctorTypeCard image={heart.src} name="Terapevt" />
                        <DoctorTypeCard image={heart.src} name="Urolog" />
                        <DoctorTypeCard image={heart.src} name="Endokrinolog" />
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Keng tarqalgangan tibbiy xizmatlar</h2>
                    <div className={styles["grid-links-black"]}>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles["table-links"]}>
                                <li>
                                    <a href="#">Anestetik vositalar</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles["alpha-container"]}>
                    <h2>Dori vositalari alifbo ko'rsatkichi</h2>
                    <div className={styles["alphabet"]}>
                        <span>A</span>
                        <span>B</span>
                        <span>C</span>
                        <span>D</span>
                        <span>E</span>
                        <span>F</span>
                        <span>G</span>
                        <span>H</span>
                        <span>I</span>
                        <span>J</span>
                        <span>K</span>
                        <span>L</span>
                        <span>M</span>
                        <span>N</span>
                        <span>O</span>
                        <span>P</span>
                        <span>Q</span>
                        <span>R</span>
                        <span>S</span>
                        <span>T</span>
                        <span>U</span>
                        <span>V</span>
                        <span>W</span>
                        <span>X</span>
                        <span>Y</span>
                        <span>Z</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsType;
