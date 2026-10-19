# JOLTIME — сайт автошколы (Астана)

React 19 · Vite · TypeScript · Tailwind CSS v4 · motion (анимации) · lucide-react (иконки).
Mobile-first, светлая и тёмная тема, два языка (рус / қаз), SEO-разметка.

## Запуск

```bash
npm install
npm run dev       # http://localhost:5173  (казахская версия — /kk/)
npm run build     # прод-сборка в dist/
npm run preview   # посмотреть прод-сборку
npm run lint      # проверка кода
```

## Структура

```
src/
  config/site.ts          — контакты, ссылки, координаты филиала (не переводится)
  config/reviews.ts       — реальные отзывы (не переводятся, показываются в оригинале) + пути к скриншотам
  i18n/
    ru.ts                 — все тексты на русском (эталон структуры)
    kk.ts                 — все тексты на казахском (TypeScript следит, чтобы ключи совпадали)
    index.ts              — список языков, язык ↔ URL, format()
    context.ts            — React-контекст
    LocaleContext.tsx     — провайдер (читает язык из URL, меняет <html lang>)
    useLocale.ts          — хук: { locale, t, setLocale }
  hooks/                  — useTheme, useScrolled, useLockBodyScroll, useNavItems
  seo/useSeo.ts           — title, description, OG, canonical, JSON-LD при смене языка
  lib/motion.ts           — общие константы анимаций
  components/
    ui/                   — переиспользуемые: Button, Logo, Reveal, SectionTitle, RichText, ThemeToggle, LangSwitch, Lightbox
    layout/               — Header, Footer, WhatsAppFab
    sections/             — секции страницы в порядке появления
  App.tsx                 — порядок секций
public/
  reviews/                — скриншоты отзывов (2gis-*.jpg, whatsapp-*.jpg), ужаты до 900px
  robots.txt, sitemap.xml, og.png, favicon.svg, apple-touch-icon.png, site.webmanifest
  _redirects              — SPA-фоллбэк для Netlify (чтобы /kk/ открывался)
vercel.json               — то же для Vercel
```

## Как менять

| Что | Где |
|---|---|
| Любой текст | `src/i18n/ru.ts` и `src/i18n/kk.ts` (одинаковые ключи) |
| Жирное выделение в тексте | обернуть `**двойными звёздочками**` прямо в строке словаря |
| Телефон, Instagram, домен, ссылки и рейтинг 2GIS | `src/config/site.ts` (`GIS_URL`, `GIS_RATING` — обновлять вручную) |
| Адрес филиала | тексты — в словарях (`branches.items`), координаты — `BRANCH_GEO` в `config/site.ts` |
| Тарифы и пакеты | `pricing.groups` в словарях: `courses` (обучение), `driving` (вождение), `retake` (пересдача). Цена — поле `price`, приписка «/ урок» — `priceNote` |
| Спецпредложения | `pricing.offers.items`: `group` + `index` указывают, к какому пакету прыгать |
| Отзывы | `src/config/reviews.ts`; скриншот (`image`) в `public/reviews/` необязателен — без него карточка ведёт на 2GIS |
| Цвета темы | `src/index.css`, блоки `:root` и `:root[data-theme="dark"]` |
| Шрифты | `index.html` (Google Fonts) + `@theme` в `src/index.css`. Montserrat + Onest выбраны потому, что полностью содержат казахские буквы (Ә Ғ Қ Ң Ө Ұ Ү Һ І); Manrope и Unbounded — нет |
| Логотип | `src/components/ui/Logo.tsx` (SVG-вордмарк), `public/favicon.svg`, `public/apple-touch-icon.png` |
| Порядок секций | `src/App.tsx` |
| Домен для SEO | `SITE_URL` в `config/site.ts`, плюс `index.html`, `public/sitemap.xml`, `public/robots.txt` |

## Языки

Язык определяется по URL: `/` — русский, `/kk/` — казахский. Переключатель в шапке меняет URL
без перезагрузки. Для хостинга нужен SPA-фоллбэк (уже есть для Netlify и Vercel; для nginx —
`try_files $uri /index.html;`).

