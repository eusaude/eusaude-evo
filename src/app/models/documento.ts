import { TipoDocumento } from './tipoDocumento';

export class Documento{
    tipoDocId: TipoDocumento;
    indDocNumero: number;
    public constructor(init?: Partial<Documento>) {
        Object.assign(this, init);
    }
}
