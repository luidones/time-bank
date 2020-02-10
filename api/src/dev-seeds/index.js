import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { UsersSeed } from './users';

@Inject(MainDatabase, UsersSeed)
export class DevSeeds {
    constructor(db, users) {
        this.db = db;
        this.seeds = {
            users
        };

        this.sync()//.catch(error => { throw error });
    }

    async sync() {
        await this.db.sync({force: true});

        const users = await this.seeds.users.seed();

        console.log('DevSeed fully loaded!');
    }
}
