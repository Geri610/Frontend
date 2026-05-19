export class CustomerDto {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public address: string,
    ) { }
}