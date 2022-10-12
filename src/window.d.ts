import { Config } from './types/config';

declare global {
  interface Window {
    __env__: Config;
  }
}

window.__env__ = window.__env__ || {};
