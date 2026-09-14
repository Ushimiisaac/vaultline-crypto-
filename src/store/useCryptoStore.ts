import { create } from 'zustand'

export type AssetSymbol = 'BTC' | 'ETH' | 'SOL' | 'USDC'

export type Asset = {
  symbol: AssetSymbol
  name: string
  network: string
  color: string
  icon: string
  price: number
  change: number
  changePct: number
  quantity: number
  averagePrice: number
  sparkline: number[]
}

export type Transaction = {
  id: string
  type: 'buy' | 'sell' | 'deposit'
  asset: AssetSymbol | 'USD'
  amount: number
  value: number
  price?: number
  date: string
  status: 'completed' | 'processing'
}

export const initialAssets: Asset[] = [
  {
    symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin network', color: '#f7931a', icon: '₿', price: 98450.82,
    change: 1238.42, changePct: 1.27, quantity: 0.1842, averagePrice: 86940.2,
    sparkline: [52, 48, 51, 46, 49, 44, 47, 43, 39, 42, 36, 40, 35, 37, 32, 34, 29, 31, 28, 27, 30, 24, 26, 20, 22, 19, 16, 18, 13, 15, 11, 8, 12, 7, 10, 6, 8, 4, 7, 3, 6, 2, 5, 3, 4, 1, 5, 2, 6, 3, 7, 4, 8, 5, 9, 12, 10, 14, 12, 16, 18, 15, 20, 22, 25, 23, 28, 31, 29, 33, 36, 34, 38, 41, 43, 47, 45, 49, 52, 55, 59, 62, 58, 63, 66, 69, 67, 71, 74, 79, 77, 82, 86, 84, 89, 92, 96, 93, 98],
  },
  {
    symbol: 'ETH', name: 'Ethereum', network: 'Ethereum network', color: '#8b93ff', icon: '◆', price: 3412.27,
    change: 64.11, changePct: 1.91, quantity: 2.48, averagePrice: 2928.54,
    sparkline: [82, 80, 85, 83, 88, 87, 91, 89, 86, 88, 84, 86, 81, 84, 78, 80, 74, 77, 72, 69, 73, 68, 65, 67, 62, 60, 63, 58, 55, 57, 52, 54, 50, 47, 51, 48, 44, 46, 43, 40, 44, 41, 45, 42, 47, 49, 53, 51, 56, 59, 57, 62, 64, 61, 66, 69, 67, 71, 74, 78, 76, 80, 83, 81, 85, 88, 91, 89, 94, 96, 92, 95, 98, 96, 101, 104, 100, 103, 107, 110, 108, 112, 115, 118, 116, 121, 124, 122, 126, 129, 131, 128, 133, 136, 140, 137, 142, 145, 149, 147],
  },
  {
    symbol: 'SOL', name: 'Solana', network: 'Solana network', color: '#a78bfa', icon: '≋', price: 188.42,
    change: -2.18, changePct: -1.14, quantity: 18.7, averagePrice: 151.8,
    sparkline: [69, 74, 72, 78, 76, 81, 79, 84, 81, 85, 80, 83, 77, 80, 75, 71, 74, 68, 70, 65, 67, 62, 65, 59, 61, 57, 53, 57, 50, 54, 49, 45, 47, 42, 44, 39, 43, 37, 40, 35, 38, 33, 36, 31, 34, 30, 27, 30, 26, 29, 24, 27, 22, 25, 21, 24, 20, 23, 18, 21, 17, 20, 16, 19, 15, 18, 14, 17, 13, 16, 12, 15, 11, 14, 10, 13, 9, 12, 8, 11, 9, 13, 10, 15, 12, 17, 14, 19, 16, 21, 18, 24, 21, 27, 24, 30, 28, 33],
  },
  {
    symbol: 'USDC', name: 'USD Coin', network: 'Ethereum network', color: '#2775ca', icon: '$', price: 1.00,
    change: 0.00, changePct: 0.01, quantity: 1240.5, averagePrice: 1,
    sparkline: [50, 50, 51, 50, 50, 49, 50, 50, 51, 50, 50, 50, 49, 50, 50, 50, 51, 50, 50, 50, 49, 50, 50, 50, 50, 51, 50, 50, 49, 50, 50, 50, 50, 51, 50, 50, 49, 50, 50, 50, 50, 51, 50, 50, 50, 49, 50, 50, 50, 50],
  },
]

