import type { Asset } from '../store/useCryptoStore'

export function AssetIcon({ asset, size = 'md' }: { asset: Pick<Asset, 'color' | 'icon'>; size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = size === 'lg' ? 'h-12 w-12 text-xl rounded-2xl' : size === 'sm' ? 'h-8 w-8 text-sm rounded-[10px]' : 'h-10 w-10 text-base rounded-xl'
  return (
    <div aria-hidden="true" className={`grid shrink-0 place-items-center font-display font-extrabold ${dimensions}`} style={{ background: `${asset.color}16`, color: asset.color }}>
      {asset.icon}
    </div>
  )
}
