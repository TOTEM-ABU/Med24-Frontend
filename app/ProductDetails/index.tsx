import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import medImg1 from "../ProductsType/images/medicineImg.png";
import { FaFile } from "react-icons/fa6";
import isVerified from "./images/uzb.webp";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DoctorTypeCard from "@/components/DoctorTypeCard";
import { DOCTOR_SPECIALTIES } from "@/lib/constants";
import Image from "next/image";

const Product = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const tabs = [
    "Aptekada narxlar",
    "Qo'llanma",
    "Savollar va javoblar",
    "Sharhlar",
  ];

  const faqData = [
    {
      question:
        "Зарегистрирован ли препарат ENDOMASTIN kapsulalar крем в реестре препаратов Узбекистана?",
      answer: "Да, препарат зарегистирован в реестре препаратов Узбекистана.",
    },
    {
      question:
        "Кто производитель препарата ENDOMASTIN kapsulalar крем и какая страна происхождения?",
      answer:
        'Препарат ENDOMASTIN kapsulalar крем производится компанией "Фармацевтическая компания" в Узбекистане.',
    },
    {
      question:
        "Сколько стоит препарат ENDOMASTIN kapsulalar крем в аптеках Узбекистана?",
      answer:
        "Начальная цена препарата ENDOMASTIN kapsulalar крем - от 566000 so'm.",
    },
    {
      question: "ENDOMASTIN kapsulalar крем продается по рецепту?",
      answer:
        "Препарат ENDOMASTIN kapsulalar крем не является рецептурным препаратом.",
    },
  ];

  const handleFaqToggle = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Aptekada narxlar
        return (
          <div className={styles["tab-content"]}>
            <h2 className={styles["tab-heading"]}>
              Dorixonalarda ENDOMASTIN kapsulalar narxi
            </h2>
            <div className={styles["card-container"]}>
              <ProductDetailsCard
                image={medImg1.src}
                name="ЭНДОМАСТИН капсулы №60"
                owner="DAMAAR"
                price="557 000"
                isReceipt={false}
              />
            </div>
          </div>
        );
      case 1: // Qo'll
        return (
          <div className={styles["tab-content"]}>
            <h2 className={styles["tab-heading"]}>
              Ko&apos;rsatmalar ENDOMASTIN kapsulalar kukuni
            </h2>

            <div className={styles["instruction-section"]}>
              <h3>Qo&apos;llanma</h3>\r
              <p>
                Рекомендуется при лечении и профилактике: Мастопатии,
                Эндометриоза и аденомиоза, Миомы матки, Гиперплазии, эндометрия
                без атипии. Восстановление после хирургического лечения и
                профилактика рецидивов. Профилактика рака молочной железы
              </p>
            </div>

            <div className={styles["instruction-section"]}>
              <h3>Foydalanish uchun ko&apos;rsatmalar</h3>
              <p>
                Эндомастин рекомендуется при лечении следующих заболеваний: -
                мастопатия - эндометриоз - аденомиоз - миомы матки - гиперплазия
                эндометрия без атипии - профилактики рецидивов указанных
                заболеваний после хирургического лечения - профилактика рака
                молочной железы Эндомастин оказывает выраженное тормозящее
                действие на рецидивированиеэндометриоидных кист яичников в
                послеоперационном периоде.
              </p>
            </div>

            <div className={styles["instruction-section"]}>
              <h3>Kompozitsiya</h3>
              <p>
                Indol 3-korbinol – 300 мг, Epigallat -100 мг Vitex agnus-castus
                L. 100 мг
              </p>
            </div>

            <div className={styles["instruction-section"]}>
              <h3>Farmakologik ta&apos;sir</h3>
              <p>
                Индол - является универсальным корректором гиперпластических
                патологических процессов в органах и тканях женской
                репродуктивной системы (молочной железе, эндометрии, миометрии,
                шейке матки, яичниках). Нормализует баланс эстрогенов в
                организме и подавляет их негативное стимулирующее влияние, а
                также блокирует другие (гормон-независимые) механизмы,
                активирующие патологический клеточный рост в тканях молочной
                железы и матки. Обладает способностью вызывать избирательную
                гибель трансформированных клеток с аномально высокой
                пролиферативной активностью. Активные вещества эпигаллата
                обладают множественным этиопатогенетическим действием в
                отношении гиперпластических процессов репродуктивной системы.
                Подавляют патологический рост и деление клеток в органах и
                тканях женской репродуктивной системы, обусловленные
                негормональными стимулами. Снижают инвазивную активность клеток
                эндометрия, а также вызывают избирательную гибель (апоптоз)
                клеток с повышенной пролиферативной активностью. Эпигаллат
                обладает выраженным антиангиогенным действием (подавляет
                патологический рост новых сосудов) и тем самым препятствует
                росту новообразований. Витекс священный – кустарник с
                многолетней историей применения плодов и листьев Доказанные
                свойства витекса священного антипролиферативное: способствует
                торможению патологического разрастания сосудистых клеток и
                формированию капилляров5, что представляет интерес при
                эндометриозе, воспалительных и опухолевых заболеваниях
              </p>
            </div>

            <div className={styles["instruction-section"]}>
              <h3>Yon ta&apos;siri</h3>
              <p>
                Возможно в редких случаях аллергические реакции при повышенной
                чувствительности к отдельным ингредиентам препарата. При
                развитии реакции повышенной чувствительности применение
                препарата необходимо прекратить.
              </p>
            </div>

            <div className={styles["instruction-section"]}>
              <h3>Bolalarda foydalanish</h3>
            </div>

            <div className={styles["instruction-section"]}>
              <h3>Kontraindikatsiyalar</h3>
              <p>
                Индивидуальная непереносимость компонентов препарата. Беременные
                и кормящие женщины. Детский возраст до 14 лет
              </p>
            </div>
          </div>
        );
      case 2: // Savollar va javoblar
        return (
          <div className={styles["tab-content"]}>
            <h2 className={styles["tab-heading"]}>
              Mahsulot haqida savolingiz bormi?
            </h2>
            <div className={styles["faq-container"]}>
              {faqData.map((faq, index) => (
                <div key={index} className={styles["faq-item"]}>
                  <div
                    className={styles["faq-question"]}
                    onClick={() => handleFaqToggle(index)}
                  >
                    <span className={styles["faq-text"]}>{faq.question}</span>
                    <span
                      className={`${styles["chevron"]} ${
                        openFaqIndex === index ? styles["chevron-rotated"] : ""
                      }`}
                    >
                      <MdOutlineKeyboardArrowDown size={20} color="#757575" />
                    </span>
                  </div>
                  {openFaqIndex === index && (
                    <div className={styles["faq-answer"]}>
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className={styles["tab-content"]}>
            <div className={styles["empty-reviews"]}></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className={styles["product-details-container"]}>
        <Breadcrumb
          items={[
            { label: "Asosiy sahifa", href: "/" },
            { label: "Dorilar", href: "/products" },
            { label: "ENDOMASTIN kapsulalar" },
          ]}
        />

        <div className={styles["input-container"]}>
          <Input
            label="Shifokor ismi, mutaxassislik nomini yoki dor-darmon kiriting"
            width="100%"
          />
          <Button name="Qidirish" variant="primary" padding="0 38px 0 38px" />
        </div>

        <div>
          <h2 className={styles["main-text"]}>ENDOMASTIN kapsulalar</h2>
          <div className={styles["details-container"]}>
            <div className={styles["image-container"]}>
              <Image
                src={medImg1.src}
                alt="product-image"
                width={200}
                height={200}
              />
            </div>
            <div className={styles["imgs-container"]}>
              <ul>
                <li>
                  <Image
                    src={medImg1.src}
                    alt="product-image"
                    width={200}
                    height={200}
                  />
                </li>
              </ul>
            </div>
            <div className={styles["text-container"]}>
              <div className={styles["badges"]}>
                <div className={styles["card-header"]}>
                  <FaFile />
                  <span>Retsepsiz</span>
                </div>
                <div className={styles["card-header"]}>
                  <FaFile />
                  <span>Mashhur dori darmon</span>
                </div>
                <div className={styles["card-header"]}>
                  <FaFile />
                  <span>Ro&apos;yxatda mavjud</span>
                </div>
              </div>
              <div className={styles["second-container"]}>
                <h2>Mahsulot haqida ma&apos;lumot</h2>
                <a href="#">
                  <Image
                    src={isVerified.src}
                    alt="isverBtn"
                    width={200}
                    height={200}
                  />
                </a>
              </div>

              <div className={styles["texts"]}>
                <p className={styles["desc-text"]}>
                  Faol moddalar:{" "}
                  <strong>
                    Индол‑3‑карбинол, Эпигаллат, Vitex agnus‑castus L
                  </strong>
                </p>
                <p className={styles["desc-text"]}>
                  Ishlab chiqaruvchi: <span>DAMAR (O&apos;zbekiston)</span>
                </p>
                <p className={styles["desc-text"]}>
                  Saqlash sharoitlari:{" "}
                  <span>
                    <span>
                      Хранить при комнатной температуре (оптимально между 15 °C
                      и 25 °C), но допускаются небольшие отклонения вплоть до 40
                      °C. Избегать прямых солнечных лучей, высоких температур и
                      влажности. Не допускать замораживания — стабильность
                      препарата при минусовых температурах не установлена.
                      Хранить в оригинальной упаковке, в защищённом от света и
                      влаги месте. Не размещать вблизи отопительных приборов,
                      радиаторов или оконных подоконников. Хранить в недоступном
                      для детей месте.
                    </span>
                  </span>
                </p>
                <p className={styles["price"]}>
                  Narx: <span>566 000 so&apos;m</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["tabs"]}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${styles["tab-item"]} ${
                activeTab === index ? styles["active-tab"] : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span>{tab}</span>
            </div>
          ))}
        </div>

        {renderTabContent()}

        <div className={styles["links-container"]}>
          <h2>Shifokorlarning keng tarqalgan mutaxassisliklari</h2>
          <div className={styles["doctor-types"]}>
            {DOCTOR_SPECIALTIES.slice(0, 6).map((specialty, index) => (
              <DoctorTypeCard
                key={specialty.name}
                image={specialty.image}
                name={specialty.name}
                className={index === 0 ? styles["wide"] : ""}
              />
            ))}
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
            <div>
              <ul className={styles["table-links"]}>
                <li>
                  <a href="#">Anestetik vositalar</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
