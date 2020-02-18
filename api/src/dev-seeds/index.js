import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { BanksSeed } from './banks';
import { UsersSeed } from './users';

@Inject(MainDatabase, BanksSeed, UsersSeed)
export class DevSeeds {
    constructor(db, banks, users) {
        this.db = db;
        this.seeds = {
            banks,
            users
        };

        this.sync()//.catch(error => { throw error });
    }

    async sync() {
        await this.db.sync({force: true});

        const banks = await this.seeds.banks.seed();
        const users = await this.seeds.users.seed(banks);

        console.log('DevSeed fully loaded!');
    }
}
