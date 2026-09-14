import { Bell, Menu, Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { BrandMark } from './BrandMark'

const titles: Record<string, [string, string]> = {
  '/': ['Good morning, Jordan', 'Here’s what’s happening with your portfolio today.'],
  '/markets': ['Markets', 'Stay close to the assets that move your portfolio.'],
  '/activity': ['Activity', 'A clear history of every portfolio move.'],
  '/settings': ['Settings', 'Manage your account, preferences, and security.'],
}

export function Topbar() {
  const { pathname } = useLocation()
  const [title, subtitle] = titles[pathname] ?? titles['/']
  return <header className="flex min-h-[76px] items-center justify-between border-b border-line px-5 py-4 sm:px-8 lg:px-10">
    <div className="flex items-center gap-3"><button className="icon-button lg:hidden" aria-label="Open menu"><Menu size={18} /></button><div className="lg:hidden"><BrandMark compact /></div><div className="hidden lg:block"><h1 className="font-display text-[21px] font-bold tracking-[-.03em] text-white">{title}</h1><p className="mt-0.5 text-xs text-muted">{subtitle}</p></div></div>
    <div className="flex items-center gap-3"><div className="hidden items-center gap-2 rounded-xl border border-line bg-[#0d1623] px-3 py-2.5 text-xs text-muted md:flex"><Search size={15} /><span>Search assets</span><kbd className="ml-6 rounded bg-[#182436] px-1.5 py-0.5 text-[10px]">⌘ K</kbd></div><button className="icon-button relative" aria-label="Notifications"><Bell size={17} /><span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-lime" /></button><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#c3a2ff] text-xs font-bold text-[#231737] lg:hidden">JD</div></div>
  </header>
}
