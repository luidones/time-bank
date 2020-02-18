import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';

@Inject(MainDatabase)
export class BanksSeed {
    constructor(db) {
        this.db = db;
    }

    async seed() {
        const baixada = await this.db.entities.bank.create({
            name: 'Banco do Tempo da Baixada Santista'
        });

        return {
            baixada: baixada.dataValues
        }
    }
}
