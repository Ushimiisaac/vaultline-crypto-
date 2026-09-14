export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-8 w-8 place-items-center rounded-[10px] bg-lime text-ink shadow-[0_0_24px_rgba(199,243,107,.16)]">
        <span className="absolute h-[2px] w-[17px] -rotate-45 rounded-full bg-ink" />
        <span className="absolute h-[2px] w-[17px] rotate-45 rounded-full bg-ink" />
        <span className="absolute h-[2px] w-2.5 rotate-90 rounded-full bg-lime" />
      </div>
      {!compact && <span className="font-display text-[17px] font-extrabold tracking-[-.04em] text-white">vaultline</span>}
    </div>
  )
}