const initialTransactions: Transaction[] = [
  { id: 'tx-1', type: 'buy', asset: 'ETH', amount: 0.75, value: 2484.22, price: 3312.3, date: 'Today, 10:42 AM', status: 'completed' },
  { id: 'tx-2', type: 'sell', asset: 'SOL', amount: 8.5, value: 1624.9, price: 191.16, date: 'Yesterday, 4:18 PM', status: 'completed' },
  { id: 'tx-3', type: 'deposit', asset: 'USD', amount: 2500, value: 2500, date: 'Jan 12, 2025', status: 'completed' },
  { id: 'tx-4', type: 'buy', asset: 'BTC', amount: 0.032, value: 3031.65, price: 94739.1, date: 'Jan 09, 2025', status: 'completed' },
  { id: 'tx-5', type: 'buy', asset: 'SOL', amount: 12.2, value: 2240.84, price: 183.67, date: 'Jan 05, 2025', status: 'completed' },
]

type CryptoStore = {
  assets: Asset[]
  cashBalance: number
  transactions: Transaction[]
  selectedRange: '1D' | '1W' | '1M' | '1Y' | 'ALL'
  setRange: (range: CryptoStore['selectedRange']) => void
  updateMarketPrices: () => void
  executeTrade: (type: 'buy' | 'sell', symbol: AssetSymbol, amount: number) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>((set, get) => ({
  assets: initialAssets,
  cashBalance: 8420.6,
  transactions: initialTransactions,
  selectedRange: '1M',
  setRange: (selectedRange) => set({ selectedRange }),
  updateMarketPrices: () => set((state) => ({
    assets: state.assets.map((asset) => {
      if (asset.symbol === 'USDC') return asset
      const movement = (Math.random() - 0.47) * (asset.price * 0.0012)
      const price = Math.max(0.01, asset.price + movement)
      const change = price - (asset.price - asset.change)
      return {
        ...asset,
        price,
        change,
        changePct: (change / (price - change)) * 100,
        sparkline: [...asset.sparkline.slice(1), Math.max(1, asset.sparkline[asset.sparkline.length - 1] + (Math.random() - 0.48) * 4)],
      }
    }),
  })),
  executeTrade: async (type, symbol, amount) => {
    const asset = get().assets.find((item) => item.symbol === symbol)
    if (!asset || amount <= 0) throw new Error('Enter a valid amount')
    const value = amount * asset.price
    const state = get()
    if (type === 'buy' && value > state.cashBalance) throw new Error('Insufficient USD balance')
    if (type === 'sell' && amount > asset.quantity) throw new Error(`You only hold ${asset.quantity} ${symbol}`)

    await new Promise((resolve) => setTimeout(resolve, 650))
    set((current) => ({
      assets: current.assets.map((item) => item.symbol !== symbol ? item : {
        ...item,
        quantity: type === 'buy' ? item.quantity + amount : item.quantity - amount,
        averagePrice: type === 'buy' ? ((item.quantity * item.averagePrice) + value) / (item.quantity + amount) : item.averagePrice,
      }),
      cashBalance: type === 'buy' ? current.cashBalance - value : current.cashBalance + value,
      transactions: [{
        id: `tx-${Date.now()}`, type, asset: symbol, amount, value, price: asset.price,
        date: 'Just now', status: 'completed',
      }, ...current.transactions],
    }))
  },
}))
