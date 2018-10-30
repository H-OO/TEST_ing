/**
 * 帮助 TypeScript 判断传入的参数类型是否正确
 * 注意：环境模块声明无法指定相对模块名 -> declare module '../'; // error
 */
declare module '*.svg';
declare module 'react-keeper'  {
  export function Link (): any;
  export function CacheLink (): any;
}
declare module 'better-scroll';
