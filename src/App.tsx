import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Sidebar, MobileNav } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { DashboardPage } from './pages/DashboardPage'
import { MarketsPage } from './pages/MarketsPage'
import { ActivityPage } from './pages/ActivityPage'
import { SettingsPage } from './pages/SettingsPage'
import { useCryptoStore } from './store/useCryptoStore'

function App() {
  const updateMarketPrices = useCryptoStore((state) => state.updateMarketPrices)
  const [isLive, setIsLive] = useState(true)
  useEffect(() => {
    if (!isLive) return
    const interval = window.setInterval(() => updateMarketPrices(), 3500)
    return () => window.clearInterval(interval)
  }, [isLive, updateMarketPrices])
  return <div className="min-h-screen bg-ink text-slate-100">
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 flex-1 pb-20 lg:pb-0">
        <Topbar />
        <div className="mx-auto max-w-[1420px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
          <Routes><Route path="/" element={<DashboardPage isLive={isLive} setIsLive={setIsLive} />} /><Route path="/markets" element={<MarketsPage />} /><Route path="/activity" element={<ActivityPage />} /><Route path="/settings" element={<SettingsPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>
        </div>
      </main>
    </div>
    <MobileNav />
    <div className="pointer-events-none fixed right-0 top-0 -z-0 h-[420px] w-[420px] rounded-full bg-[#3c5b24]/[.06] blur-[100px]" />
  </div>
}

export default App
