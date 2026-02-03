export type Lang = 'en' | 'fr' | 'ar'

export const defaultLang: Lang = 'en'
export const languages: Lang[] = ['en', 'fr', 'ar']

export async function loadDictionary(lang: Lang) {
  switch (lang) {
    case 'fr': return (await import('../public/locales/fr/common.json')).default
    case 'ar': return (await import('../public/locales/ar/common.json')).default
    default: return (await import('../public/locales/en/common.json')).default
  }
}
