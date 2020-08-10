/*
 * 必须在 head 后,  app script 前
 */

(function (document) {
  function getMetaContent(name) {
    try {
      return document.querySelector(`meta[name='${name}']`).getAttribute('content')
    } catch (err) {
      return ''
    }
  }

  var designWidth = getMetaContent('ext-design-width')
  var extType = getMetaContent('ext-type')
  var platform = getMetaContent('ext-platform')
  var extUuid = getMetaContent('ext-uuid')
  var extName = getMetaContent('ext-name')
  var extVersion = getMetaContent('ext-version')
  var extVersionId = getMetaContent('ext-version-id')
  var sentryDsn = getMetaContent('ext-sentry-dsn')

  window.__os = platform
  window.__HYEXT_TYPE = extType
  window.__HYEXT_DESIGN_WIDTH = designWidth
  window.__HYEXT_PLATFORM = platform
  window.__HYEXT_UUID = extUuid
  window.__HYEXT_NAME = extName
  window.__HYEXT_VERSION = extVersion
  window.__HYEXT_VERSION_ID = extVersionId

  function setupSentry(env) {
    if (!extUuid || !extVersion || !extVersionId) {
      // 没有这几个数据, 说明可能 1. 是开发版本的 2. 非正常渠道构建的(比如hyui doc)
      // 不需要接入 sentry
      return
    }

    if (!window.Sentry) {
      return
    }

    window.Sentry.init({
      dsn: sentryDsn,
      environment: env
    })
    window.Sentry.setTag('ext-type', extType)
    window.Sentry.setTag('ext-uuid', extUuid)
    window.Sentry.setTag('ext-name', extName)
    window.Sentry.setTag('ext-version', extVersion)
    window.Sentry.setTag('ext-version-id', extVersionId)
  }

  try {
    window.hyExt.env.getExtInfo()
      .then(extInfo => {
        var environment = ['unuse', 'dev', 'test', 'prod'][parseInt(extInfo.extVersionType, 10)]
        setupSentry(environment)
      })
      .catch(() => {
        setupSentry('unknown')
      })
  } catch (er) {
    setupSentry('unknown')
  }
})(document)
