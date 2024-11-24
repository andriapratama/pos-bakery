import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'pos-bakery',
  webDir: 'dist/browser',
  bundledWebRuntime: false,
  android: {
    loggingBehavior: 'debug',
  },
};

export default config;
