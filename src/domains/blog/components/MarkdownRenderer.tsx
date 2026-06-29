'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
  content: string
}

interface CodeBlockProps extends Record<string, unknown> {
  language: string
  codeString: string
  isDark: boolean
}

/**
 * 渲染带复制功能的代码块。
 */
function CodeBlock({ language, codeString, isDark, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-lg shadow-sm">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded border-0 bg-neutral-700/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-700"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        style={(isDark ? vscDarkPlus : vs) as { [key: string]: CSSProperties }}
        language={language}
        PreTag="div"
        customStyle={{
          backgroundColor: isDark ? 'rgba(48, 54, 61, 0.4)' : '#f6f8fa',
          margin: 0,
          padding: '1.25rem',
          fontSize: '0.9em',
          border: isDark ? '1px solid rgba(240, 246, 252, 0.1)' : 'none',
          borderRadius: '0.5rem',
        }}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

/**
 * 渲染文章 Markdown 内容，并跟随主题切换代码高亮样式。
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const components: Components = {
    code({
      inline,
      className,
      children,
      ...props
    }: ComponentPropsWithoutRef<'code'> & {
      inline?: boolean
      node?: unknown
    }) {
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '')

      if (!inline && match) {
        return <CodeBlock language={match[1]} codeString={codeString} isDark={isDark} {...props} />
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }

  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {content.replace(/\[\[toc\]\]/gi, '')}
      </ReactMarkdown>
    </div>
  )
}

