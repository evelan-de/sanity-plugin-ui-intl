import {SupportedLanguageType} from './types'

export function replaceWithVariable(str: string, variables: {[key: string]: string}): string {
  return str.replace(/{{\s*(\w+)\s*}}/g, (match, variableName) => {
    return variables[variableName] || match
  })
}

export function determineLocale(pathname: string, defaultLocale: SupportedLanguageType = 'de') {
  const path = pathname.split('/')
  let locale = defaultLocale
  if (path.includes('en')) {
    locale = 'en'
  } else if (path.includes('ru')) {
    locale = 'ru'
  }
  return locale
}
