import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { Roles } from '../model/roles';

@Inject(MainDatabase)
export class UsersSeed {
    constructor(db) {
        this.db = db;
    }

    async seed(banks) {
        const jose = await this.db.entities.user.create({
            firstName: 'José',
            lastName: 'Luiz',
            email: 'jose.luiz@domain.com',
            password: '$2a$10$qTagpCPdtiCA62YLdUU/hebY3ec782tiEO.Dpwv7xzVLc.93xeXhq',
            role: Roles.common
        });

        const joseAcc = await this.db.entities.account.create({
            bankId: banks.baixada.id,
            userId: jose.id,
        });

        const maria = await this.db.entities.user.create({
            firstName: 'Maria',
            lastName: 'Luiza',
            email: 'maria.luiza@domain.com',
            password: '$2a$10$qTagpCPdtiCA62YLdUU/hebY3ec782tiEO.Dpwv7xzVLc.93xeXhq',
            role: Roles.common
        });

        const mariaAcc = await this.db.entities.account.create({
            bankId: banks.baixada.id,
            userId: maria.id,
        });

        return {
            jose: jose.dataValues,
            joseAcc: joseAcc.dataValues,
            maria: maria.dataValues,
            mariaAcc: mariaAcc.dataValues
        }
    }
}
