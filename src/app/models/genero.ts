export class Genero{
    recId: string;
    genero: string;
    public constructor(init?: Partial<Genero>) {
        Object.assign(this, init);
    }
}
