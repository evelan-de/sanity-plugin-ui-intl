import {StructureBuilder} from 'sanity/structure'
import {ResourceKeys, Resources} from './types'
import {determineLocale, replaceWithVariable} from './utils'
import {SupportedLanguageType} from './types'

export const LOCALE_STORE_KEY = 'sanityStudio:ui:locale'

const translateWithoutStructureBuilder = <R extends ResourceKeys, N extends string>({
  namespace,
  resources,
  defaultLocale = 'de',
}: {
  resources: Resources
  namespace: N
  defaultLocale?: SupportedLanguageType
}) => {
  let locale: SupportedLanguageType = defaultLocale

  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    locale = determineLocale(path, defaultLocale)
  }

  return (key: R[typeof namespace], args?: {[key: string]: string}) => {
    const resource = resources[locale][namespace]

    if (args) {
      return replaceWithVariable(resource[key], args)
    }

    return resource[key] || key
  }
}

export const translate = <R extends ResourceKeys, N extends string>({
  S,
  namespace,
  resources,
  defaultLocale,
}: {
  S?: StructureBuilder
  namespace: N
  resources: Resources
  defaultLocale?: SupportedLanguageType
}) => {
  if (!S) {
    return translateWithoutStructureBuilder<R, N>({resources, namespace, defaultLocale})
  }

  const {t} = S.context.i18n

  return (key: R[typeof namespace], args?: Record<string, unknown>) =>
    t(`${namespace}:${String(key)}`, args)
}

/**
 *
 * Type R is the type of the resource keys aka the identifier of the resource e.g 'common.title'
 * Type N is the type of the namespace e.g 'schema' or 'structure'
 */
export const configureTranslate = <R extends ResourceKeys, N extends string>(
  customResources: Resources,
  defaultLocale?: SupportedLanguageType,
) => {
  return ({S, namespace}: {S?: StructureBuilder; namespace: N}) => {
    return translate<R, N>({
      S,
      namespace,
      resources: customResources,
      defaultLocale,
    })
  }
}
