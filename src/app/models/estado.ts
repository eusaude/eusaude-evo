
export class Estado {

    recId: string;
    nome: string;
    sigla: string;

    public constructor(init?: Partial<Estado>) {
        Object.assign(this, init);
    }
};
