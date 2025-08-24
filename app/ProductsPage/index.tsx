import Breadcrumb from "@/components/Breadcrumb";
import React from "react";
import styles from "./ProductsPage.module.css";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import img1 from "./images/medicine.png";

const ProductsPage = () => {
    return (
        <div className="container">
            <div className={styles["products-container"]}>
                <Breadcrumb
                    items={[
                        { label: "Asosiy sahifa", href: "/" },
                        { label: "Dorilar" },
                    ]}
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

                <div className="sm:my-[60px] my-[40px]">
                    <h2 className="text-[28px] font-[600]">Mavsumiy dorilar</h2>

                    <div className="carousel__main__wrapper sm:block hidden">
                        <div className="swiper mySwiper">
                            <div className="swiper-wrapper">
                                <div
                                    className="swiper-slide"
                                    style={{ width: 167, marginRight: 10 }}
                                >
                                    <a
                                        href="https://apteka.uz/opentelegram?start=d-o_338737"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#F6F8F9] block cursor-pointer h-[162px] w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                                    >
                                        <img
                                            alt="No-shpa"
                                            loading="lazy"
                                            src="https://main.med24.uz/uploads/partner-block/a48/5ec/a485ec3a17bc8b6420e05e9ade8ea15c.webp"
                                            className="object-contain h-[100%] w-[100%]"
                                        />
                                    </a>
                                    <p className=" font-[500] mt-[14px] mb-[6px]">
                                        45 000 so‘m
                                    </p>
                                    <p className="font-[400]">No-shpa</p>
                                </div>

                                <div
                                    className="swiper-slide"
                                    style={{ width: 167, marginRight: 10 }}
                                >
                                    <a
                                        href="https://apteka.uz/opentelegram?start=d-o_303242"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#F6F8F9] block cursor-pointer h-[162px] w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                                    >
                                        <img
                                            alt="Sinupret"
                                            loading="lazy"
                                            src="https://main.med24.uz/uploads/partner-block/394/0e0/3940e01dee6259608663cc662a2ce3a8.webp"
                                            className="object-contain h-[100%] w-[100%]"
                                        />
                                    </a>
                                    <p className="font-[500] mt-[14px] mb-[6px]">
                                        1 000 so‘m
                                    </p>
                                    <p className="font-[400]">Sinupret</p>
                                </div>

                                <div
                                    className="swiper-slide"
                                    style={{ width: 167, marginRight: 10 }}
                                >
                                    <a
                                        href="https://apteka.uz/opentelegram?start=d-o_326934"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#F6F8F9] block cursor-pointer h-[162px] w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                                    >
                                        <img
                                            alt="Enterojermina"
                                            loading="lazy"
                                            src="https://main.med24.uz/uploads/partner-block/323/f41/323f4155ffd148677ddaa1c5d73f1215.webp"
                                            className="object-contain h-[100%] w-[100%]"
                                        />
                                    </a>
                                    <p className="font-[500] mt-[14px] mb-[6px]">
                                        29 000 so‘m
                                    </p>
                                    <p className="font-[400]">Enterojermina</p>
                                </div>

                                <div
                                    className="swiper-slide"
                                    style={{ width: 167, marginRight: 10 }}
                                >
                                    <a
                                        href="https://apteka.uz/opentelegram?start=d-o_332297"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#F6F8F9] block cursor-pointer h-[162px] w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                                    >
                                        <img
                                            alt="Zodak"
                                            loading="lazy"
                                            src="https://main.med24.uz/uploads/partner-block/f36/46c/f3646c96c1f2486271baaac360ad1362.webp"
                                            className="object-contain h-[100%] w-[100%]"
                                        />
                                    </a>
                                    <p className="font-[500] mt-[14px] mb-[6px]">
                                        45 000 so‘m
                                    </p>
                                    <p className="font-[400]">Zodak</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile scroll */}
                    <div className="flex items-center gap-[20px] overflow-x-auto sm:hidden block">
                        <div>
                            <a
                                href="https://apteka.uz/opentelegram?start=d-o_338737"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#F6F8F9] h-[162px] block w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                            >
                                <img
                                    alt="No-shpa"
                                    loading="lazy"
                                    src="https://main.med24.uz/uploads/partner-block/a48/5ec/a485ec3a17bc8b6420e05e9ade8ea15c.webp"
                                    className="object-contain h-[100%] w-[100%]"
                                />
                            </a>
                            <h2 className="font-[500] mt-[14px] mb-[6px]">
                                45000.00 so‘m
                            </h2>
                            <h2 className="font-[400]">No-shpa</h2>
                        </div>

                        <div>
                            <a
                                href="https://apteka.uz/opentelegram?start=d-o_303242"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#F6F8F9] h-[162px] block w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                            >
                                <img
                                    alt="Sinupret"
                                    loading="lazy"
                                    src="https://main.med24.uz/uploads/partner-block/394/0e0/3940e01dee6259608663cc662a2ce3a8.webp"
                                    className="object-contain h-[100%] w-[100%]"
                                />
                            </a>
                            <h2 className="font-[500] mt-[14px] mb-[6px]">
                                1000.00 so‘m
                            </h2>
                            <h2 className="font-[400]">Sinupret</h2>
                        </div>

                        <div>
                            <a
                                href="https://apteka.uz/opentelegram?start=d-o_326934"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#F6F8F9] h-[162px] block w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                            >
                                <img
                                    alt="Enterojermina"
                                    loading="lazy"
                                    src="https://main.med24.uz/uploads/partner-block/323/f41/323f4155ffd148677ddaa1c5d73f1215.webp"
                                    className="object-contain h-[100%] w-[100%]"
                                />
                            </a>
                            <h2 className="font-[500] mt-[14px] mb-[6px]">
                                29000.00 so‘m
                            </h2>
                            <h2 className="font-[400]">Enterojermina</h2>
                        </div>

                        <div>
                            <a
                                href="https://apteka.uz/opentelegram?start=d-o_332297"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#F6F8F9] h-[162px] block w-[162px] mt-[20px] p-[13px] rounded-[20px]"
                            >
                                <img
                                    alt="Zodak"
                                    loading="lazy"
                                    src="https://main.med24.uz/uploads/partner-block/f36/46c/f3646c96c1f2486271baaac360ad1362.webp"
                                    className="object-contain h-[100%] w-[100%]"
                                />
                            </a>
                            <h2 className="font-[500] mt-[14px] mb-[6px]">
                                45000.00 so‘m
                            </h2>
                            <h2 className="font-[400]">Zodak</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
