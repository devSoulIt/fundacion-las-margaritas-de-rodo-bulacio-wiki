interface WikiPageProps {
  contenido: string
}

export default function WikiPage({ contenido }: WikiPageProps) {
  return (
    <div
      className="wiki-content"
      dangerouslySetInnerHTML={{ __html: contenido }}
    />
  )
}
