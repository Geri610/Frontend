import { Address } from "./address";
import { Customer } from "./customer";
import { Parcel } from "./parcel";
import { ShipmentStatusEntry } from "./shipment-status-entry";
import { Status } from "./status";

export class Shipment {
    constructor(
        public id?: number,
        public senderAddress: Address = new Address(),
        public receiverAddress: Address = new Address(),
        public status?: String,
        public parcel?: Parcel,
        public price?: number,
        public trackingId?: string,
        public history: ShipmentStatusEntry[] = [],
        public customerId?: string,
        public url?: string,

    ) { }

    get senderFullAddress(): string {
        return `${this.senderAddress?.zip} ${this.senderAddress?.city}, ${this.senderAddress?.street} ${this.senderAddress?.houseNumber}`;
    }
    get receiverFullAddress(): string {
        return `${this.receiverAddress?.zip} ${this.receiverAddress?.city}, ${this.receiverAddress?.street} ${this.receiverAddress?.houseNumber}`;
    }
}
