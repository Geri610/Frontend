import { Routes } from '@angular/router';
import { Items } from './components/items/items';
import { AuthGuard } from './guards/auth-guard';
import { Item } from './shared/item';

export const routes: Routes = [
    { path: 'items', component: Items, canActivate: [AuthGuard]},
];