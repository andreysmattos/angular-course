import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import { environments } from './environments/environments';

firebase.initializeApp(environments.firebase);

let appInit = false;

firebase.auth().onAuthStateChanged(() => {

  if (appInit) return;
  
  appInit = true;
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
});


