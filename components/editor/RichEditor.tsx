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
import MediaPicker from './MediaPicker'

interface RichEditorProps {
  name: string
  defaultValue?: string
  placeholder?: string
}

type Tab = 'editar' | 'preview'

export default function RichEditor({ name, defaultValue = '', placeholder = 'Escribí el contenido…' }: RichEditorProps) {
  const [html, setHtml] = useState(defaultValue)
  const [tab, setTab] = useState<Tab>('editar')
  const [mediaOpen, setMediaOpen] = useState(false)

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
        class: 'rich-editor-area',
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

  function handleMediaSelect(url: string) {
    if (!editor) return
    editor.chain().focus().setImage({ src: url }).run()
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
    <>
      {mediaOpen && (
        <MediaPicker
          onSelect={handleMediaSelect}
          onClose={() => setMediaOpen(false)}
        />
      )}

      <div
        style={{
          border: '1px solid var(--a-border)',
          background: 'var(--a-surface)',
          overflow: 'hidden',
        }}
      >
        {/* Tab bar + toolbar */}
        <div
          style={{
            borderBottom: '1px solid var(--a-border)',
            background: 'var(--a-bg)',
          }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--a-border)' }}>
            {(['editar', 'preview'] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid var(--a-accent)' : '2px solid transparent',
                  color: tab === t ? 'var(--a-accent)' : 'var(--a-text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '9px 16px',
                  transition: 'color 0.15s',
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                }}
              >
                {t === 'editar' ? 'Editar' : 'Vista previa'}
              </button>
            ))}
          </div>

          {/* Toolbar — only shown in edit tab */}
          {tab === 'editar' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', padding: '6px 8px', alignItems: 'center' }}>
              <ToolBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Negrita">
                <strong>B</strong>
              </ToolBtn>
              <ToolBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Cursiva">
                <em>I</em>
              </ToolBtn>
              <Sep />
              {([1, 2, 3] as const).map((n) => (
                <ToolBtn key={n} onClick={() => editor?.chain().focus().toggleHeading({ level: n }).run()} active={editor?.isActive('heading', { level: n })} title={`Título ${n}`}>
                  H{n}
                </ToolBtn>
              ))}
              <Sep />
              <ToolBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Lista">•—</ToolBtn>
              <ToolBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Lista numerada">1.</ToolBtn>
              <ToolBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Cita">"</ToolBtn>
              <Sep />
              {/* Media library button — highlighted */}
              <ToolBtn
                onClick={() => setMediaOpen(true)}
                title="Insertar desde biblioteca"
                highlight
              >
                Biblioteca
              </ToolBtn>
              <ToolBtn onClick={handleImageUpload} title="Subir imagen nueva">Subir img</ToolBtn>
              <ToolBtn onClick={handleYoutube} title="Video YouTube">YT</ToolBtn>
              <ToolBtn onClick={handleLink} active={editor?.isActive('link')} title="Insertar link">Link</ToolBtn>
              <Sep />
              <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })} title="Izquierda">≡L</ToolBtn>
              <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })} title="Centro">≡C</ToolBtn>
              <ToolBtn onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })} title="Derecha">≡R</ToolBtn>
              <Sep />
              <ToolBtn onClick={() => editor?.chain().focus().undo().run()} title="Deshacer">↩</ToolBtn>
              <ToolBtn onClick={() => editor?.chain().focus().redo().run()} title="Rehacer">↪</ToolBtn>
            </div>
          )}
        </div>

        {/* Editor area */}
        {tab === 'editar' && (
          <div style={{ background: 'var(--a-surface)' }}>
            <style>{`
              .rich-editor-area {
                min-height: 320px;
                padding: 1rem 1.25rem;
                outline: none;
                font-family: var(--font-dm-sans), sans-serif;
                font-size: 0.9rem;
                line-height: 1.7;
                color: var(--a-text);
              }
              .rich-editor-area p { margin-bottom: 1em; }
              .rich-editor-area h1, .rich-editor-area h2, .rich-editor-area h3 {
                font-family: var(--font-cormorant), serif;
                color: var(--a-text);
                margin-top: 1.5em;
                margin-bottom: 0.5em;
              }
              .rich-editor-area h2 { font-size: 1.4rem; }
              .rich-editor-area h3 { font-size: 1.15rem; }
              .rich-editor-area ul, .rich-editor-area ol { padding-left: 1.5em; margin-bottom: 1em; }
              .rich-editor-area li { margin-bottom: 0.3em; }
              .rich-editor-area blockquote {
                border-left: 2px solid var(--a-accent);
                padding-left: 1em;
                margin: 1em 0;
                color: var(--a-text-muted);
                font-style: italic;
              }
              .rich-editor-area a { color: var(--a-accent); text-decoration: underline; }
              .rich-editor-area img { max-width: 100%; border-radius: 2px; }
              .rich-editor-area p.is-editor-empty:first-child::before {
                content: attr(data-placeholder);
                float: left;
                color: var(--a-text-muted);
                pointer-events: none;
                height: 0;
              }
            `}</style>
            <EditorContent editor={editor} />
          </div>
        )}

        {/* Preview area */}
        {tab === 'preview' && (
          <div
            style={{
              minHeight: '320px',
              padding: '1.5rem',
              background: 'var(--bg)',
            }}
          >
            {html ? (
              <div
                className="wiki-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '1rem',
                }}
              >
                El contenido aparecerá aquí tal como se verá en el sitio.
              </p>
            )}
          </div>
        )}

        <input type="hidden" name={name} value={html} readOnly />
      </div>
    </>
  )
}

function ToolBtn({
  onClick, active, title, children, highlight,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
  highlight?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        background: active
          ? 'var(--a-accent)'
          : highlight
          ? 'rgba(201,149,76,0.15)'
          : 'transparent',
        border: highlight ? '1px solid rgba(201,149,76,0.4)' : '1px solid transparent',
        color: active ? '#fff' : highlight ? 'var(--a-accent)' : 'var(--a-text-muted)',
        cursor: 'pointer',
        fontSize: '0.72rem',
        fontFamily: 'var(--font-dm-sans), sans-serif',
        letterSpacing: '0.04em',
        padding: '4px 8px',
        transition: 'background 0.15s, color 0.15s',
        borderRadius: '2px',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(201,149,76,0.15)'
          e.currentTarget.style.color = 'var(--a-accent)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = highlight ? 'rgba(201,149,76,0.15)' : 'transparent'
          e.currentTarget.style.color = highlight ? 'var(--a-accent)' : 'var(--a-text-muted)'
        }
      }}
    >
      {children}
    </button>
  )
}

function Sep() {
  return (
    <span
      style={{
        width: '1px',
        background: 'var(--a-border)',
        alignSelf: 'stretch',
        margin: '0 3px',
      }}
    />
  )
}
