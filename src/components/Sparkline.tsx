export function Sparkline({ values, positive = true, large = false }: { values: number[]; positive?: boolean; large?: boolean }) {
  const width = large ? 680 : 132
  const height = large ? 205 : 44
  const min = Math.min(...values)
  const max = Math.max(...values)
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width
    const y = height - ((value - min) / Math.max(1, max - min)) * (height - 12) - 6
    return `${x},${y}`
  }).join(' ')
  const color = positive ? '#c7f36b' : '#f4788b'
  const area = `0,${height} ${points} ${width},${height}`
  return (
    <svg className="h-full w-full overflow-visible" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-label="Price chart">
      {large && <>
        <defs>
          <linearGradient id={`area-${positive ? 'up' : 'down'}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".19" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M ${area} Z`} fill={`url(#area-${positive ? 'up' : 'down'})`} />
      </>}
      <polyline points={points} fill="none" stroke={color} strokeWidth={large ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
