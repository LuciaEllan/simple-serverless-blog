import marked from 'marked'
import hljs from 'highlight.js'

// https://marked.js.org/#/USING_PRO.md#renderer
const renderer = new marked.Renderer()
const doRenderCode = (code, lang) => lang ? hljs.highlight(lang, code, true).value : hljs.highlightAuto(code).value
renderer.code = (code, lang) => `<pre><code class="hljs ${lang || ''}">${doRenderCode(code, lang)}</code></pre>`
renderer.link = (href, title, text) => {
  if (title) return `<a href="${href}" title="${title}" target="_blank">${text}</a>`
  else return `<a href="${href}" target="_blank">${text}</a>`
}

const markedOptions = { renderer }
const customizedMarked = {
  process (markdown) {
    return marked(markdown, markedOptions)
  }
}

export default ({ Vue }) => {
  Vue.prototype.$marked = customizedMarked
}
