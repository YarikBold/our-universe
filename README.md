# Наша маленькая вселенная

Интерактивный романтический сайт-подарок на React + TypeScript + Vite.

## Запуск

```bash
npm install
npm run dev
```

Production-проверка:

```bash
npm run build
npm run preview
```

## Личный контент

- Тексты, даты, обращения, музыка и сообщения находятся в `src/data/loveStory.ts`.
- Совместную фотографию добавьте в `public/images/us.jpg`.
- Фотографии воспоминаний можно положить в `public/images/memories/` и прописать в массиве `memories`.
- Музыкальный файл положите в `public/audio/our-song.mp3`. Если файла нет, сайт продолжит работать без звука.

## Публикация

Проект готов для GitHub и Vercel: импортируйте репозиторий в Vercel, оставьте стандартные настройки Vite, а командой сборки используйте `npm run build` и каталог `dist`.

### Cloudflare Pages

Создайте Pages-проект из GitHub-репозитория:

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite (или None)

### Папки для личных файлов

В репозитории оставлены `public/images/` и `public/images/memories/` для фотографий, а также `public/audio/` для музыки. Добавьте туда свои файлы и обновите пути в `src/data/loveStory.ts` при необходимости.
