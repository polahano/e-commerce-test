import { RenderMode, ServerRoute } from '@angular/ssr';
import { DetailsComponent } from './pages/container/details/details.component';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id', renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
