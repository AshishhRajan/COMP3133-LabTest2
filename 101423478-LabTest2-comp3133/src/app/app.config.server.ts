import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// This file is dummy since we disabled SSR
const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering()
  ]
});

export const config = serverConfig;
