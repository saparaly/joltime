/** Маленький бейдж «2GIS» в фирменном зелёном — заменяет иконку сервиса. */
export function GisBadge({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center justify-center rounded-[5px] bg-[#1ba136] px-1 font-display text-[9px] font-extrabold leading-4 tracking-tight text-white ${className}`}>
      2GIS
    </span>
  )
}
