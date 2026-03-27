import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes)   // 🔥 ESTA LÍNEA FALTABA
  ]
};