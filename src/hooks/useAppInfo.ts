import Constants from 'expo-constants';

export interface AppInfo {
  name: string;
  version: string;
  description: string;
  developer: string;
  contact: string;
  website: string;
  buildNumber?: string;
  bundleIdentifier?: string;
}

export const useAppInfo = (): AppInfo => {
  const expoConfig = Constants.expoConfig;
  
  return {
    name: expoConfig?.name || 'Minha Cidade',
    version: expoConfig?.version || '1.0.0',
    description: 'Aplicativo oficial da prefeitura para facilitar o acesso aos serviços municipais.',
    developer: 'Prefeitura Municipal',
    contact: 'contato@prefeitura.gov.br',
    website: 'https://www.prefeitura.gov.br',
    buildNumber: expoConfig?.android?.versionCode?.toString() || expoConfig?.ios?.buildNumber,
    bundleIdentifier: expoConfig?.android?.package || expoConfig?.ios?.bundleIdentifier,
  };
};
