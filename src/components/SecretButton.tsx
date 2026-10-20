import { PawPrint } from 'lucide-react'
export function SecretButton({ unlocked, onClick }: { unlocked: boolean; onClick: () => void }) { return <button className={`secret-paw ${unlocked ? 'is-unlocked' : ''}`} onClick={onClick} aria-label="Секретная кнопка лапка"><PawPrint size={17} /></button> }
