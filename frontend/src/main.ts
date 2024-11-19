import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"123toebeans-d6f03","appId":"1:10600296290:web:ccff98c6130c4bb517c63b","storageBucket":"toebeans-d6f03.appspot.com","apiKey":"AIzaSyADxlQyq1u7g4LULCI9RfhKdheVkAOscoI","authDomain":"toebeans-d6f03.firebaseapp.com","messagingSenderId":"10600296290","measurementId":"G-J0JRTK8PVE"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()) // Provide routing globally
  ],
}).catch((err) => console.error(err));
