import { createElement, Fragment, type ReactNode } from 'react'

/**
 * Tiny inline markup for the invitation line:
 *   **name**  → display serif, larger (class "mk-name")
 *   *word*    → italic (class "mk-em")
 *   \n        → line break
 */
export function renderMarkup(text: string): ReactNode {
  const lines = text.split('\n')
  return lines.map((line, li) =>
    createElement(Fragment, { key: li },
      ...renderInline(line),
      li < lines.length - 1 ? createElement('br') : null,
    ),
  )
}

function renderInline(line: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index))
    if (m[1] != null) out.push(createElement('span', { className: 'mk-name', key: k++ }, m[1]))
    else out.push(createElement('em', { className: 'mk-em', key: k++ }, m[2]))
    last = m.index + m[0].length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}
