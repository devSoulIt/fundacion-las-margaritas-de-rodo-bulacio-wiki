'use client'

import dynamic from 'next/dynamic'

const RichEditor = dynamic(() => import('./RichEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-zinc-300 rounded-lg bg-white min-h-[300px] flex items-center justify-center">
      <span className="text-sm text-zinc-400">Cargando editor…</span>
    </div>
  ),
})

export default RichEditor
