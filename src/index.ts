import {PluginOptions, SingleWorkspace} from 'sanity'

import {configureTranslate} from './translate'

export type SupportedLanguageType = 'de' | 'en' | 'ru' | 'fr' | 'es' | 'zh' | 'ar'

type I18nConfigProps = {
  config: SingleWorkspace
  locale: SupportedLanguageType
  resources: {
    [_ in SupportedLanguageType]?: PluginOptions[]
  }
}

/**
 * Enhances the given Sanity UI configuration with internationalization (i18n) resources.
 * @param {I18nConfigProps} props - The configuration props.
 * @param {SingleWorkspace} props.config - The Sanity UI configuration for a single workspace.
 * @param {SupportedLanguageType} props.locale - The locale to be used.
 * @param {{ [key in SupportedLanguageType]?: PluginOptions[]; }} props.resources - The i18n resources per locale.
 * @returns {SingleWorkspace} The updated Sanity UI configuration with i18n plugins added.
 * @throws {Error} Throws an error if no resources are found for the specified locale.
 */
export const withSanityUiI18n = ({config, locale, resources}: I18nConfigProps) => {
  const plugins: PluginOptions[] = []
  if (!Array.isArray(config.plugins)) {
    config.plugins = []
  }

  const localePlugins = resources[locale]
  if (!localePlugins) {
    throw new Error(`No studio resources found for locale ${locale}`)
  }

  localePlugins.forEach((resource) => {
    plugins.push(resource)
  })

  config.plugins.push(...plugins)

  return config
}

export {configureTranslate}
