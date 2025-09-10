import Breadcrumb from "@/components/Breadcrumb";
import React, { useState } from "react";
import styles from "./ProductsPage.module.css";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import img1 from "./images/medicine.png";
import ProductCard from "@/components/ProductCard";
import img2 from "./images/img2.webp";
import img4 from "./images/img4.webp";
import img5 from "./images/img5.webp";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import heart from "./images/heart.png";
import { useGetAllProducts } from "@/hooks/useProducts";
import Image from "next/image";
import { useGetMedicationPriceById } from "@/hooks/useMedicinePrices";
import { useGetAllServices } from "@/hooks/useService";
import { useGetAllMedicineCategories } from "@/hooks/useMedicineCategories";
import { useRouter } from "next/router";

const ProductsPage = () => {
    const [visibleCard, setVisibleCard] = useState(5);
    const { data: med } = useGetAllProducts();
    const { data: pr } = useGetMedicationPriceById("");
    const { data: cat } = useGetAllMedicineCategories();
    const {data: ser} = useGetAllServices()
    const router = useRouter()

    const medicines = med?.data;

    const medicineCategories = cat?.data;

    const services = ser?.data

    const price = pr?.data;

    const handleLink = (name: string) => {
        router.push(`/products/${name}`)
    }


    return (
        <div className="container">
            <div className={styles["products-container"]}>
                <Breadcrumb
                    items={[
                        { label: "Asosiy sahifa", href: "/" },
                        { label: "Dorilar" },
                    ]}
                    className={styles["breadcrumb"]}
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
                    <div className={styles["promotion-banner-content"]}>
                        <div className={styles["promotion-banner-text"]}>
                            <h2 className={styles["promotion-banner-title"]}>
                                Арбидол – защита
                                <br /> иммунитета!
                            </h2>
                            <p
                                className={
                                    styles["promotion-banner-description"]
                                }
                            >
                                Помогает укрепить иммунную систему и бороться с
                                вирусами.
                                <br />
                                Будьте защищены в любое время!
                            </p>
                            <button
                                className={styles["promotion-banner-button"]}
                            >
                                В магазин
                            </button>
                        </div>
                        <div className={styles["promotion-banner-image"]}>
                            <Image
                                src={img1.src}
                                alt="Arbidol product"
                                width={300}
                                height={200}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles["seasonal-products"]}>
                    <h2>Mavsumiy dorilar</h2>
                    <div className={styles["product-cards"]}>
                        {medicines?.slice(0, visibleCard).map(
                            (
                                product: {
                                    image_url: string;
                                    name: string;
                                    price: string;
                                },
                                index: React.Key | null | undefined
                            ) => {
                                return (
                                    <ProductCard
                                        key={index}
                                        image={product.image_url}
                                        name={product.name}
                                        price={"50000"}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Qanday ta&apos;sir qiladi?</h2>
                    <div className={styles["grid-links"]}>
                        {medicineCategories?.map(
                            (category: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <ul className={styles["table-links"]}>
                                            <li>
                                                <a href="" onClick={() => handleLink(category.name)}>{category.name}</a>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Go&apos;zallik va salomatlik</h2>
                    <div className={styles["beauty"]}>
                        {medicines?.slice(3, visibleCard).map(
                            (
                                product: {
                                    image_url: string;
                                    name: string;
                                    price: string;
                                },
                                index: React.Key | null | undefined
                            ) => {
                                return (
                                    <ProductCard
                                        key={index}
                                        image={product.image_url}
                                        name={product.name}
                                        price={"50000"}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Butun oila uchun vitaminlar</h2>
                    <div className={styles["beauty"]}>
                        {medicines?.slice(2, 4).map(
                            (
                                product: {
                                    image_url: string;
                                    name: string;
                                    price: string;
                                },
                                index: React.Key | null | undefined
                            ) => {
                                return (
                                    <ProductCard
                                        key={index}
                                        image={product.image_url}
                                        name={product.name}
                                        price={"50000"}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Nima uchun?</h2>
                    <div className={styles["grid-links"]}>
                                                {medicineCategories?.map(
                            (category: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <ul className={styles["table-links"]}>
                                            <li>
                                                <a href="">{category.name}</a>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles["links-container"]}>
                    <h2>Nimadan?</h2>
                    <div className={styles["grid-links"]}>
                                                {medicineCategories?.map(
                            (category: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <ul className={styles["table-links"]}>
                                            <li>
                                                <a href="">{category.name}</a>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            }
                        )}
                    </div>
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
                                                {services?.map(
                            (category: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <ul className={styles["table-links"]}>
                                            <li>
                                                <a href="">{category.name}</a>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                <div className={styles["alpha-container"]}>
                    <h2>Dori vositalari alifbo ko&apos;rsatkichi</h2>
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

export default ProductsPage;