Добавить третий язык: создать `src/i18n/en.ts` по образцу `kk.ts`, добавить его в `LOCALES`,
`DICTIONARIES` и `LOCALE_LABELS` в `src/i18n/index.ts`, добавить `hreflang` в `index.html` и `sitemap.xml`.

## Тема

Тема хранится в `localStorage` (`joltime-theme`) и в атрибуте `<html data-theme>`. Инлайн-скрипт
в `index.html` выставляет её до первой отрисовки, чтобы не было вспышки. По умолчанию — системная.
Цвета компонентов берутся из токенов (`bg-paper`, `bg-surface`, `text-ink`, `ring-line`), поэтому
для новой секции достаточно использовать их, и тёмная тема заработает сама.

## Анимации

Все анимации — на `transform`/`opacity`, уважают `prefers-reduced-motion`. Где что живёт:

| Эффект | Где |
|---|---|
| Логотип: дорога «рисуется» при загрузке, при наведении значок наклоняется и разметка бежит | `components/ui/Logo.tsx` + keyframes `logo-dash` |
| Полоска прогресса чтения сверху | `components/layout/ScrollProgress.tsx` |
| Появление блоков при скролле | `components/ui/Reveal.tsx` |
| Заголовки секций по словам | `components/ui/SectionTitle.tsx` |
| «Маркер» под жирными словами | `components/ui/RichText.tsx` (`highlight`) |
| **Интерактивная дорога** (фишка сайта): машинка едет сама, ускоряется при скролле, с мышью — «би-бип» + рывок по клику, «газ» при зажатии, езда за курсором; на тач-устройствах дорога только декоративная (едет и ускоряется от скролла) | `components/sections/RoadStrip.tsx` — всё в одном `requestAnimationFrame` через motion values, без ререндеров. Тексты знаков — `marquee` в словарях, подсказки — `road` |
| 3D-наклон карточки в hero за курсором | `components/ui/TiltCard.tsx` (только мышь/десктоп, см. `hooks/useHasMouse.ts`) |
| Параллакс пятен фона в hero (только десктоп) | `HeroBackground` в `components/sections/Hero.tsx` |
| Машинка на дороге в hero | `RoadCar` в `components/sections/Hero.tsx` |
| Подсветка карточек за курсором («фонарик») | утилита `spotlight` в `src/index.css` + хук `hooks/useSpotlight.ts` (WhyUs, тарифы, спецпредложения) |
| Бегущая светящаяся рамка у популярного тарифа | утилита `border-glow` + `@property --border-angle` в `src/index.css` |
| Блик на оранжевых кнопках | утилита `btn-shine` в `src/index.css` |
| Подъём карточек отзывов при наведении | `components/sections/Reviews.tsx` |
| Линия между шагами обучения | `components/sections/HowItWorks.tsx` |

## Деплой

Пуш в `main` запускает `.github/workflows/deploy.yml`: сборка и публикация на GitHub Pages
(https://saparaly.github.io/joltime/). Базовый путь `/joltime/` передаётся через `BASE_PATH`,
домен для canonical — через `VITE_SITE_URL`. При переезде на свой домен поменяйте оба значения в workflow.

## SEO

- Уникальные `title` / `description` / Open Graph на каждом языке (`meta` в словарях).
- `canonical` + `hreflang` (ru, kk, x-default) в `index.html` и `sitemap.xml`.
- JSON-LD `DrivingSchool` с филиалом, телефоном, Instagram, 2GIS и рейтингом (`aggregateRating`) — `src/seo/useSeo.ts`.
- `robots.txt`, `sitemap.xml`, OG-картинка 1200×630 (`public/og.png`).
- Семантика: один `h1`, секции с `h2`, `nav`/`address`/`footer`, aria-подписи на кнопках.

Это SPA: Google рендерит JS, но если нужна максимальная индексация, можно добавить пререндер
(`vite-plugin-prerender` или перейти на Astro) — структура кода к этому готова.

## Что ещё уточнить (помечено TODO)

1. Часы работы филиала — пока не показываются; добавить поле `hours` в `branches.items` и вывести в `Branches.tsx`, плюс `openingHours` в `useSeo.ts`.
2. Домен (`SITE_URL`, `index.html`, `sitemap.xml`, `robots.txt`).
3. Фото в hero и в секции «Как проходит обучение» (сейчас иллюстрация).
