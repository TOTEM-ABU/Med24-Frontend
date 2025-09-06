import Link from "next/link";
import React from "react";

import styles from "./Terms.module.css";

const TermsPage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.mainHeader}>Foydalanuvchi shartnomasi</p>
      <ul className={styles.mainLinks}>
        <li>
          <Link href="#firstBlock">A`tamalar va ta`riflar</Link>
        </li>
        <li>
          <Link href="#secondBlock">Umumiy qoidalar</Link>
        </li>
        <li>
          <Link href="#thirdBlock">Shartnoma mavzusi</Link>
        </li>
        <li>
          <Link href="#fourthBlock">Saytda joylashtirilgan ma`lumotlar</Link>
        </li>
        <li>
          <Link href="#fifthBlock">Litsenziya</Link>
        </li>
        <li>
          <Link href="#sixthBlock">Maxfiy axborot</Link>
        </li>
        <li>
          <Link href="#seventhBlock">Javobgarlikni cheklash</Link>
        </li>
        <li>
          <Link href="#eightthBlock">Yakuniy qoidalar</Link>
        </li>
      </ul>
      <p className={styles.infoText}>
        Ushbu Foydalanuvchi shartnomasi (keyingi o‘rinlarda “Shartnoma” deb
        yuritiladi) ``SMART MEDIA SOLUTIONS`` MASULIYATI CHEKLANGAN JAMIYATI va
        Internet tarmog‘ida Med24.uz saytidan foydalanish va/yoki foydalanish
        niyatida bo‘lgan har qanday shaxs o‘rtasida tuziladi.
      </p>
      <ul style={{ listStyleType: "disc" }}>
        <li>
          <div className={styles.firstBlock} id="firstBlock">
            <h2>A`tamalar va ta`riflar</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                <strong>Maʼmuriyat</strong> – ``SMART MEDIA SOLUTIONS``
                MASULIYATI CHEKLANGAN JAMIYATI, (Manzil: 100005, O`zbekiston,
                Toshkent, Sayram ko`chasi 25).
              </li>
              <li>
                <strong>Xizmat</strong> - Internet tarmog`idagi{" "}
                <a href="/med24.uz">med24.uz</a> saytlaridan iborat ``Med24.uz``
                dasturiy-apparat majmuasi. Umuman olganda, Xizmatning huquq
                egasi Ma`muriyatdir, Xizmatning alohida komponentlarining huquq
                egalari ma`muriyatga Xizmatning bir qismi sifatida tegishli
                komponentlardan foydalanish huquqini bergan uchinchi shaxslar
                bo`lishi mumkin.
              </li>
              <li>
                <strong>Foydalanuvchi</strong> - Xizmatdan foydalanayotgan yoki
                undan foydalanmoqchi bo`lgan shaxs.
              </li>
              <li>
                <strong>Mutaxassis</strong> - Klinikaning tibbiy xodimi yoki
                boshqa mutaxassis, Xizmatda kimning xizmatlari mavjudligi
                to`g`risidagi ma`lumotlar. Agar Mutaxassis tibbiy mutaxassis
                bo`lmasa, Xizmatda ma`lumotlar joylashtirilgan tegishli
                mutaxassisning xizmatlari tibbiy emas (ular kasalliklarning
                oldini olish, diagnostika qilish va davolash, tibbiy
                reabilitatsiya qilishga qaratilgan emas).
              </li>
              <li>
                <strong>Xizmatlar</strong> - Klinikalar va boshqa tashkilotlar
                tomonidan Foydalanuvchilarga taqdim etilishi mumkin bo`lgan
                tibbiy va boshqa xizmatlar, ular haqida ma`lumotlar Med24da
                joylashtirilgan. Ma`muriyat Xizmatlarni taqdim etmaydi, ulardan
                foydalanish uchun qulaylik yaratadi.
              </li>
              <li>
                <strong>Hamkor</strong> - Med24da xizmatlari joylashtirilgan
                tashkilot yoki yakka tartibdagi tadbirkor. Hamkorlar bilan
                ishlashda va ularning ma’lumotlarini joylashtirishda faqatgina
                amaldagi litsenziyaga ega bo’lgan tashkilotlar yoki yakka
                tartibdagi tadbirkorlar nazarda tutiladi.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.secondBlock} id="secondBlock">
            <h2>Umumiy qoidalar</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Ushbu Shartnoma matni ma`muriyatning noma`lum shaxslar doirasiga
                yo`naltirilgan ommaviy ofertasi (taklifi) bo`lib, ma`muriyatning
                har bir Foydalanuvchi bilan ma`muriyat va foydalanuvchi
                o`rtasidagi o`zaro munosabatlarni tartibga soluvchi shartnoma
                tuzish taklifini o`z ichiga oladi.
              </li>
              <li>
                Foydalanuvchi ma`muriyat tomonidan ushbu Shartnomaning 5-bo`limi
                qoidalariga muvofiq shaxsiy ma`lumotlarni qayta ishlashga
                roziligini onlayn ro`yxatdan o`tish formasidagi ``Ro`yxatdan
                o`tish`` tugmasini bosish orqali yoki Ma`muriyatning
                call-markaziga murojaat qilganda beradi.
              </li>
              <li>
                Xizmatdan va uning har qanday tarkibiy qismlaridan foydalanish,
                shu jumladan uni ko`rish, ma`lumot qidirish, har qanday
                xizmatlardan foydalanish (keyingi o`rinlarda Xizmatdan
                foydalanish deb yuritiladi) faqat ushbu taklif shartlarini
                to`liq va so`zsiz qabul qilgan taqdirdagina mumkin ( qabul
                qilish) ushbu Shartnomada belgilangan shaklda.
              </li>
              <li>
                Ushbu Shartnoma shartlariga rozi bo`lmagan taqdirda,
                Foydalanuvchi Xizmatdan foydalanishni darhol to`xtatishi shart.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.thirdBlock} id="thirdBlock">
            <h2>Shartnoma mavzusi</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Ushbu Shartnomaga ko`ra, Ma`muriyat Foydalanuvchiga Xizmatdan
                bepul foydalanish uchun litsenziya beradi. Xizmat kompyuter
                dasturlari va boshqa dasturiy vositalar, maʼlumotlar bazalari,
                grafik kontent va Xizmatning normal ishlashini va uning
                imkoniyatlaridan foydalanishni taʼminlash uchun birlashtirilgan
                boshqa ishlarning bir qismi sifatida intellektual mulkning
                kompozit (murakkab) obyektidir.
              </li>
              <li>
                Foydalanuvchilar tomonidan Xizmatdan foydalanish foyda olish
                bilan bog`liq bo`lmagan shaxsiy maqsadlarda, Mutaxassislarni
                qidirish, muayyan Mutaxassis yoki muayyan Hamkor bilan uchrashuv
                tashkil qilish, mavjud Hamkorlar haqida ma`lumot berish va
                Mutaxassislar haqidagi ma`lumotlar bilan tanishish uchun amalga
                oshiriladi.
              </li>
              <li>
                Agar Xizmatning funksional imkoniyatlaridan tijorat maqsadlarida
                foydalanish zarur boʻlsa (yaʼni, Xizmatlar, Mutaxassislar va
                Hamkorlar toʻgʻrisidagi maʼlumotlarni joylashtirish, Xizmatlarni
                koʻrsatish uchun foydalanuvchi arizalarini qabul qilishni
                taʼminlash uchun), foydalanuvchi ma`muriyati bilan yozma
                litsenziya shartnomasini tuzishi shart.
              </li>
              <li>
                Xizmatning Mutaxassislar qabuliga yozilish va xizmatlarni
                olgandan keyin mutaxassislar bilan aloqa o`rnatish uchun
                mo`ljallangan funksionalligi bepul taqdim etiladi. Hamkorlar
                tomonidan taqdim etilgan xizmatlar uchun to’lov Foydalanuvchi
                tomonidan tegishli Hamkorlarga to`lanishi kerak.
              </li>
              <li>
                Ma`muriyat tibbiy tashkilot yoki tibbiy tashkilotning vakili
                emas, hech qanday Xizmat ko`rsatmaydi.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.fourthBlock} id="fourthBlock">
            <h2>Saytda joylashtirilgan ma`lumotlar</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Xizmat zarur ixtisoslik, malaka, ish tajribasi yoki Xizmatlar
                bo`yicha mutaxassislarni qidirish, uchrashuvga yozilish va
                bunday uchrashuvni tashkil etish uchun mavjud vaqt oralig`i
                haqida ma`lumot olish, shuningdek, telemeditsina
                texnologiyalaridan foydalangan holda xizmatlarni olish uchun
                mo`ljallangan. Med24da joylashtirilgan mutaxassislar
                to`g`risidagi ma`lumotlar ma`muriyat tomonidan
                to`g`ridan-to`g`ri hamkorlar, mutaxassislar yoki ommaviy axborot
                manbalaridan olinadi. Umumiy foydalanish mumkin bo`lgan
                ma`lumotlarga, jumladan, tibbiy tashkilotning veb-saytida
                joylashtirilgan tibbiyot xodimining familiyasi, ismi, otasining
                ismi, mutaxassisligi, ma`lumoti va tajribasi to`g`risidagi
                ma`lumotlar kiradi. Ma`muriyat tibbiy tashkilotlarning
                veb-saytlaridan olingan ma`lumotlarning to`g`riligini
                tekshirmaydi va javobgar emas.
              </li>
              <li>
                Ma`muriyat Xizmatda joylashtirish uchun Hamkorlar va
                Mutaxassislar tomonidan taqdim etilgan ma`lumotlarni, shu
                jumladan litsenziyalar va ruxsatnomalar mavjudligini tekshirish
                uchun barcha oqilona choralarni ko`radi.
              </li>
              <li>
                Shu bilan birga, ma`muriyat ko`rsatilgan ma`lumotlarning
                dolzarbligini muntazam tekshirmaydi. Shu munosabat bilan,
                Foydalanuvchi ma`lum bir mutaxassisga murojaat qilganda, uning
                zarur ma`lumoti, malakasi, attestatsiyasi va litsenziyalari
                (ruxsatnomalari) mavjudligini mustaqil ravishda tekshirish
                majburiyatini oladi.
              </li>
              <li>
                Xizmat shuningdek, xizmatdan foydalanuvchilarni mavjud tibbiy
                tashkilotlar haqida xabardor qilish va shifokorlar haqidagi
                ma`lumotlar bilan tanishish uchun mo`ljallangan. Maʼmuriyat
                bilan xizmatdan foydalanish boʻyicha litsenziya shartnomasi
                tuzmagan bunday tibbiyot tashkilotlari yoki bunday tibbiy
                tashkilot shifokorlari bilan qabulga yozilish imkoni yoʻq.
              </li>
              <li>
                Tibbiyot tashkilotlarining rasmiy veb-saytlaridan olingan
                tibbiyot xodimlarining suratlari jamoatchilik manfaatlarini
                ko‘zlab, xususan, fuqarolarga notijorat asosda eng to‘liq,
                ishonchli va dolzarb ma’lumotlarni taqdim etish maqsadida
                joylashtiriladi.
              </li>
              <li>
                Ma`muriyat aniq ishonchsiz yoki qonunga muvofiq bo`lmagan
                ma`lumotlarga ega foydalanuvchi sharhlarini joylashtirish yoki
                o`chirishni oldini olish uchun barcha oqilona choralarni
                ko`radi, lekin foydalanuvchi sharhlarida mavjud bo`lgan
                ma`lumotlarning to`g`riligiga kafolat bermaydi. Ma`muriyat
                sharhlarni hamkorlar, mutaxassislar yoki foydalanuvchilarning
                iltimosiga ko`ra, ularning aniq ishonchsizligi yoki qonunga
                zidligi to`g`risida dalillar taqdim etilgan taqdirdagina
                o`chirib tashlaydi. Ma`muriyat vakolatli davlat organlarining
                talablari bo`yicha qonun hujjatlarida belgilangan tartibda
                taqdim etilgan izohlarni o`chirib tashlaydi. Ma`muriyat istalgan
                vaqtda o`z tashabbusi bilan har qanday izoh va boshqa
                ma`lumotlarni Med24dan olib tashlashga haqli.
              </li>
              <li>
                Mutaxassislar reytingi ma`muriyat tomonidan belgilangan mezonlar
                asosida ma`muriyat tomonidan tuziladi. Ma`muriyat
                foydalanuvchilarni mutaxassislar reytingini hisoblash
                tamoyillari va mezonlari to`g`risida xabardor qilishga majbur
                emas, garchi u to`liq yoki qisman shunday qilish huquqiga ega
                bo`lsa ham.
              </li>
              <li>
                Tibbiy xizmatlar, shifokorlarning ixtisosligi, kasalliklar,
                diagnostika usullari va davolash usullari to`g`risidagi
                ma`lumotlar faqat ma`lumot uchun. Ma`muriyat uning ishonchliligi
                va zamonaviy ilm-fan yutuqlariga muvofiqligini kafolatlamaydi.
                Ma`muriyat sizga to`g`ridan-to`g`ri kerakli mutaxassislikdagi,
                shu jumladan profili xizmatda taqdim etilgan shifokorlardan
                malakali tibbiy yordam so`rashingizni qat`iy tavsiya qiladi.
              </li>
              <li>
                ``Shifokor`` atamasi saytda tibbiyot xodimlariga, shuningdek
                oliy kasbiy ma`lumotga ega bo`lgan boshqa shaxslarga:
                psixologlar, logopedlar, defektologlarga nisbatan qo`llaniladi.
                Oliy kasbiy ta`lim ushbu tibbiy ma`lumotga ega bo`lgan
                shaxslarning ushbu shaxslar tomonidan biron bir tibbiy xizmatlar
                ko`rsatishini anglatmaydi va saytni navigatsiya qilish qulayligi
                uchun mo`ljallanganligidan dalolat bermaydi. Tibbiyot
                xodimlariga nisbatan “Shifokor” atamasidan foydalanish bu
                shaxslarning oliy tibbiy ma’lumotga ega ekanligini anglatmaydi.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.fifthBlock} id="fifthBlock">
            <h2>Litsenziya</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Ma`muriyat Xizmatga mutloq huquqlarga yoki Xizmatning alohida
                komponentlaridan, shu jumladan intellektual faoliyat
                natijalaridan, shu jumladan dastur kodidan, Xizmatda
                joylashtirilgan ma`lumotlar bazalaridan (hamkorlar va
                mutaxassislar to`g`risidagi ma`lumotlar), dizayn ishlaridan,
                matnlardan foydalanish uchun litsenziyalarga ega. shuningdek,
                shaxsiylashtirish vositalari (tovar nomi, tovar belgilari,
                xizmat ko`rsatish belgilari, tijorat belgilari), ma`muriyat
                tomonidan Internetdagi ma`lumotlarni jamoat mulki sifatida e`lon
                qiladigan manbalardan olingan intellektual mulk ob`ektlari
                bundan mustasno. Xizmatdan foydalanish Xizmatga yoki uning
                tarkibiy qismlariga bo`lgan huquqlarni o`tkazishni nazarda
                tutmaydi. Foydalanuvchiga Shartnoma shartlariga muvofiq
                Xizmatdan foydalanish uchun cheklangan huquq beriladi. Bunday
                huquq istalgan vaqtda Shartnoma shartlariga va tomonlar
                o`rtasidagi boshqa kelishuvlarga muvofiq bekor qilinishi mumkin.
              </li>
              <li>
                Foydalanuvchi Ma`muriyatning oldindan yozma roziligisiz Xizmatda
                joylashtirilgan intellektual faoliyat natijalaridan (shu
                jumladan, lekin ular bilan cheklanmagan holda: tasvirlar,
                matnlar, dastur kodi) foydalanmaslik majburiyatini oladi.
              </li>
              <li>
                Xizmatning barcha komponentlari ushbu Shartnoma shartlariga
                ko`ra bepul va ``xuddi shunday`` holatda foydalanish uchun
                taqdim etiladi. Ma`muriyat istalgan vaqtda Xizmatning
                mavjudligiga kafolat bermaydi. Ma`muriyat Qoidalar buzilgan
                taqdirda istalgan Foydalanuvchiga istalgan vaqtda Xizmatdan
                foydalanishni rad etishga haqli.
              </li>
              <li>
                4 Foydalanuvchi Xizmatga biron-bir o`zgartirish kiritishni talab
                qilishga haqli emas. Ma`muriyat Xizmatning tijoriy yaroqliligi
                uchun javobgar emas, Xizmat Foydalanuvchilarning maxsus
                talablariga javob berishiga yoki Xizmatning bo`limlarini
                Foydalanuvchining xohishiga ko`ra sozlash qobiliyatiga kafolat
                bermaydi va Xizmatning dasturiy ta`minoti nuqson va xatolardan
                butunlay xoli ekanligini va uzluksiz va uzluksiz ishlashi
                kerakligini kafolatlaydi.
              </li>
              <li>
                Xizmatdan foydalanish foydalanuvchi tomonidan faqat o`z
                javobgarligi va o`z tavakkalchiligi ostida amalga oshiriladi.
                Ma`muriyat xizmatning to`g`ri ishlashiga kafolat bermaydi va
                Xizmatdan foydalanish natijasida foydalanuvchiga yetkazilgan
                zarar uchun javobgar emas. Ma`muriyat foydalanuvchilar tomonidan
                foydalaniladigan uskunalar, boshqa dasturiy ta`minot yoki aloqa
                kanallari shaxsiy ma`lumotlarni ruxsatsiz (noqonuniy)
                tajovuzlardan himoya qilish bo`yicha belgilangan talablarga mos
                kelmasligi natijasida yuzaga keladigan yoki yuzaga kelishi
                mumkin bo`lgan salbiy oqibatlar xavfi uchun javobgar emas.
              </li>
              <li>
                6 Ma`muriyat Xizmatning ishlashidagi nosozliklar va
                nosozliklarning oldini olish uchun barcha oqilona
                sa`y-harakatlarni amalga oshiradi, lekin uning uzluksiz
                ishlashini kafolatlamaydi, buning uchun javobgar emas va
                uzilishlar haqida foydalanuvchilarni xabardor qilishga majbur
                emas.
              </li>
              <li>
                Foydalanuvchi xizmatdan reklama xabarlarini yuborish va
                xizmatdan foydalanish bilan bevosita bog`liq bo`lmagan boshqa
                harakatlar uchun foydalanishga haqli emas. Foydalanuvchi
                ma`muriyatning oldindan yozma roziligisiz xizmatning dastur
                kodidan, xizmatning har qanday mazmunidan (shu jumladan,
                ma`lumotlar bazalari, matnlar, dizayn elementlari, grafikalar)
                foydalanishga haqli emas (shu jumladan ko`paytirish, nusxalash,
                qayta ishlash, har qanday shaklda tarqatish).
              </li>
              <li>
                Agar Foydalanuvchi xizmatda har qanday ma`lumotni xizmat
                funksiyasi ruxsat bergan darajada joylashtirgan bo`lsa,
                Foydalanuvchi bunday ma`lumotlarning to`g`riligi va uning qonun
                hujjatlariga muvofiqligi, shu jumladan bila turib yolg`on,
                haqoratomuz, ekstremistik va boshqa ma`lumotlar yo`qligi uchun
                javobgardir. Foydalanuvchining belgilangan majburiyatlari
                buzilgan taqdirda, Ma`muriyat materiallarni o`chirishdan
                tashqari, tegishli ma`lumotlarni huquqni muhofaza qilish
                organlariga yuborish huquqini o`zida saqlab qoladi.
              </li>
              <li>
                Xizmatdan foydalanuvchi hamkorlarning xizmatlarini olishda
                Foydalanuvchi to`g`rilik va Mutaxassislarga hurmat ko`rsatishi,
                umume`tirof etilgan axloq va axloq me`yorlarini buzmasliklari
                shart. Foydalanuvchi alkogolli, toksik yoki giyohvandlik
                ta`sirida bo`lganida Xizmatlarga murojaat qilish huquqiga ega
                emas.
              </li>
              <li>
                Ushbu Shartnomada belgilangan Xizmatdan foydalanish qoidalari
                buzilgan taqdirda, Ma`muriyat bir tomonlama va suddan tashqari
                qoidabuzarlikka yo`l qo`ygan Foydalanuvchiga nisbatan ushbu
                Shartnomani bekor qilishga va foydalanuvchining Xizmatdan
                foydalanishini xabardor qilish orqali to`xtatishga haqli.
                Foydalanuvchiga bu haqda Foydalanuvchining Shaxsiy kabinetiga
                tegishli bildirishnoma joylashtirish orqali.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.sixthBlock} id="sixthBlock">
            <h2>Maxfiylik siyosati</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Foydalanuvchi Xizmatdan foydalanishda taqdim etilgan shaxsiy
                ma`lumotlarini, jumladan familiyasi, ismi, otasining ismi,
                tug`ilgan sanasi, telefon raqami, elektron pochta manzili,
                jinsi, yoshi, quyidagi yo`llar bilan ishlov berishga rozi
                bo`ladi: to`plash, yozib olish, tizimlashtirish , to`plash,
                saqlash, aniqlashtirish (yangilash, o`zgartirish), olish,
                foydalanish, shaxsiy ma`lumotlarni taqdim etish (shu jumladan,
                vaziyatga qarab Hamkorlar yoki Mutaxassislarga), uzatish (shu
                jumladan tarqatish, kirish yo`li bilan), shaxsiylashtirish,
                blokirovka qilish, o`chirish va yo`q qilish. Foydalanuvchi
                o`zining shaxsiy ma`lumotlarini to`plash, saqlash va uchinchi
                shaxslarga topshirishga roziligini beradi, ma`muriyat bilan
                tuzilgan shartnomaga muvofiq, foydalanuvchilarning (call-markaz
                xodimlari) arizalari va qo`ng`iroqlarini qayta ishlash
                xizmatlarini taqdim etadi.
              </li>
              <li>
                Foydalanuvchi ushbu ma`lumotni to`plash, saqlash va qayta
                ishlashga, shuningdek uni Xizmatlarni taqdim etish uchun
                foydalanuvchi murojaat qilgan Klinikaga yoki Mutaxassisga taqdim
                etishga ruxsat beradi.
              </li>
              <li>
                Ma`muriyat, Shartnomada yoki qonun hujjatlarida ko`rsatilgan
                hollar bundan mustasno, Foydalanuvchilardan olingan
                ma`lumotlarning maxfiyligini himoya qilish va uchinchi
                shaxslarga oshkor qilmaslik choralarini ko`rish majburiyatini
                oladi.
              </li>
              <li>
                Ma`muriyat ``cookie`` (cookie) texnologiyasidan foydalanishi
                mumkin. Cookie - bu veb-server tomonidan yuborilgan va Xizmatdan
                foydalanuvchi tomonidan foydalaniladigan kompyuterda
                saqlanadigan kichik ma`lumotlar qismi bo`lib, u Ma`muriyatga
                foydalanuvchining shaxsiy sozlamalari va afzalliklarini saqlash,
                shuningdek, u haqida shaxsiy bo`lmagan ma`lumotlarni to`plash
                imkonini beradi.
              </li>
              <li>
                Ma`muriyat ma`lum bir Mutaxassis bilan haqiqatda o`tkazilgan
                uchrashuvlar to`g`risidagi ma`lumotlarni faqat yozib olish uchun
                bo`sh vaqtni aniqlash maqsadida to`playdi, shu bilan birga u
                ma`lum bir foydalanuvchining xizmatlarni taqdim etish bo`yicha
                haqiqiy so`rovi faktlarini aniqlash uchun tahliliy tadqiqotlar
                o`tkazmaydi va amalga oshirmaydi.
              </li>
              <ul style={{ listStyleType: "disc" }}>
                Ma`muriyat olingan shaxsiy ma`lumotlardan quyidagi maqsadlarda
                foydalanishi mumkin:
                <li>Xizmat sifatini ta`minlash;</li>
                <li>
                  Xizmat faoliyatini yaxshilash uchun unga o‘zgartirishlar
                  kiritish;
                </li>
                <li>
                  Foydalanuvchilarga xizmatdan foydalanish, shu jumladan davom
                  etayotgan aksiyalar va maxsus takliflar haqida xabarlar
                  yuborish;
                </li>
                <li>
                  Foydalanuvchiga Xizmatdan foydalanishda yordam ko`rsatish
                </li>
                <li>
                  Foydalanuvchilarga reklama materiallarini yuborish va maxsus
                  takliflar haqida ma`lumot berish, agar foydalanuvchilar bunga
                  rozilik bergan bo`lsa;
                </li>
                <li>
                  Foydalanuvchilarning xizmatdan foydalanish, shu jumladan
                  elektron pochta orqali yoki telefon orqali so`rovlar orqali
                  fikr-mulohazalarini olish.
                </li>
              </ul>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.seventhBlock} id="seventhBlock">
            <h2>Javobgarlikni cheklash</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Ushbu shartnoma bo`yicha foydalanuvchi Ma`muriyat tomonidan hech
                qanday pullik xizmatlar ko`rsatilmaganligi sababli, Ma`muriyat
                va foydalanuvchilar o`rtasidagi munosabatlar iste`molchilarni
                himoya qilish to`g`risidagi qonunchilikka taalluqli emas.
              </li>
              <li>
                Ma`muriyat hech qanday sharoitda mutaxassislar tomonidan
                ko`rsatiladigan xizmatlarning sifati, shu jumladan, profillar
                Med24ga joylashtirilganligi uchun javobgar emas.
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div className={styles.eightthBlock} id="eightthBlock">
            <h2>Yakuniy qoidalar</h2>
            <ul style={{ listStyleType: "disc" }}>
              <li>
                Ushbu bitim foydalanuvchi tomonidan xizmatdan foydalanish
                muddati davomida amal qiladi.
              </li>
              <li>
                Ma`muriyat istalgan vaqtda ushbu shartnomaning shartlarini
                o`zgartirishga, xizmatda yangi tahririyatni nashr etishga haqli.
                Shartnomaning joriy nusxasi xizmatda e`lon qilinadi va e`lon
                qilingan paytdan boshlab foydalanuvchi uchun majburiy bo`ladi.
                Foydalanuvchi o`zgarishlar bilan tanishish maqsadida xizmat
                bo`yicha e`lon qilingan shartnoma matnini muntazam ravishda
                ko`rib chiqish majburiyatini oladi.
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TermsPage;
