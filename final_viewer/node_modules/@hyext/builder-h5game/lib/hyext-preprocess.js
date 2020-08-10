/*
 * 必须在 head 后,  app script 前
 */

(function(document) {
  const getMetaContent = name => {
    try {
      return document.querySelector(`meta[name='${name}']`).getAttribute('content')
    } catch (err) {
      return ''
    }
  }

  const designWidth = getMetaContent('hyext-design-width')
  const extType = getMetaContent('hyext-type')
  const platform = getMetaContent('hyext-platform')

  window.__os = platform
  window.__HYEXT_DESIGN_WIDTH = designWidth
  window.__HYEXT_TYPE = extType
  window.__HYEXT_PLATFORM = platform
})(document)
