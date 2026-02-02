# 🤖 Aibek OSS - Aqlli AI Yordamchi

**Aibek** — bu yuqori unumdorlikka ega, Telegram-inspired interfeysli sun'iy intellekt yordamchisi. Google'ning eng so'nggi **Gemini 3 Pro** modeli asosida qurilgan bo'lib, u foydalanuvchilarning murakkab savollariga javob berish, dasturlash masalalarini yechish va kundalik vazifalarni yengillashtirish uchun mo'ljallangan.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Gemini](https://img.shields.io/badge/Gemini-3_Pro-orange?logo=google)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

## ✨ Asosiy Imkoniyatlar

- **Telegram Interfeysi:** Foydalanuvchilar uchun tanish va qulay chat dizayni.
- **Real-time Streaming:** Javoblar xuddi inson yozayotgandek real vaqt rejimida oqib keladi.
- **Dev Panel (Dasturchilar paneli):** AI personajini (System Instruction), model turini va "ijodkorlik" darajasini real vaqtda o'zgartirish imkoniyati.
- **O'zbek Tili Markazda:** Aibek o'zbek tilidagi kontekstni juda yaxshi tushunadi va mahalliy darsliklar hamda qoidalarga tayangan holda javob beradi.
- **Responsive Dizayn:** Mobil va desktop qurilmalar uchun to'liq moslashtirilgan.

## 🛠 Texnologiyalar

- **Frontend:** React 19, Tailwind CSS.
- **AI Engine:** Google Gemini SDK (@google/genai).
- **Icons:** Font Awesome 6.
- **State Management:** React Hooks (useState, useEffect, useCallback).

## 🚀 O'rnatish va Ishga tushirish

Loyiha `esm.sh` va standart React muhitida ishlashga moslashtirilgan. Uni o'z qurilmangizda ishga tushirish uchun:

1. Repozitoriyani klon qiling:
   ```bash
   git clone https://github.com/doppiops/aibek-digital-assistant.git
   ```
2. Kerakli kutubxonani o'rnating:
   ```bash
   npm install
   ```
3. .env fayliga o'zingizning Google Ai API kalitingizni qo'ying:
   ```bash
   API_KEY=sizning_gemini_api_kalitingiz
   ```
4. Loyihani ishga tushiring:
   ```bash
   npm start
   ```

## 🚀 Moslashtirish
   Aibekni o'z loyihangizga moslash uchun constants.tsx faylidagi DEFAULT_SYSTEM_INSTRUCTION qismini o'zgartiring. Masalan:
Uni "Matematika o'qituvchisi" qilib sozlashingiz mumkin.
Yoki "Mijozlarni qo'llab-quvvatlash agenti" sifatida ishlatishingiz mumkin.

## 🛡 Litsenziya
Ushbu loyiha MIT litsenziyasi ostida ochiq manba hisoblanadi. Uni xohlagancha o'zgartirishingiz va o'z tijoriy loyihalaringizda ishlatishingiz mumkin.