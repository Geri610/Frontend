import { Routes } from '@angular/router';
import { Items } from './components/items/items';
import { AuthGuard } from './guards/auth-guard';
import { Item } from './shared/item';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
    // 1. Automatisch zum Login leiten, wenn die App ohne Pfad aufgerufen wird
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // 2. Die Login-Seite registrieren
   { path: 'login', component: LoginComponent },

    // 3. Deine geschützte Items-Seite
    { path: 'items', component: Items, canActivate: [AuthGuard] },

    // 4. Fallback: Unbekannte URLs fangen und zum Login schicken
    { path: '**', redirectTo: 'login' }
];