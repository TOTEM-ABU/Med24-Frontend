// components/Footer/index.tsx
import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="text-3xl font-bold text-blue-400">
                Med<span className="text-green-400">24</span>
              </div>
              <span className="ml-2 text-gray-400 text-sm">.uz</span>
            </Link>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Toshkentdagi barcha klinikalar va shifokorlar. Tibbiyot markazlari, 
              kasalxonalar va klinikalarning sharhlari.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Telegram className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/klinikalar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Klinikalar
                </Link>
              </li>
              <li>
                <Link href="/shifokorlar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shifokorlar
                </Link>
              </li>
              <li>
                <Link href="/xizmatlar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Tibbiy xizmatlar
                </Link>
              </li>
              <li>
                <Link href="/laboratoryalar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Laboratoriyalar
                </Link>
              </li>
              <li>
                <Link href="/sharhlar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Bemorlar sharhlari
                </Link>
              </li>
              <li>
                <Link href="/yangiliklar" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Tibbiyot yangiliklari
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Xizmatlar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/xizmatlar/diagnostika" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Diagnostika
                </Link>
              </li>
              <li>
                <Link href="/xizmatlar/operatsiya" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Operatsiya
                </Link>
              </li>
              <li>
                <Link href="/xizmatlar/terapiya" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terapiya
                </Link>
              </li>
              <li>
                <Link href="/xizmatlar/ginekologiya" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Ginekologiya
                </Link>
              </li>
              <li>
                <Link href="/xizmatlar/kardiologiya" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Kardiologiya
                </Link>
              </li>
              <li>
                <Link href="/qabul" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Onlayn qabul yozilish
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Aloqa ma'lumotlari</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <a href="tel:+998711234567" className="text-gray-300 hover:text-white transition-colors text-sm">
                    +998 71 123 45 67
                  </a>
                  <br />
                  <a href="tel:+998901234567" className="text-gray-300 hover:text-white transition-colors text-sm">
                    +998 90 123 45 67
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@med24.uz" className="text-gray-300 hover:text-white transition-colors text-sm">
                  info@med24.uz
                </a>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Toshkent shahri, Yunusobod tumani, 
                  Abdulla Qodiriy ko'chasi 1-uy
                </span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  24/7 - Kuniga 24 soat
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-4 lg:mb-0">
              <h3 className="text-lg font-semibold text-white">Yangiliklar uchun obuna bo'ling</h3>
              <p className="text-gray-400 text-sm">Tibbiyot sohasidagi eng so'nggi yangiliklar va maslahatlar.</p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Email manzilingizni kiriting"
                className="flex-1 lg:w-80 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors text-white font-medium">
                Obuna
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <p className="text-gray-400 text-sm">
                © 2023–2025 med24.uz. "SMART MEDIA SOLUTIONS" MASULIYATI CHEKLANGAN JAMIYATI
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Saytda ko'rsatilgan ma'lumot tashxis qo'yish, davolash muolajasi berish uchun 
                foydalanilmaydi va shifokor qabulining o'rnini bosmaydi.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="/maxfiylik" className="text-gray-400 hover:text-white transition-colors text-sm">
                Maxfiylik siyosati
              </Link>
              <Link href="/shartlar" className="text-gray-400 hover:text-white transition-colors text-sm">
                Foydalanish shartlari
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors text-sm">
                Sayt xaritasi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;