export class Identificador{
    identificador: string;
    public constructor(init?: Partial<Identificador>) {
        Object.assign(this, init);
    }
}
