
export class Cidade {

    recId: string;
    lstCidDescricao: string;

    public constructor(init?: Partial<Cidade>) {
        Object.assign(this, init);
    }
};
