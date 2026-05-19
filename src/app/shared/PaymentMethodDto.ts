export class PaymentMethodDto {
    constructor(
        public id: number,
        public provider: string,
        public data: string
    ) { }
}