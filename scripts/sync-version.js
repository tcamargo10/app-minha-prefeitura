#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script para sincronizar versões entre package.json e app.json
 * Uso: node scripts/sync-version.js [patch|minor|major]
 */

const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');
const APP_JSON_PATH = path.join(__dirname, '..', 'app.json');

function updateVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
  }
}

function syncVersions() {
  try {
    // Ler arquivos
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    const appJson = JSON.parse(fs.readFileSync(APP_JSON_PATH, 'utf8'));
    
    const currentVersion = packageJson.version;
    const appVersion = appJson.expo.version;
    
    console.log(`📦 Versão atual no package.json: ${currentVersion}`);
    console.log(`📱 Versão atual no app.json: ${appVersion}`);
    
    // Verificar se as versões estão sincronizadas
    if (currentVersion !== appVersion) {
      console.log('⚠️  Versões não estão sincronizadas!');
      console.log('🔄 Sincronizando versões...');
      
      // Usar a versão do package.json como referência
      appJson.expo.version = currentVersion;
      
      // Salvar app.json
      fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appJson, null, 2));
      
      console.log(`✅ Versão sincronizada: ${currentVersion}`);
    } else {
      console.log('✅ Versões já estão sincronizadas!');
    }
    
  } catch (error) {
    console.error('❌ Erro ao sincronizar versões:', error.message);
    process.exit(1);
  }
}

function bumpVersion(type) {
  try {
    // Ler package.json
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
    const appJson = JSON.parse(fs.readFileSync(APP_JSON_PATH, 'utf8'));
    
    const currentVersion = packageJson.version;
    const newVersion = updateVersion(currentVersion, type);
    
    console.log(`📦 Atualizando versão de ${currentVersion} para ${newVersion}`);
    
    // Atualizar package.json
    packageJson.version = newVersion;
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2));
    
    // Atualizar app.json
    appJson.expo.version = newVersion;
    fs.writeFileSync(APP_JSON_PATH, JSON.stringify(appJson, null, 2));
    
    console.log('✅ Versões atualizadas com sucesso!');
    console.log(`📦 package.json: ${newVersion}`);
    console.log(`📱 app.json: ${newVersion}`);
    
  } catch (error) {
    console.error('❌ Erro ao atualizar versões:', error.message);
    process.exit(1);
  }
}

// Executar script
const args = process.argv.slice(2);
const command = args[0];

if (command === 'sync') {
  syncVersions();
} else if (['patch', 'minor', 'major'].includes(command)) {
  bumpVersion(command);
} else {
  console.log('📋 Uso:');
  console.log('  node scripts/sync-version.js sync     - Sincronizar versões');
  console.log('  node scripts/sync-version.js patch    - Incrementar patch');
  console.log('  node scripts/sync-version.js minor    - Incrementar minor');
  console.log('  node scripts/sync-version.js major    - Incrementar major');
}
