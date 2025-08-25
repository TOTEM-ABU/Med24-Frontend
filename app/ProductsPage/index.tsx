import Breadcrumb from "@/components/Breadcrumb";
import React from "react";
import styles from "./ProductsPage.module.css";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import img1 from "./images/medicine.png";
import ProductCard from "@/components/ProductCard";
import img2 from "./images/img2.webp";
import img3 from "./images/img3.webp";
import img4 from "./images/img4.webp";
import img5 from "./images/img5.webp";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import heart from "./images/heart.png";

const ProductsPage = () => {
    const products = [
        {
            image: img2,
            price: "45 000",
            name: "No-shpa",
        },
        {
            image: img1,
            price: "45 000",
            name: "Sinupret",
        },
        {
            image: img4,
            price: "45 000",
            name: "Enterojermina",
        },
        {
            image: img5,
            price: "45 000",
            name: "Zodak",
        },
    ];

    return (
        <div className="container">
            <div className={styles["products-container"]}>
                <Breadcrumb
                    items={[
                        { label: "Asosiy sahifa", href: "/" },
                        { label: "Dorilar" },
                    ]} className={styles['breadcrumb']}
                />

                <h1 className={styles["main-text"]}>
                    Toshkentdagi dorixonalarda qidirish
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

                <div className={styles["promotion-banner"]}>
                    <div className="bg-[#F6F8F9] cursor-pointer gap-[20px] sm:gap-[64px] items-start overflow-hidden flex sm:flex-row mx-[2px] pt-[39px] pb-[30px] pl-[50px] sm:pl-[55px] rounded-[24px]">
                        <div className="">
                            <h2 className="font-[700] text-[34px]">
                                Арбидол – защита
                                <br /> иммунитета!
                            </h2>
                            <p className="mb-[19px] mt-[14px] font-[600]">
                                Помогает укрепить иммунную систему и бороться с
                                вирусами.
                                <br />
                                Будьте защищены в любое время!
                            </p>
                            <button className="bg-[#007AFF] text-[#fff] text-[16px] py-[14px] rounded-[14px] min-w-[220px] border-none">
                                В магазин
                            </button>
                        </div>
                        <div className="translate-y-[0] sm:translate-y-[-40px] flex flex-col items-center">
                            <img
                                className="max-w-[350px]"
                                src={img1.src}
                                alt="Arbidol product"
                            />
                        </div>
                    </div>
                </div>

                <div className={styles['seasonal-products']}>
                    <h2>Mavsumiy dorilar</h2>
                    <div className={styles["product-cards"]}>
                        {products.map((product) => {
                            return (
                                <ProductCard
                                    image={product.image.src}
                                    name={product.name}
                                    price={product.price}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className={styles['links-container']}>
                    <h2>Qanday ta'sir qiladi?</h2>
                    <div className={styles["grid-links"]}>
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

                <div className={styles['links-container']}>
                    <h2>Go'zallik va salomatlik</h2>
                    <div className={styles["beauty"]}>
                        <ProductCard
                            image={img1.src}
                            name="Arbidol"
                            price="32 000"
                        />
                        <ProductCard
                            image={img1.src}
                            name="Arbidol"
                            price="32 000"
                        />
                    </div>
                </div>

                <div className={styles['links-container']}>
                    <h2>Butun oila uchun vitaminlar</h2>
                    <div className={styles["beauty"]}>
                        <ProductCard
                            image={img1.src}
                            name="Arbidol"
                            price="32 000"
                        />
                        <ProductCard
                            image={img1.src}
                            name="Arbidol"
                            price="32 000"
                        />
                    </div>
                </div>

                <div className={styles['links-container']}>
                    <h2>Nima uchun?</h2>
                    <div className={styles["grid-links"]}>
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

                <div className={styles['links-container']}>
                    <h2>Nimadan?</h2>
                    <div className={styles["grid-links"]}>
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

                <div className={styles['links-container']}>
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

                <div className={styles['links-container']}>
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

                <div className={styles['alpha-container']}>
                    <h2>Dori vositalari alifbo ko'rsatkichi</h2>
                    <div className={styles['alphabet']}>
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

export default ProductsPage;
