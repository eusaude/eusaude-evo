export class Telefone{
    telefone: string;
    public constructor(init?: Partial<Telefone>) {
        Object.assign(this, init);
    }
}
