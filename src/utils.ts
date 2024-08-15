import {SupportedLanguageType} from './types'

export function replaceWithVariable(str: string, variables: {[key: string]: string}): string {
  return str.replace(/{{\s*(\w+)\s*}}/g, (match, variableName) => {
    return variables[variableName] || match
  })
}

export function determineLocale(
  pathname: string,
  defaultLocale: SupportedLanguageType = 'de',
): SupportedLanguageType {
  const locales: SupportedLanguageType[] = ['en', 'ru', 'de', 'fr', 'es', 'zh']
  const firstSegment = pathname.split('/')[1] // The first segment is the locale e.g. /en, /ru, /de or / as default

  if (locales.includes(firstSegment as SupportedLanguageType)) {
    return firstSegment as SupportedLanguageType
  }

  return defaultLocale
}
