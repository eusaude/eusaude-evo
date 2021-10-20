import { Cidade } from './cidade';
import { Estado } from './estado';

export class Endereco {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: number;

    public constructor(init?: Partial<Endereco>) {
        Object.assign(this, init);
    }
}
