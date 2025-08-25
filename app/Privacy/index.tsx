"use client";
import React from "react";
import styles from "./Privacy.module.css";
import Breadcrumb from "@/components/Breadcrumb";
import Input from "@/components/SearchBar";
import Button from "@/components/Button";

const PRIVACY_TEXT = `
1. MAZMUNI VA MAZMUNI

1.1. Med24.uz xizmatidan foydalanuvchi jismoniy shaxslarning shaxsiy ma'lumotlari O'zbekiston qonunchiligida ro'yxatdan o'tgan, 100005, O'zbekiston, Toshkent, Sayram ko'chasi 25 (keyingi o'rinlarda - Kompaniya). Kompaniya med24.uz foydalanuvchilari shaxsiy ma'lumotlar bazasining egasidir.

1.2. Med24.uz foydalanuvchi shaxsiy ma'lumotlar bazasining menejeri - bu "SMART MEDIA SOLUTIONS" MASULIYATI CHEKLANGAN JAMIYATI kompaniyasi bo'lib, u O'zbekiston Respublikasi qonunlari asosida yaratilgan va ishlaydi.

1.3. Med24.uz foydalanuvchilarining shaxsiy ma'lumotlari O'zbekiston Respublikasi hududida joylashgan xavfsiz serverlarda qayta ishlanadi.

1.4. Ushbu Maxfiylik siyosati med24.uz veb-sayti (keyingi o'rinlarda Sayt deb yuritiladi) yordamida to'plangan shaxsiy ma'lumotlarni va foydalanuvchilarga Saytda ro'yxatdan o'tishlari, ularni nashr etishlari yoki real ravishda ko'rishlariga imkon beradigan tegishli xizmatlar va vositalarni qayta ishlash tartibini belgilaydi. e'lon qilingan vaqt e'lonlari, yuqoridagi med24.uz xizmatiga tegishli boshqasidan foydalaning. Ushbu holatlarning barchasida Kompaniya foydalanuvchilarning shaxsiy ma'lumotlarini faqat "Shaxsiy ma'lumotlarni himoya qilish to'g'risida" gi O'zbekiston Respublikasi Qonuni talablari doirasida qayta ishlaydi. Ushbu Maxfiylik siyosati ushbu hujjatlar qoidalariga muvofiq ishlab chiqilgan.

1.5. Sayt va med24.uz-ning boshqa tegishli xizmatlari va vositalaridan foydalanib, foydalanuvchi o'zining shaxsiy ma'lumotlarini, masalan, foydalanuvchi nomi bilan ishlash uchun Kompaniyaga o'z roziligini beradi; yashash joyi, elektron pochta manzili, aloqa telefon raqami, boshqa aloqa ma'lumotlari va foydalanuvchining iltimosiga binoan; ip-manzillar, foydalanuvchilarning boshqa aloqa ma'lumotlari; boshqa foydalanuvchilar tomonidan foydalanuvchiga uzatilgan xabarlar, xatlar, bayonotlar, shuningdek shaxsiy ma'lumotlarini uchinchi shaxslarga berishga, shu jumladan shaxsiy ma'lumotlarini chet elda, har qanday uchinchi davlatga ushbu Maxfiylikka muvofiq uzatishga rozilik beradi. Med24.uz xizmatlarining siyosati va foydalanuvchi kelishuvi bilan.

1.6. Foydalanuvchilar Saytda yoki mobil ilovada joylashtirilgan ba'zi havolalarni bosish paytida ular Kompaniyaning xosting maydonidan tashqarida joylashgan boshqa kompaniyalarning saytlariga (dasturlariga va boshqalarga) yo'naltirilishi mumkinligini bilishlari kerak, bu erda foydalanuvchilar haqida ma'lumotlar tashqarida to'planadi. Kompaniyaning bevosita nazorati. ... Bunday holda, uchinchi tomonlarning veb-saytlari va / yoki ilovalari uchun Maxfiylik siyosati ushbu uchinchi shaxslar tomonidan foydalanuvchilardan olingan ma'lumotlarning ishlashini tartibga soladi.

2. KOMPANIYa tomonidan yig'ilgan, olingan va joylashtirilgan ma'lumot
2.1. Hisob qaydnomasi haqida ma'lumot: Foydalanuvchi saytda hisob qaydnomasini yaratganda, Kompaniya ma'lum elektron pochta manzili va parol kabi ma'lumotlarni talab qilishi mumkin. Hisob qaydnomasida ular haqida geografik joylashuvi, familiyasi, familiyasi, telefon raqami va tegishli ma'lumotlar, shu jumladan o'zlarining akkauntlariga yuklashlari mumkin bo'lgan fotosuratlar mavjud. (Hisob qaydnomasi foydalanuvchilarga o'zlarining takliflariga qiziqish bildirish uchun bir-birlari bilan bog'lanishlariga imkon beradi). Foydalanuvchilar ommaviy akkauntlarga joylashtirgan barcha ma'lumotlari uchun javobgardir. Foydalanuvchi ma'lum ma'lumotlarni, xususan, manzilni yoki uning aniq joylashgan joyi haqidagi ma'lumotni hammaga ma'lum qilish bilan bog'liq barcha xavflarni diqqat bilan ko'rib chiqishi kerak. Agar foydalanuvchi saytga uchinchi tomon operatorining autentifikatsiya qilish xizmati, masalan, Facebook ma'lumotlari yordamida kirishga qaror qilsa, Kompaniya qo'shimcha profil yoki boshqa uchinchi shaxs tomonidan kirish huquqi berilgan ma'lumotlarni olishi mumkin.

2.2. E'lonlar va bitimlar: Kompaniya o'z veb-sayti faoliyatining bir qismi sifatida xaridor va sotuvchi o'rtasidagi operatsiyalarni bajarish, xabarlar yuborish va foydalanuvchilar bilan o'zaro muloqot qilish, to'lovlarni amalga oshirish uchun zarur bo'lgan ma'lumotlarni, shu jumladan shaxsiy va aloqa ma'lumotlari joylashtirishi mumkin. . Reklama joylashtirish uchun zarur bo'lgan barcha ma'lumotlar hisob yaratishda talab qilinadi. Foydalanuvchilar saytda joylashtirilgan barcha ma'lumotlari uchun javobgardirlar. Foydalanuvchi ma'lum ma'lumotlarni - xususan, manzilni yoki boshqa shaxsiy ma'lumotlarni - hammaga ma'lum qilish bilan bog'liq barcha xavflarni diqqat bilan ko'rib chiqishi kerak.

2.3. O'yinlar, reklama va reklama: Kompaniya o'z veb-sayt faoliyatining bir qismi sifatida foydalanuvchilar Saytda yoki Kompaniya tomonidan uchinchi tomon saytlarida tashkil qilingan o'yinlarda, viktorinalarda va boshqa marketing aktsiyalarida qatnashganda ism va aloqa ma'lumotlari kabi shaxsiy ma'lumotlarni to'plashi mumkin. Kompaniya o'z sayti faoliyatining bir qismi sifatida reklama kampaniyalarining samaradorligi bilan bog'liq ma'lumotlarni, shu jumladan Saytda va uchinchi tomon saytlarida ko'rilgan reklamalarni qayta ishlashi mumkin.

2.4. Mijozlarga xizmat ko'rsatish: Foydalanuvchilar mijozlarga xizmat ko'rsatish bo'limiga murojaat qilishganda, Kompaniya o'z veb-saytining bir qismi sifatida, foydalanuvchining so'rovini bajarish uchun zarur bo'lgan shaxsiy ma'lumotlarni to'plashi va agar kerak bo'lsa, fikr-mulohazalarini qabul qilishi mumkin. Kompaniya, shuningdek, ushbu maqsad uchun taqdim etilgan mavjud bo'lgan aloqa ma'lumotlari yordamida foydalanuvchiga murojaat qilishi mumkin. Kompaniya, shuningdek, foydalanuvchilar bilan aloqa qilish to'g'risidagi boshqa ma'lumotlarni, masalan, foydalanuvchilar tomonidan yuborilgan har qanday qo'llab-quvvatlash so'rovlarini yoki ular tomonidan bildirilgan fikr-mulohazalarni, xususan, foydalanuvchilar tomonidan qoldirilgan sharhlar shaklida to'plashi mumkin. Biz sharhlarni foydalanuvchi - sharh muallifi va unga nisbatan sharh qoldirilgan foydalanuvchiga tegishli ma'lumotlar sifatida ko'rib chiqishimiz mumkin.

2.5. Veb-sayt: Kompaniya o'z serverlarida foydalanuvchi brauzeridan yoki har qanday qurilmadan ma'lumotlarni, shu jumladan IP-manzilni, dasturiy ta'minot va apparat atributlarini, foydalanuvchi so'ragan sahifalarni, dasturdan foydalanish to'g'risidagi ma'lumotlarni va / yoki haqidagi ma'lumotlarni avtomatik ravishda qabul qilishi va ro'yxatdan o'tkazishi mumkin. boshqa ishlatilgan qurilmalar va / yoki tizim darajasidagi ma'lumotlar. Bu Saytda yoki uchinchi shaxslarning xizmatlarida sodir bo'lishi mumkin. Foydalanuvchilar ushbu ma'lumotlar to'plamini qanday boshqarishi va / yoki to'sib qo'yishi mumkinligi haqida qo'shimcha ma'lumot olish uchun ushbu siyosatning 6-bo'limiga qarang.

2.6. So'rovlar natijasida olingan ma'lumotlar: Kompaniya so'rovlar natijasida olingan ma'lumotni, yoki kompaniya tomonidan jalb qilingan uchinchi tomon pudratchilar tomonidan, ya'ni jinsi, yoshi, oilaviy holati, shaxsiy imtiyozlari to'g'risidagi ma'lumotlarni to'plashi va saqlashi mumkin. , va boshqalar.

2.7. Qo'shimcha ma'lumotlar: Shuningdek, kompaniya o'z sheriklari yoki uchinchi shaxslardan qonuniy ravishda olingan ma'lumotlarni kompaniyaning o'z foydalanuvchilari to'g'risidagi mavjud ma'lumotlariga qo'shishi mumkin.

2.8. Ko'p foydalanuvchilarning Internet-platformalaridagi (ijtimoiy tarmoqlar) foydalanuvchi profillaridan olingan ma'lumotlar: Saytda ro'yxatdan o'tish yoki ijtimoiy tarmoqlarning autentifikatsiya xizmatlaridan foydalangan holda saytga kirish orqali foydalanuvchi kompaniyaga ma'lumot to'plash va qayta ishlashga rozilik beradi. ijtimoiy tarmoqlardagi tegishli profillardan, shuningdek Saytdagi va / yoki mobil ilovadagi Foydalanuvchining harakatlari to'g'risidagi ma'lumotlarni tegishli ijtimoiy tarmoqlarda nashr etishdan mavjud.

2.9. Biz boshqa foydalanuvchilar bilan o'zaro aloqalaringizdan so'ng bergan reytinglaringiz va sharhlaringiz, shuningdek boshqa foydalanuvchilardan olgan reytinglaringiz va sharhlaringiz to'g'risidagi ma'lumotlarni Xizmat ko'rsatish shartlariga muvofiq to'playmiz. Biz buni tranzaktsiyalar tajribasiga nisbatan foydalanuvchilarning qoniqishlarini o'lchash, foydalanuvchilar o'rtasidagi aloqaning maqbul va samarali darajasini ta'minlash, shuningdek, bizning xizmatlarimiz bo'yicha olib borilayotgan faoliyat doirasida istalmagan faoliyat va xatti-harakatlarni tekshirish va oldini olish maqsadida qilamiz. Ushbu ma'lumotlar xizmatlarni taqdim etishda yuqori standartlarni saqlab qolish uchun zarur va tegishli choralarni ko'rishimizga imkon beradi.

Kompaniya yig'maydigan yoki qayta ishlamaydigan ma'lumotlar:

Kompaniya irqiy yoki etnik kelib chiqishi, siyosiy, diniy yoki mafkuraviy e'tiqodlari, siyosiy partiyalar va kasaba uyushmalariga a'zoligi va shunga o'xshash ma'lumotlar to'g'risida shaxsiy ma'lumotlarni yig'maydi yoki qayta ishlamaydi.

3. IP-ADRES, PAZINCHILAR VA MOBIL TANITICILAR
3.1. Kompaniya o'z veb-sayti faoliyati doirasida Cookies (cookie-fayllar), piksellar (piksellar) va mahalliy xotira (brauzeringizda yoki mobil qurilmangizdagi kabi) texnologiyalaridan foydalangan holda ma'lum ma'lumotlarni to'plashi mumkin.

3.2. KUKIYALAR - bu to'g'ridan-to'g'ri foydalanuvchi kompyuterida, mobil telefonida yoki boshqa qurilmada ma'lumotlarni saqlaydigan kichik matnli fayllar.

3.3. Piksellar - bu boshqa serverga veb-sahifaning ko'rinishini o'lchashga imkon beradigan veb-sahifalardagi kodlarning bir qismi bo'lgan va ko'pincha cookie-fayllar bilan birgalikda ishlatiladigan kichik raqamli tasvirlar. Kod foydalanuvchining Saytdagi sahifa yoki sahifaning bir qismi bilan o'zaro aloqada ekanligini ko'rsatadigan piksel yuklanganligini va qachon (va qaysi sahifada) yuklanishini kuzatib boradi.

3.4. Cookie-fayllar yordamida veb-server, masalan, foydalanuvchi kompyuteridagi, uning mobil telefonidagi yoki boshqa qurilmalaridagi sozlamalar va sozlamalarni saqlashi mumkin, bu esa keyingi tashrifda avtomatik ravishda tiklanadi. Yoki boshqacha qilib aytganda, cookie-fayllar, boshqa narsalar qatori, Saytdan foydalanishni yanada qulayroq qilish uchun xizmat qiladi, masalan, foydalanuvchi keyingi tashrifida kirish jarayonini takrorlashi shart emas. Kompaniya doimiy va sessiyali cookie-fayllardan foydalanadi. Doimiy cookie fayllari Foydalanuvchi kompyuterida uzoqroq vaqt saqlanib qoladi va brauzer oynasi yopilganda sessiya cookieslari avtomatik ravishda o'chiriladi.

3.5. Kompaniya reklama va / yoki analitik xizmat ko'rsatuvchi provayderlar kabi uchinchi shaxslarga ushbu turdagi texnologiyalardan foydalangan holda to'g'ridan-to'g'ri veb-saytning veb-sahifasida yoki mobil ilovasida ma'lumot to'plashiga ruxsat berishi mumkin. Ular to'plagan ma'lumotlar ushbu uchinchi tomonlarning amaldagi maxfiylik siyosatiga muvofiq himoyalangan.

4. Shaxsiy ma'lumotlardan foydalanish
4.1. O'z xizmatlarini ko'rsatish uchun Kompaniya yig'adigan va joylashtiradigan ma'lumotlardan quyidagi maqsadlarda foydalanishi mumkin:

4.1.1. mijozlarga xizmat ko'rsatish, shu jumladan foydalanuvchi hisoblarini yaratish va boshqarish, texnik qiyinchiliklarni hal qilish va turli funktsiyalarga kirish uchun;

4.1.2. takliflar va tajribalarni, shu jumladan o'zlarining xizmatlari yoki uchinchi shaxslarning xizmatlarida reklama qilishni moslashtirish;

4.1.3. kalit so'zlar bo'yicha qidirish, e'lonlarni nashr etish va tranzaktsiyalarni tuzish bo'yicha faollik, shuningdek Saytdagi trafikni boshqarish kabi foydalanuvchilarning umumiy va individual faoliyatini nazorat qilish;

4.1.4. har qanday mavjud aloqa kanallari orqali bizning foydalanuvchilarimiz bilan aloqa, shu jumladan xizmat ko'rsatish, mijozlarga xizmat ko'rsatish yoki vakolatli marketing aloqalari uchun;

4.1.5. xizmatimizni takomillashtirish maqsadida tadqiqot va tahliliy tadbirlarni o'tkazish; va

4.1.6. Med24.uz xizmatlari uchun, shu jumladan firibgarlik va haqoratlarga qarshi kurash bo'yicha foydalanuvchi shartnomasining bajarilishini ta'minlash;

4.1.7. shaxsiy ma'lumotlarning ayrim omillarini baholash, xususan, shaxsiy imtiyozlar, qiziqishlar, xatti-harakatlar yoki joylashishni tahlil qilish va bashorat qilish.

4.2. Kompaniya sizning shaxsiy ma'lumotlaringizni to'plangan maqsadlarga erishish uchun, shu jumladan har qanday qonuniy, buxgalteriya hisoboti yoki hisobot talablariga rioya qilish uchun zarur bo'lgan vaqtgacha saqlab qoladi.

Tegishli saqlash muddatini aniqlash uchun Kompaniya shaxsiy ma'lumotlarning hajmi, xususiyati va sezgirligi, shaxsiy ma'lumotlaringizni ruxsatsiz foydalanish yoki oshkor qilish natijasida yuzaga kelishi mumkin bo'lgan zarar xavfini, Kompaniya sizning shaxsiy ma'lumotlaringizni qanday maqsadlarda qayta ishlashini va Kompaniya ushbu maqsadlarga boshqa vositalar va tegishli qonuniy talablardan foydalangan holda erishishi mumkin.

Agar sizning hisob qaydnomangiz 24 oydan ko'proq vaqt davomida ishlamayotgan bo'lsa, biz sizning hisobingizni, shu jumladan unda saqlangan barcha shaxsiy ma'lumotlarni o'chirib tashlash huquqiga egamiz, demak, siz endi unga kirish va undan foydalanish imkoniyatiga ega bo'lmaysiz.

Ma'lumotlarni saqlash muddati bilan bog'liq savollaringiz bo'lsa, iltimos, moderator@med24.uz elektron manziliga yozib biz bilan bog'laning.

5. MA'LUMOTLARNI ALMASHISH
5.1. Kompaniya to'plagan ma'lumotlarini istalgan uchinchi mamlakatda joylashgan filiallar bilan bo'lishishi mumkin. Ushbu kompaniyalar olingan shaxsiy ma'lumotlarni faqat ushbu Maxfiylik siyosatining 4-bandida ko'rsatilgan maqsadlar uchun qayta ishlashi va ishlatishi mumkin. Biroq, uzatilgan ma'lumotlar ushbu Maxfiylik siyosatining mavzusi bo'lib qolmoqda.

5.2. Kompaniya foydalanuvchilarning shaxsiy ma'lumotlarini tegishli bo'lmagan shaxslarga taqdim etmaydi, faqat Foydalanuvchilar tomonidan tegishli ruxsat mavjud bo'lgan holatlar bundan mustasno yoki quyidagi holatlarda:

5.3. Kompaniya o'z xizmatlarining ayrim tarkibiy qismlarini taqdim etish uchun tashqi xizmat ko'rsatuvchi provayderlardan foydalanishi mumkin, bunday hollarda etkazib beruvchilar Kompaniyaning veb-sayti orqali olingan shaxsiy ma'lumotlardan foydalanish huquqiga ega emaslar, Kompaniya xizmatlarini taqdim etishdan tashqari va shaxsiy ma'lumotlarning o'zi ushbu Maxfiylik siyosatining mavzusidir.

5.4. Kompaniya qonun talablariga muvofiq jismoniy shaxslar va davlat idoralari bilan quyidagi maqsadlarda ma'lumot almashish huquqini o'zida saqlab qoladi:

Saytdagi firibgarlik va suiiste'molga qarshi kurash;

da'vo qilingan qonun buzilishlarini tekshirish yoki foydalanuvchilar tomonidan med24.uz xizmatlaridan foydalanish to'g'risidagi Shartnoma buzilishining boshqa har qanday buzilishlariga qarshi kurashish. 5.5. Kompaniya qonun hujjatlariga muvofiq rasmiylashtirilgan vakolatli organlarning talabiga binoan foydalanuvchilarning shaxsiy ma'lumotlarini taqdim etishi mumkin.

5.6. Maxfiylik siyosatiga muvofiq, Kompaniya Foydalanuvchining shaxsiy ma'lumotlarini ijaraga bermaslik yoki sotmaslik majburiyatini oladi. Agar Kompaniyaning biznesi yoki ushbu biznesning bir qismi sotilsa yoki qayta tashkil etilsa va Kompaniya o'z aktivlarining hammasini yoki deyarli barchasini yangi egasiga topshirsa, u holda foydalanuvchilarning shaxsiy ma'lumotlari xaridorga berilishi mumkin. Saytning uzluksizligi.

5.7. Kompaniya foydalanuvchilarni qaysi reklama yoki xizmatlarga qiziqishi mumkinligini yaxshiroq tushunish, umumiy sifatini yaxshilash uchun ma'lum bir noma'lum ma'lumotlarni (foydalanuvchilarni individual ravishda aniqlashga imkon bermaydigan ma'lumotlar) uchinchi tomon xizmat ko'rsatuvchi provayderlarga, ishonchli sheriklarga yoki vakolatli tadqiqotchilarga uzatishi mumkin. Saytdagi yoki xizmatdagi xizmatlarning samaradorligi yoki kompaniyaning fikriga ko'ra katta ijtimoiy foyda keltirishi mumkin bo'lgan ilmiy tadqiqotlarga qo'shgan hissasini ta'minlash.

5.8. Kompaniya tadqiqotlarni o'tkazish yoki foydalanuvchilarga xizmatlar ko'rsatish uchun yig'adigan ma'lumotlarini kompaniyaga xizmat ko'rsatuvchi uchinchi shaxslarga o'tkazishi mumkin, shu bilan birga uzatilayotgan ma'lumotlar ushbu Maxfiylik siyosatining predmeti hisoblanadi va üçüncü shaxslar huquqiga ega emaslar. olingan ma'lumotlardan foydalanish, aks holda Kompaniyaga xizmat ko'rsatish uchun.

5.9. Shaxsiy ma'lumotlar ushbu Maxfiylik siyosatining 5-qismida nazarda tutilgan hollarda, foydalanuvchiga uning shaxsiy ma'lumotlarining o'tkazilishi to'g'risida ma'lumot berish Kompaniyaning ixtiyorida qoladi.

6. FOYDALANIShNI NAZORAT
6.1. Kirish, tuzatish va o'chirish: Hisob qaydnomasini yaratgan yoki e'lonlarni saytda joylashtirgan foydalanuvchilar o'zlari taqdim etgan ma'lumotlarga kirishlari, ularni to'g'rilashlari yoki yo'q qilishlari mumkin. Foydalanuvchi taqdim etilgan ma'lumotlar yoki Saytdagi xabarlarning to'g'riligi uchun javobgardir. Joylashtirilgan ma'lumotlar veb-saytning veb-sahifasidagi foydalanuvchining shaxsiy "Mening profilim" shaxsiy kabinetida o'zgartirilishi yoki o'chirilishi mumkin. Shaxsiy ma'lumotlarni qayta ishlashga rozilikni qaytarib olish to'g'risida foydalanuvchidan yozma bildirishnoma olgan taqdirda, Kompaniya Foydalanuvchining shaxsiy ma'lumotlarini qayta ishlashni to'xtatishi mumkin.

6.2. Tashqi tomonlarni tanlash: Saytda ishlaydigan ba'zi bir tashqi tashkilotlar, masalan Google Adwords, foydalanuvchilarga o'zlarining ma'lumotlarini reklama faoliyati uchun foydalanuvchi faoliyati asosida yig'ish va ishlatishga bo'lgan roziligini bekor qilishga imkon beradi.

6.3. Cookie-fayllar: Ko'pgina kompyuter (ish stoli) va mobil veb-brauzerlar (masalan, Safari, Firefox, Internet Explorer, Chrome, Opera) foydalanuvchiga sizning tizimingizda Cookies-ni o'rnatishni cheklash yoki to'sib qo'yishga imkon beradigan boshqaruv elementlarini taqdim etadi. Shuni esda tutingki, birinchi toifadagi domenlar (tashrif buyurilgan saytlar) va boshqa domenlar (tashrif buyurilgan saytlar bilan bog'liq) uchun Cookies-fayllarni o'chirib qo'yish, ba'zi hollarda ushbu veb-saytlarning cheklangan ishlashiga olib kelishi mumkin.

6.4. Kompaniya tomonidan shaxsiy ma'lumotlarini qayta ishlashga bog'liq bo'lgan foydalanuvchilarning boshqa huquqlari:

6.4.1. Med24.uz foydalanuvchilarining shaxsiy ma'lumotlarini o'z ichiga olgan shaxsiy ma'lumotlar bazasining joylashuvi, uning maqsadi va nomi, shaxsiy ma'lumotlar egasi va menejerlari joylashgan joy haqida bilish yoki Saytning vakolatli foydalanuvchilariga ushbu ma'lumotlarni olish uchun tegishli buyruq berish; qonunda boshqacha tartib nazarda tutilgan hollar bundan mustasno;

6.4.2. shaxsiy ma'lumotlarga kirishni ta'minlash shartlari, shu jumladan Sayt foydalanuvchilari shaxsiy ma'lumotlari beriladigan uchinchi shaxslar to'g'risidagi ma'lumotlarni olish;

6.4.3. shaxsiy ma'lumotlaringizga kirish uchun;

6.4.4. so'rov kelib tushgan kundan boshlab o'ttiz kalendar kundan kechiktirmay, qonunda boshqacha tartib nazarda tutilgan hollar bundan mustasno, uning shaxsiy ma'lumotlari qayta ishlanayotganligi to'g'risida javob olish, shuningdek ushbu shaxsiy ma'lumotlarning tarkibini olish;

6.4.5. shaxsiy ma'lumotlarning egasiga shaxsiy ma'lumotlarni qayta ishlashga e'tiroz bildirgan holda asosli talabni taqdim etish;

6.4.6. shaxsiy ma'lumotlar egasi va / yoki menejeri tomonidan shaxsiy ma'lumotlarni o'zgartirish yoki yo'q qilish to'g'risida asosli so'rov yuborish, agar bu ma'lumotlar noqonuniy ravishda qayta ishlangan yoki ishonchga ega bo'lmasa;

6.4.7. shaxsiy ma'lumotlarni qasddan yashirish, ularni taqdim qilmaslik yoki o'z vaqtida taqdim etmaslik oqibatida noqonuniy ishlov berish va tasodifiy yo'qotish, yo'q qilish, buzilishlardan himoya qilish, shuningdek noto'g'ri, sha'ni, qadr-qimmati va ishbilarmonlik obro'siga putur etkazadigan ma'lumotlar berishdan himoya qilish;

6.4.8. shaxsiy ma'lumotlarning qayta ishlanishi to'g'risida vakolatlari shaxsiy ma'lumotlar himoyasini ta'minlashni o'z ichiga olgan davlat organlari va mansabdor shaxslarga yoki sudga shikoyat yuborish;

6.4.9. shaxsiy ma'lumotlarni himoya qilish to'g'risidagi qonun hujjatlari buzilgan taqdirda himoya vositalarini qo'llash;

6.4.10. shaxsiy ma'lumotlarni qayta ishlashga rozilikni qaytarib olish;

6.4.11. shaxsiy ma'lumotlarni avtomatik ravishda qayta ishlash mexanizmini bilish;

6.4.12. Sayt foydalanuvchilari uchun huquqiy oqibatlarga olib keladigan avtomatlashtirilgan echimdan himoya qilish.

7. XAVFSIZLIK
7.1. Ma'lumotlarga ruxsatsiz kirish yoki foydalanishni oldini olish uchun biz to'playdigan barcha ma'lumotlar texnik vositalar va xavfsizlik tartib-qoidalari bilan oqilona himoyalangan. Kompaniyaning filiallari, ishonchli sheriklari va üçüncü tomon xizmat ko'rsatuvchi provayderlari kompaniyadan olingan ma'lumotlardan bizning xavfsizlik talablarimiz va ushbu Maxfiylik siyosatimizga muvofiq foydalanishni o'z zimmalariga oladilar.

9. BU SIYOSATNI O'ZGARTIRISh
9.1. Ushbu maxfiylik siyosati oxirgi marta 05/12/2021 yilda yangilangan. Kompaniya ushbu maxfiylik siyosatini vaqti-vaqti bilan yangilab turishi mumkin, agar Maxfiylik siyosatining yangi tahririda boshqacha tartib nazarda tutilmagan bo'lsa, ushbu bandda ko'rsatilgan manzilda Internetda joylashtirilgan paytdan boshlab Maxfiylik siyosatining yangi tahriri kuchga kiradi. . Maxfiylik siyosatining amaldagi versiyasi har doim https://med24.uz/privacy sahifasida mavjud.

9.2. Agar Kompaniya Maxfiylik siyosatiga foydalanuvchi rozi bo'lmagan biron bir o'zgartirish kiritgan bo'lsa, u Sayt xizmatlaridan foydalanishni to'xtatishi shart. Saytdan foydalanishni davom ettirish haqiqati - bu Maxfiylik siyosatining tegishli nashrida foydalanuvchi tomonidan rozilik va qabul qilinganligini tasdiqlash.
`;

const Privacy: React.FC = () => {
  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: "Asosiy sahifa", href: "/" },
          { label: "Политика конфиденциальности" },
        ]}
      />
      
      <div className={styles.container}>
        <div className={styles["search-section"]}>
          <h1 className={styles["main-title"]}>
            Maxfiylik siyosati
          </h1>
          
          <div className={styles["input-container"]}>
            <Input
              label="Qidiruv so'zi yoki savolni kiriting"
              width="100%"
            />
            <Button
              name="Qidirish"
              variant="primary"
              padding="0 38px 0 38px"
            />
          </div>
        </div>
        
        <div className={styles.content}>{PRIVACY_TEXT}</div>
      </div>
    </div>
  );
};

export default Privacy;
