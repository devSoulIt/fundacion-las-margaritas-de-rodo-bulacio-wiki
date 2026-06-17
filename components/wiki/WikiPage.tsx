interface WikiPageProps {
  contenido: string
}

export default function WikiPage({ contenido }: WikiPageProps) {
  return (
    <div
      className="prose prose-zinc max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-a:text-zinc-900 prose-a:underline prose-a:underline-offset-2
        prose-img:rounded-lg prose-img:shadow-sm
        prose-blockquote:border-l-zinc-300 prose-blockquote:text-zinc-600
        prose-code:bg-zinc-100 prose-code:px-1 prose-code:rounded"
      dangerouslySetInnerHTML={{ __html: contenido }}
    />
  )
}
