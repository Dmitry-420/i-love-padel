# Кортвейв — падел-клуб

Одностраничный лендинг падел-клуба «Кортвейв».

## Стек
- Astro (SSG) + Vue (остров формы) + Tailwind CSS 4 + Iconify (lucide)
- Шрифты: Unbounded (display), Golos Text (body)
- Хостинг: статика (Netlify / Cloudflare Pages / Vercel), output `dist/`

## Секции страницы
Header → Hero (с бегущей строкой) → Services (6 карточек) → Steps (3 шага)
→ Pricing (3 тарифа, цены-заглушки) → Gallery (2 фото) → Faq (5 вопросов)
→ Booking (форма) → Footer

## Источник данных
`src/data/club.ts` — услуги, шаги, тарифы, FAQ, контакты.
Меняешь тут — обновляется вся страница.

## Форма
`BookingForm.vue` — единственный клиентский остров (`client:visible`).
Сейчас POST на `/__forms` (заглушка конструктора).
Перед продом заменить на Formspree / serverless / Telegram-бот.

## Что заменить перед публикацией
- [ ] Домен в `BaseLayout.astro` (`siteUrl`), `robots.txt`, `sitemap.xml`
- [ ] Телефон и email в `club.ts`
- [ ] Цены в `tariffs`
- [ ] Адрес в `Footer.astro`
- [ ] Эндпоинт формы
- [ ] 3 картинки в `public/media/projects/11839/`

## Деплой
- build: `npm run build`
- publish: `dist/`
