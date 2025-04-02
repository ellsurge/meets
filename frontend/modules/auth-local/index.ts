// Reexport the native module. On web, it will be resolved to AuthLocalModule.web.ts
// and on native platforms to AuthLocalModule.ts
export { default } from './src/AuthLocalModule';
export { default as AuthLocalView } from './src/AuthLocalView';
export * from  './src/AuthLocal.types';
