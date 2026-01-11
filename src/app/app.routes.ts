import { Routes } from '@angular/router';
import { Contacts } from './components/contacts/contacts';
import { AddShipment } from './components/add-shipment/add-shipment';
import { Label } from './components/label/label';
import { Price } from './components/price/price';
import { Tracking } from './components/tracking/tracking';
import { Notification } from './components/notification/notification';
import { StatisticsComponent } from './components/stats/stats';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'contacts', component: Contacts, canActivate: [AuthGuard]},
    { path: 'shipment', component: AddShipment, canActivate: [AuthGuard]},
    { path: 'label', component: Label, canActivate: [AuthGuard]},
    { path: 'price', component: Price},
    { path: 'tracking', component: Tracking},
    { path: 'notification', component: Notification, canActivate: [AuthGuard]},
    { path: 'Statistics', component: StatisticsComponent, canActivate: [AuthGuard]}
];