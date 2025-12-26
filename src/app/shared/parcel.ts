export class Parcel {
    constructor(
        public width?: number,
        public length?: number,
        public height?: number,
        public weight?: number
    ) { }
    public parcelIsComplete(): boolean {
        return !!this.weight && !!this.length && !!this.width && !!this.height
    }
}
