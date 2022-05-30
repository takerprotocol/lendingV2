import Mock from 'mockjs'

const mock = {
  banner: Mock.mock('http://10.26.4.123:8080/api/v1/igo/banner', 'get', require('./banner.json')),
  onprogress: Mock.mock('http://10.26.4.123:8080/api/v1/igo/onprogress', 'get', require('./onprogress.json')),
  completed: Mock.mock('http://10.26.4.123:8080/api/v1/igo/completed', 'get', require('./completed.json')),
  upcoming: Mock.mock('http://10.26.4.123:8080/api/v1/igo/upcoming', 'get', require('./upcoming.json')),
  now: Mock.mock('http://10.26.4.123:8080/api/v1/igo/now', 'get', require('./now.json')),
  info: Mock.mock(RegExp('http://10.26.4.123:8080/api/v1/igo/info/.*'), 'get', require('./info.json')),
  tokens: Mock.mock(RegExp('http://10.26.4.123:8080/api/v1/igo/toekns.*'), 'get', require('./tokens.json')),
}
export default mock
