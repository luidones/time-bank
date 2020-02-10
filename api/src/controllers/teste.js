import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { Server } from '../environment/server';

@Inject(MainDatabase)
export class TesteController {
    constructor(db) {
        this.db = db;
    }

    @Server.get('/')
    async meuMethod() {
        const users = await this.db.entities.user.findAll();

        return users.map(u => u.fullName);
    }

    @Server.post('/')
    async nome({ params, body, user, query }) {

    }
}
