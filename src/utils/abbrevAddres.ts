export function abbrevAddress(address: string): string {
  return address ? address.replace(/(\w{4})\w*(\w{4})/, '$1...$2') : ''
}
export function liquidateAbbrevAddress(address: string): string {
  return address ? address.replace(/(\w{8})\w*(\w{4})/, '$1...$2') : ''
}
