import { BarChart3, CircleHelp, Clock3, LayoutDashboard, LogOut, Settings2, ShieldCheck, WalletCards } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { BrandMark } from './BrandMark'

const navItems = [
  { label: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Markets', to: '/markets', icon: BarChart3 },
  { label: 'Activity', to: '/activity', icon: Clock3 },
]

export function Sidebar() {
  return <aside className="hidden w-[232px] shrink-0 flex-col border-r border-line bg-[#0a111c] px-4 py-6 lg:flex">
    <div className="px-2"><BrandMark /></div>
    <div className="mt-12 flex-1">
      <p className="eyebrow mb-3 px-3">Workspace</p>
      <nav className="space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-[#1b2a38] text-white' : 'text-muted hover:bg-[#111c2c] hover:text-white'}`}><Icon size={17} strokeWidth={1.8} /><span>{label}</span></NavLink>)}
      </nav>
      <p className="eyebrow mb-3 mt-10 px-3">Account</p>
      <nav className="space-y-1">
        <NavLink to="/settings" className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? 'bg-[#1b2a38] text-white' : 'text-muted hover:bg-[#111c2c] hover:text-white'}`}><Settings2 size={17} strokeWidth={1.8} /><span>Settings</span></NavLink>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted transition hover:bg-[#111c2c] hover:text-white"><CircleHelp size={17} strokeWidth={1.8} /><span>Support</span></button>
      </nav>
    </div>
    <div className="rounded-2xl border border-[#26384a] bg-[#101e2a] p-3">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-aqua"><ShieldCheck size={15} /> All systems secure</div>
      <p className="text-[11px] leading-4 text-muted">Your portfolio is protected with multi-layer security.</p>
    </div>
    <div className="mt-4 flex items-center justify-between border-t border-line px-2 pt-4"><div className="flex items-center gap-2.5"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#c3a2ff] text-xs font-bold text-[#231737]">JD</div><div><p className="text-xs font-bold text-white">Jordan Davis</p><p className="text-[10px] text-muted">Personal account</p></div></div><LogOut size={15} className="text-muted" /></div>
  </aside>
}

export function MobileNav() {
  return <nav className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-line bg-[#0a111c]/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
    {navItems.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-w-[74px] flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-bold ${isActive ? 'text-lime' : 'text-[#9aabc0]'}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></NavLink>)}
    <NavLink to="/settings" className={({ isActive }) => `flex min-w-[74px] flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[10px] font-bold ${isActive ? 'text-lime' : 'text-[#9aabc0]'}`}><WalletCards size={18} strokeWidth={1.8} /><span>Account</span></NavLink>
  </nav>
}
