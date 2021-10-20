export class Sexo{
    recId: string;
    sexo: string;
    public constructor(init?: Partial<Sexo>) {
        Object.assign(this, init);
    }
}
