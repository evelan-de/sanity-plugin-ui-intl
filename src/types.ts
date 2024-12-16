export type SupportedLanguageType = 'de' | 'en' | 'ru' | 'fr' | 'es' | 'zh' | 'ar'

export type Resources = {
  [key: string]: {
    [key: string]: {
      [key: string]: string
    }
  }
}

export type ResourceKeys = {
  [key: string]: string
}
