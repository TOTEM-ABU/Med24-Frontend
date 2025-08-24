import Link from "next/link";
import styles from "./AskTelegram.module.css";

const TELEGRAM_URL = "https://med24.uz/opentelegram?start=mo";

const AskTelegram = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.texts}>
          <h3>Kerakli ma'lumot topmadingizmi?</h3>
          <p>
            Bizga Telegramda yozing, biz sizga shifokor topib, qabuliga yozib
            beramiz
          </p>
        </div>
        <Link
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Telegramda yozish
        </Link>
      </div>
    </div>
  );
};

export default AskTelegram;
