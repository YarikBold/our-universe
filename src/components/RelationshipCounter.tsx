import { useEffect, useMemo, useState } from 'react'
import { Clock3 } from 'lucide-react'

type Counter = { years: number; months: number; days: number; hours: number; minutes: number; seconds: number }

function addMonths(date: Date, months: number) {
  const next = new Date(date)
  const day = next.getDate()
  next.setDate(1)
  next.setMonth(next.getMonth() + months)
  const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()
  next.setDate(Math.min(day, lastDay))
  return next
}

function getCalendarDiff(start: Date, now: Date): Counter {
  if (now < start) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  let cursor = new Date(start)
  let years = now.getFullYear() - cursor.getFullYear()
  cursor = addMonths(cursor, years * 12)
  if (cursor > now) {
    years -= 1
    cursor = addMonths(new Date(start), years * 12)
  }
  let months = 0
  while (addMonths(cursor, 1) <= now) {
    cursor = addMonths(cursor, 1)
    months += 1
    if (months === 12) break
  }
  let remaining = Math.max(0, now.getTime() - cursor.getTime())
  const dayMs = 24 * 60 * 60 * 1000
  const days = Math.floor(remaining / dayMs)
  remaining -= days * dayMs
  const totalSeconds = Math.floor(remaining / 1000)
  return {
    years,
    months,
    days,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export function RelationshipCounter({ startDate, compact = false }: { startDate: string; compact?: boolean }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(id) }, [])
  const diff = useMemo(() => getCalendarDiff(new Date(startDate), now), [startDate, now])
  if (compact) return <div className="compact-counter" aria-label="Счётчик отношений"><Clock3 size={14} /> {diff.years}г {diff.months}м {diff.days}д</div>
  return <div className="relationship-counter glass-panel"><span className="counter-kicker">Мы вместе уже…</span><div className="counter-grid"><span><strong>{diff.years}</strong><small>лет</small></span><span><strong>{diff.months}</strong><small>месяцев</small></span><span><strong>{diff.days}</strong><small>дней</small></span></div><div className="counter-clock">{String(diff.hours).padStart(2,'0')} : {String(diff.minutes).padStart(2,'0')} : {String(diff.seconds).padStart(2,'0')}</div><span className="counter-note">И каждый день с тобой для меня особенный ♡</span></div>
}
