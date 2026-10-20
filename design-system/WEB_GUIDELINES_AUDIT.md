# Web Interface Guidelines audit

Проверено после редизайна 20 октября 2026.

- `npm run build` — passed (TypeScript + Vite).
- Mobile viewport 390×844 — `scrollWidth === innerWidth === 390`.
- Клавиатурный focus — visible focus ring; добавлена skip-link.
- Icon-only controls — `aria-label` у музыки, лапки, закрытия модалок и фото.
- Изображения — `alt`, `width`/`height`; воспоминания lazy-loaded.
- Модальные окна — Escape закрывает письмо/секрет, scroll chaining ограничен.
- Анимации — transform/opacity, reduced-motion fallback, no `transition: all`.
- Touch targets — минимум 44px для основных controls.
- Safe area — top/bottom offsets через `env(safe-area-inset-*)`.
- HMR — Vite dev client отвечает через `/@vite/client`.

Ожидаемые 404 в браузере появляются только когда пользовательские `us.jpg` и `our-song.mp3` ещё не добавлены; компоненты используют fallback и не падают.
