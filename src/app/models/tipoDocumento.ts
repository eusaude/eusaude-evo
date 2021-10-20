export class TipoDocumento{
    recId: string;
    public constructor(init?: Partial<TipoDocumento>) {
        Object.assign(this, init);
    }
}
