import { Endereco } from './endereco';
import { Escolaridade } from './escolaridade';
import { Genero } from './genero';
import { Raca } from './raca';
import { Sexo } from './sexo';
import { Telefone } from './telefone';
import { Documento } from './documento';
import { Identificador } from './identificador';

export class Individuo {

        recId: string;
        indNome: string;
        indEmail: string;
        telefones: Telefone[];
        dataNascimento: Date;
        sexo: Sexo;
        genero: Genero;
        raca: Raca;
        escolaridade: Escolaridade;
        documentos: Documento[];
        identificadores: Identificador[];
        enderecos: Endereco[];

        public constructor(init?: Partial<Individuo>) {
            Object.assign(this, init);
        }
};
