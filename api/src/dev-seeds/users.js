import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { Roles } from '../model/roles';

@Inject(MainDatabase)
export class UsersSeed {
    constructor(db) {
        this.db = db;
    }

    async seed() {
        const admin = await this.db.entities.user.create({
            firstName: 'Administrator',
            lastName: '.',
            email: 'admin@blocks.com.br',
            password: '$2a$10$qTagpCPdtiCA62YLdUU/hebY3ec782tiEO.Dpwv7xzVLc.93xeXhq'
        });

        const kovacs = await this.db.entities.user.create({
            firstName: 'Walter',
            lastName: 'Kovacs',
            email: 'kovacs@blocks.com.br',
            password: '$2a$10$qTagpCPdtiCA62YLdUU/hebY3ec782tiEO.Dpwv7xzVLc.93xeXhq'
        });

        return {
            admin: admin.dataValues,
            kovacs: kovacs.dataValues
        }
    }
}
