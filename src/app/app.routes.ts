import { Routes } from '@angular/router';
import { Contacts } from './components/contacts/contacts';
import { AddShipment } from './components/add-shipment/add-shipment';
import { Label } from './components/label/label';
import { Price } from './components/price/price';
import { Tracking } from './components/tracking/tracking';
import { Notification } from './components/notification/notification';

export const routes: Routes = [
    { path: 'contacts', component: Contacts},
    { path: 'shipment', component: AddShipment},
    { path: 'label', component: Label},
    { path: 'price', component: Price},
    { path: 'tracking', component: Tracking},
    { path: 'notification', component: Notification}
];
