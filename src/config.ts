let apiUrl: string
let wsUrl: string
const sensorsConfig = {
  serverUrl: 'https://sc-datasink.ffe390afd658c19dcbf707e0597b846d.de/sa?project=default',
  showLog: false,
}
const host = window.location.host
if (host.includes('.staging.')) {
  apiUrl = 'https://gameplus-web.staging.davionlabs.com/'
  wsUrl = 'wss://gameplus-web.qa.davionlabs.com/notify/webSocket'
} else if (host.includes('.qa.') || host.includes('localhost')) {
  apiUrl = 'https://gameplus-web.qa.davionlabs.com/'
  wsUrl = 'wss://gameplus-web.qa.davionlabs.com/notify/webSocket'
} else {
  apiUrl = '/'
  wsUrl = 'wss://gameplus-web.qa.davionlabs.com/notify/webSocket'
  sensorsConfig.serverUrl = 'https://sc-datasink.ffe390afd658c19dcbf707e0597b846d.de/sa?project=production'
  sensorsConfig.showLog = false
}

export { apiUrl, sensorsConfig, wsUrl }
