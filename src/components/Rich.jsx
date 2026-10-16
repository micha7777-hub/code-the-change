/**
 * Tiny inline markup for content strings:
 *   *word*   → italic serif accent   (headings)
 *   **word** → bold blue emphasis    (paragraphs)
 */
export default function Rich({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean)
  return parts.map((p, i) => {
    if (p.startsWith('**')) return <strong className="hl" key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*')) return <em className="accent-serif" key={i}>{p.slice(1, -1)}</em>
    return <span key={i}>{p}</span>
  })
}
