import { Status } from "./status";

export class ShipmentStatusEntry {
    constructor(
        public timestamp: string,
        public status: Status,
        public info?: string
    ) { }
}
