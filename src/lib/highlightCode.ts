import { codeToHtml } from 'shiki';

export async function highlightCode(code: string, lang: string = 'plaintext'): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang,
      theme: 'nord',
    });
    return html;
  } catch (error) {
    console.error(`Failed to highlight code block with language ${lang}:`, error);
    // Return escaped code as fallback
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
