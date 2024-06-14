import { StructureBuilder } from 'sanity/structure';

export const LOCALE_STORE_KEY = 'sanityStudio:ui:locale';

export type SupportedLanguageType = 'de' | 'en' | 'ru';

type Resources = {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

type TranslateProps = {
  S?: StructureBuilder;
  namespace: 'structure' | 'schema';
};

function replaceWithVariable(
  str: string,
  variables: { [key: string]: string }
): string {
  return str.replace(/{{\s*(\w+)\s*}}/g, (match, variableName) => {
    return variables[variableName] || match;
  });
}

// ======================================================================================

// T is the same as ResourcesKeys[typeof namespace]

type NamespaceKeys = {
  schema: string;
  structure: string;
};

const translateWithoutStructureBuilder = <T extends NamespaceKeys>({
  namespace,
  resources,
}: {
  resources: Resources;
  namespace: 'structure' | 'schema';
}) => {
  let locale = 'en-EN';

  // Force english during development
  // const isProd = process.env.NODE_ENV === 'production';

  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    locale = path.includes('/en') ? 'en-EN' : 'de-DE';
  }

  return (key: T[typeof namespace], args?: { [key: string]: string }) => {
    const resource = resources[locale][namespace];

    if (args) {
      return replaceWithVariable(resource[key], args);
    }

    return resource[key] || key;
  };
};

export const translate = <T extends NamespaceKeys>({
  S,
  namespace,
  resources,
}: {
  S?: StructureBuilder;
  namespace: 'structure' | 'schema';
  resources: Resources;
}) => {
  if (!S) {
    return translateWithoutStructureBuilder<T>({ resources, namespace });
  }

  const { t } = S.context.i18n;

  return (key: T[typeof namespace], args?: Record<string, unknown>) =>
    t(`${namespace}:${String(key)}`, args);
};

export const configureTranslate = <T extends NamespaceKeys>(customResources: Resources) => {
  return ({
    S,
    namespace,
  }: {
    S?: StructureBuilder;
    namespace: 'structure' | 'schema';
  }) => {
    return translate<T>({
      S,
      namespace,
      resources: customResources,
    });
  };
};
