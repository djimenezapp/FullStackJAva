import { bootstrapApplication } from '@angular/platform-browser';
import { UsuariosComponent } from './app/components/usuarios/usuarios.component';
import { appConfig } from './app/app.config';

bootstrapApplication(UsuariosComponent, appConfig)
  .catch(err => console.error(err));