import marked from 'marked'
import hljs from 'highlight.js'

const renderer = new marked.Renderer()
const doRenderCode = (code, lang) => lang ? hljs.highlight(lang, code, true).value : hljs.highlightAuto(code).value
renderer.code = (code, lang) => `<pre><code class="hljs ${lang || ''}">${doRenderCode(code, lang)}</code></pre>`
const markedOptions = { renderer }
const customizedMarked = {
  process (markdown) {
    return marked(markdown, markedOptions)
  }
}

export default ({ Vue }) => {
  Vue.prototype.$marked = customizedMarked
}
