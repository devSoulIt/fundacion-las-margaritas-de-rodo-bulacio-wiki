'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { TextAlign } from '@tiptap/extension-text-align'
import { Placeholder } from '@tiptap/extension-placeholder'
import { subirArchivo } from '@/app/actions/media'

interface RichEditorProps {
  name: string
  defaultValue?: string
  placeholder?: string
}

export default function RichEditor({ name, defaultValue = '', placeholder = 'Escribí el contenido…' }: RichEditorProps) {
  const [html, setHtml] = useState(defaultValue)

  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({ dropcursor: false }),
      Image.configure({ allowBase64: false }),
      Youtube.configure({ width: 640, height: 360, nocookie: true }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: 'https' }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    onUpdate({ editor }) {
      setHtml(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-zinc max-w-none min-h-[300px] focus:outline-none px-4 py-3',
      },
    },
  })

  async function handleImageUpload() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file || !editor) return
      const fd = new FormData()
      fd.append('archivo', file)
      fd.append('carpeta', 'imagenes')
      const { url, error } = await subirArchivo(fd)
      if (error || !url) return
      editor.chain().focus().setImage({ src: url }).run()
    }
    input.click()
  }

  function handleYoutube() {
    const url = prompt('URL del video de YouTube:')
    if (!url || !editor) return
    editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  function handleLink() {
    const url = prompt('URL del enlace:')
    if (!url || !editor) return
    editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
  }

  return (
    <div className="border border-zinc-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-zinc-200 bg-zinc-50">
        <ToolBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Negrita">B</ToolBtn>
        <ToolBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Cursiva"><em>I</em></ToolBtn>
        <Sep />
        {([1, 2, 3] as const).map((n) => (
          <ToolBtn key={n} onClick={() => editor?.chain().focus().toggleHeading({ level: n }).run()} active={editor?.isActive('heading', { level: n })} title={`Título ${n}`}>H{n}</ToolBtn>
        ))}
        <Sep />
        <ToolBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Lista">• —</ToolBtn>
        <ToolBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Lista numerada">1.</ToolBtn>
        <ToolBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Cita">"</ToolBtn>
        <Sep />
        <ToolBtn onClick={handleImageUpload} title="Insertar imagen">IMG</ToolBtn>
        <ToolBtn onClick={handleYoutube} title="Video YouTube">YT</ToolBtn>
        <ToolBtn onClick={handleLink} active={editor?.isActive('link')} title="Insertar link">🔗</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })} title="Izquierda">≡</ToolBtn>
        <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })} title="Centro">≡</ToolBtn>
        <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })} title="Derecha">≡</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor?.chain().focus().undo().run()} title="Deshacer">↩</ToolBtn>
        <ToolBtn onClick={() => editor?.chain().focus().redo().run()} title="Rehacer">↪</ToolBtn>
      </div>

      <EditorContent editor={editor} />

      <input type="hidden" name={name} value={html} readOnly />
    </div>
  )
}

function ToolBtn({
  onClick, active, title, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
        active ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-200'
      }`}
    >
      {children}
    </button>
  )
}

function Sep() {
  return <span className="w-px bg-zinc-200 mx-1 self-stretch" />
}
