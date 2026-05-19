import { Routes } from '@angular/router';
import { Items } from './components/items/items';
import { AuthGuard } from './guards/auth-guard';
import { CartComponent } from './components/cart/cart';
import { LoginComponent } from './components/login/login';
import { CheckoutComponent } from './components/checkout/checkout';
import { OrderSummaryComponent } from './components/order-summary/order-summary';
import { ProductSearch } from './components/search/search';

export const routes: Routes = [
    // 1. Automatisch zum Login leiten, wenn die App ohne Pfad aufgerufen wird
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // 2. Die Login-Seite registrieren
   { path: 'login', component: LoginComponent },

    // 3. Deine geschützte Items-Seite
    { path: 'items', component: Items, canActivate: [AuthGuard] },

        // 3. Deine geschützte Items-Seite
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },

            // 3. Deine geschützte Items-Seite
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

                // 3. Deine geschützte Items-Seite
    { path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard] },

    { path: 'product-search', component: ProductSearch, canActivate: [AuthGuard] },

    // 4. Fallback: Unbekannte URLs fangen und zum Login schicken
    { path: '**', redirectTo: 'login' }



    
];