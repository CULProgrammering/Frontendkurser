import { useState, useEffect, useCallback } from 'react'
import { MarkdownHooks as Markdown } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { docs, type ResearchDoc } from './docs'
import './App.css'

function Sidebar({
  docs,
  activeId,
  onSelect,
  collapsed,
  onToggle,
}: {
  docs: ResearchDoc[]
  activeId: string | null
  onSelect: (doc: ResearchDoc) => void
  collapsed: boolean
  onToggle: () => void
}) {
  const grouped = docs.reduce<Record<string, ResearchDoc[]>>((acc, doc) => {
    const key = doc.date
    if (!acc[key]) acc[key] = []
    acc[key].push(doc)
    return acc
  }, {})

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Research Library</h2>}
        <button className="toggle-btn" onClick={onToggle} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? '\u2192' : '\u2190'}
        </button>
      </div>
      {!collapsed && (
        <nav className="sidebar-nav">
          {sortedDates.map((date) => (
            <div key={date} className="date-group">
              <div className="date-label">{formatDate(date)}</div>
              {grouped[date].map((doc) => (
                <button
                  key={doc.id}
                  className={`doc-link ${activeId === doc.id ? 'active' : ''}`}
                  onClick={() => onSelect(doc)}
                >
                  <span className="doc-title">{doc.title}</span>
                  <div className="doc-tags">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </nav>
      )}
    </aside>
  )
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function TableOfContents({ markdown }: { markdown: string }) {
  const [expanded, setExpanded] = useState(false)
  const headings: { level: number; text: string; id: string }[] = []
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)/)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/\*\*/g, '').replace(/`/g, '')
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      headings.push({ level, text, id })
    }
  }

  if (headings.length < 3) return null

  const displayed = expanded ? headings : headings.filter(h => h.level === 2)
  const hasH3s = headings.some(h => h.level === 3)

  return (
    <div className="toc">
      <div className="toc-header">
        <div className="toc-title">Contents</div>
        {hasH3s && (
          <button className="toc-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Collapse' : 'Expand all'}
          </button>
        )}
      </div>
      <ul>
        {displayed.map((h, i) => (
          <li key={i} className={`toc-${h.level}`}>
            <a href={`#${h.id}`} onClick={(e) => {
              e.preventDefault()
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
            }}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DocViewer({ doc }: { doc: ResearchDoc }) {
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/${doc.file}`)
      .then((r) => r.text())
      .then((text) => {
        setContent(text)
        setLoading(false)
        window.scrollTo({ top: 0 })
      })
      .catch(() => {
        setContent('# Error\n\nCould not load document.')
        setLoading(false)
      })
  }, [doc.file])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="doc-viewer">
      <TableOfContents markdown={content} />
      <article className="markdown-body">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children, ...props }) => {
              const text = String(children).replace(/\*\*/g, '').replace(/`/g, '')
              const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
              return <h2 id={id} {...props}>{children}</h2>
            },
            h3: ({ children, ...props }) => {
              const text = String(children).replace(/\*\*/g, '').replace(/`/g, '')
              const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
              return <h3 id={id} {...props}>{children}</h3>
            },
            a: ({ href, children, ...props }) => (
              <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
            ),
            table: ({ children, ...props }) => (
              <div className="table-wrapper">
                <table {...props}>{children}</table>
              </div>
            ),
          }}
        >{content}</Markdown>
      </article>
    </div>
  )
}

function WelcomeScreen() {
  return (
    <div className="welcome">
      <h1>Research Library</h1>
      <p className="welcome-subtitle">Select a document from the sidebar to start reading.</p>
      <div className="welcome-stats">
        <div className="stat">
          <span className="stat-value">{docs.length}</span>
          <span className="stat-label">Documents</span>
        </div>
        <div className="stat">
          <span className="stat-value">{new Set(docs.flatMap(d => d.tags)).size}</span>
          <span className="stat-label">Topics</span>
        </div>
      </div>
      <div className="welcome-docs">
        {docs.map((doc) => (
          <div key={doc.id} className="welcome-doc">
            <span className="welcome-date">{doc.date}</span>
            <span className="welcome-title">{doc.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeDoc, setActiveDoc] = useState<ResearchDoc | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSelect = useCallback((doc: ResearchDoc) => {
    setActiveDoc(doc)
    window.history.pushState(null, '', `#${doc.id}`)
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const doc = docs.find((d) => d.id === hash)
      if (doc) setActiveDoc(doc)
    }
  }, [])

  return (
    <div className="app">
      <Sidebar
        docs={docs}
        activeId={activeDoc?.id ?? null}
        onSelect={handleSelect}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="content">
        {activeDoc ? <DocViewer doc={activeDoc} /> : <WelcomeScreen />}
      </main>
    </div>
  )
}
