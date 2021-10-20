export class Raca{
    recId: string;
    raca: string;
    public constructor(init?: Partial<Raca>) {
        Object.assign(this, init);
    }
}
