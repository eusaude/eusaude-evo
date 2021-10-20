
export class Escolaridade {

    recId: string;
    escolaridade: string;

    public constructor(init?: Partial<Escolaridade>) {
        Object.assign(this, init);
    }
}
