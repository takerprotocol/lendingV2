// eslint-disable-next-line @typescript-eslint/no-var-requires
const { useBabelRc, override } = require('customize-cra')

module.exports = override(useBabelRc())
