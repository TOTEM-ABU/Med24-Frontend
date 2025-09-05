import React from "react";
import styles from "./Contact.module.css";
import { Breadcrumb, Button } from "@/components";
import { FaTelegram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import Input from "@/components/SearchBar";
import YandexMap from "@/components/YandexMap";

const ContactsPage = () => {
    return (
        <div className="container">
            <div className={styles["contacts-container"]}>
                <Breadcrumb
                    items={[
                        { label: "Asosiy", href: "/" },
                        { label: "Контакты" },
                    ]}
                />
                <section className={styles["header-container"]}>
                    <div className={styles["address-container"]}>
                        <h1 className={styles["header-text"]}>
                            Kontaktlar Med24.uz
                        </h1>
                        <p className={styles["business-name"]}>
                            "SMART MEDIA SOLUTIONS" MASULIYATI CHEKLANGAN
                            JAMIYATI
                        </p>
                        <a href="mailto:info@med24.uz">info@med24.uz</a>
                        <p>
                            100005, O‘zbekiston, Toshkent shahri, Sayram
                            ko‘chasi, 25 <br /> <span>dush-shan: </span>{" "}
                            09:00-18:00{" "}
                        </p>
                        <h3>Bizni kuzating</h3>
                        <div className={styles["logo-container"]}>
                            <a href="https://telegram.org/">
                                <FaTelegram className={styles["logo"]} />
                            </a>
                            <a href="https://www.facebook.com/">
                                <FaFacebook className={styles["logo"]} />
                            </a>
                        </div>
                    </div>
                    <div className="form">
                        <h3 className={styles['form-text']}>
                            Bizning xizmatimiz haqida qo‘shimcha ma’lumot
                            kerakmi?
                        </h3>
                        <p>
                            Quyidagi shakldan foydalanib bizga kontakt
                            ma’lumotlaringizni yuboring va biz tez orada siz
                            bilan bog‘lanamiz.
                        </p>
                        <form>
                            <div className={styles['form-container']}>
                                <div className={styles["first-container"]}>
                                    <input
                                        type="text"
                                        placeholder="Ismingiz*"
                                        className={styles["input"]}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Telefon raqamingiz*"
                                        className={styles["input"]}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Emailingiz*"
                                        className={styles["input"]}
                                    />
                                </div>
                                <div>
                                    <textarea className={styles['textarea']} placeholder="Savolingiz*">

                                    </textarea>
                                </div>
                                <Button variant="primary" name="Yuborish" className={styles['button']}/>
                            </div>
                        </form>
                    </div>
                </section>
                <div>
                        <YandexMap coordinate={[41.232690, 69.193723]}/>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
