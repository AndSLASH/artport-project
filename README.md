# Artport Project

## Опис

Artport Project — це веб-додаток для перегляду, пошуку та фільтрації вагонів, а також роботи з галереєю фото вагонів. Проект побудований на Next.js з використанням Chakra UI для сучасного інтерфейсу та TypeScript для типізації.

### Демо

[https://artport-project.vercel.app/](https://artport-project.vercel.app/)

### Основні можливості

- Список вагонів з пошуком, фільтрацією та сортуванням
- Детальна сторінка вагона
- Галерея фото вагонів
- SSR (Server Side Rendering) для SEO та швидкого першого рендеру
- Клієнтська пагінація, фільтрація та сортування
- Темна/світла тема

## Технології

- Next.js (Pages Router)
- Chakra UI
- TypeScript

## Структура проекту

- `src/pages` — сторінки проекту (вагони, галерея, деталі)
- `src/components` — UI-компоненти (VagonCard, Pagination, Header, Footer, Loader тощо)
- `src/utils` — утиліти для SSR та роботи з даними
- `src/types` — типи для TypeScript
- `public` — статичні файли та іконки

## Запуск

1. Встановіть залежності:
   ```bash
   npm install
   ```
2. Запустіть проект:
   ```bash
   npm run dev
   ```
3. Відкрийте [http://localhost:3000](http://localhost:3000)

## Автор

Artport Team

---
