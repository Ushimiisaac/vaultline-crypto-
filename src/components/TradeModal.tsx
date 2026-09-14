import { useMemo, useState } from 'react'
import { ArrowDownUp, CheckCircle2, ChevronDown, LoaderCircle, ShieldCheck, X } from 'lucide-react'
import { AssetIcon } from './AssetIcon'
import { type AssetSymbol, useCryptoStore } from '../store/useCryptoStore'

export function TradeModal({ initialSymbol, initialType = 'buy', onClose }: { initialSymbol: AssetSymbol; initialType?: 'buy' | 'sell'; onClose: () => void }) {
  const { assets, cashBalance, executeTrade } = useCryptoStore()
  const [type, setType] = useState<'buy' | 'sell'>(initialType)
  const [symbol, setSymbol] = useState<AssetSymbol>(initialSymbol)
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const asset = assets.find((item) => item.symbol === symbol) ?? assets[0]
  const numericAmount = Number(amount) || 0
  const estimatedValue = useMemo(() => numericAmount * asset.price, [numericAmount, asset.price])
  const available = type === 'buy' ? cashBalance : asset.quantity

  const submit = async () => {
    setError('')
    if (!numericAmount) { setError('Enter an amount to continue.'); return }
    setIsSubmitting(true)
    try {
      await executeTrade(type, symbol, numericAmount)
      setSuccess(true)
    } catch (tradeError) {
      setError(tradeError instanceof Error ? tradeError.message : 'Something went wrong.')
    } finally { setIsSubmitting(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#02050b]/75 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="w-full max-w-[440px] rounded-t-3xl border border-line bg-[#101a29] p-5 shadow-[0_25px_100px_rgba(0,0,0,.45)] sm:rounded-3xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div><p className="eyebrow text-lime">Secure trade</p><h2 className="mt-1 font-display text-xl font-bold text-white">{success ? 'Order complete' : `${type === 'buy' ? 'Buy' : 'Sell'} crypto`}</h2></div>
          <button onClick={onClose} className="icon-button" aria-label="Close"><X size={17} /></button>
        </div>
        {success ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-lime/10 text-lime"><CheckCircle2 size={32} /></div>
            <h3 className="font-display text-lg font-bold text-white">Your trade is confirmed</h3>
            <p className="mx-auto mt-2 max-w-[280px] text-sm leading-6 text-muted">{type === 'buy' ? 'Your asset balance has been updated.' : 'The proceeds are now available in your cash balance.'}</p>
            <button onClick={onClose} className="mt-7 w-full rounded-xl bg-lime py-3.5 text-sm font-bold text-ink transition hover:bg-[#d9ff88]">Done</button>
          </div>
        ) : <>
          <div className="mb-5 grid grid-cols-2 rounded-xl bg-[#0a111c] p-1">
            {(['buy', 'sell'] as const).map((item) => <button key={item} onClick={() => { setType(item); setError('') }} className={`rounded-lg py-2.5 text-sm font-bold capitalize transition ${type === item ? 'bg-[#1e2d40] text-white shadow-sm' : 'text-muted hover:text-white'}`}>{item}</button>)}
          </div>
          <label className="eyebrow mb-2 block">Asset</label>
          <div className="relative mb-5">
            <select value={symbol} onChange={(event) => setSymbol(event.target.value as AssetSymbol)} className="w-full appearance-none rounded-xl border border-line bg-[#0a111c] py-3 pl-3 pr-10 text-sm font-semibold text-white outline-none focus:border-lime/60">
              {assets.map((item) => <option key={item.symbol} value={item.symbol}>{item.symbol} — {item.name}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-muted" size={16} />
          </div>
          <div className="mb-5 rounded-2xl border border-line bg-[#0a111c] p-4">
            <div className="mb-3 flex items-center gap-3"><AssetIcon asset={asset} /><div><p className="text-sm font-bold text-white">{asset.name}</p><p className="text-xs text-muted">${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per {symbol}</p></div></div>
            <div className="flex items-center justify-between border-t border-line pt-3 text-xs"><span className="text-muted">Available to {type}</span><span className="font-semibold text-slate-200">{type === 'buy' ? `$${available.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : `${available.toFixed(4)} ${symbol}`}</span></div>
          </div>
          <label className="eyebrow mb-2 block">Amount in {symbol}</label>
          <div className="relative mb-2"><input autoFocus inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className="w-full rounded-xl border border-line bg-[#0a111c] px-4 py-3.5 pr-16 text-xl font-bold text-white outline-none placeholder:text-[#3a475a] focus:border-lime/60" /><span className="absolute right-4 top-4 text-xs font-bold text-muted">{symbol}</span></div>
          <div className="mb-5 flex justify-between text-xs"><span className="text-muted">Estimated total</span><span className="font-semibold text-slate-200">${estimatedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
          {error && <p className="mb-4 rounded-lg bg-[#f4788b]/10 px-3 py-2 text-xs font-semibold text-[#f99aaa]">{error}</p>}
          <div className="mb-5 flex items-center gap-2 text-xs text-muted"><ShieldCheck size={15} className="text-aqua" /><span>Protected by Vaultline transaction security</span></div>
          <button onClick={submit} disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime py-3.5 text-sm font-bold text-ink transition hover:bg-[#d9ff88] disabled:cursor-wait disabled:opacity-70">{isSubmitting ? <><LoaderCircle size={16} className="animate-spin" /> Processing securely</> : <>{type === 'buy' ? 'Review buy order' : 'Review sell order'} <ArrowDownUp size={16} /></>}</button>
        </>}
      </div>
    </div>
  )
}
