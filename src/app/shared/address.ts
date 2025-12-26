export class Address {
    constructor(
        public street?: string,
        public houseNumber?: string,
        public zip?: number,
        public city?: string,
        public name?: string,
        public country?: string
    ) { }

    public addressIsComplete(): boolean {
        return !!this.street && !!this.houseNumber && !!this.zip && !!this.city && !!this.name && !!this.country;
    }

}
