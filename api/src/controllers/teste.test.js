import { Application } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { UsersSeed } from '../dev-seeds/users';
import { TesteController } from '../controllers/teste';

require('dotenv').config();
new Application(MainDatabase, TesteController, UsersSeed);

describe('#TesteController', () => {
    const db = Application.GetInstance(MainDatabase);
    const controller = Application.GetInstance(TesteController);

    const usersSeed = Application.GetInstance(UsersSeed);

    let users;

    beforeAll(async() => {
        await db.sync({ force: true });
        users = await usersSeed.seed();
    });

    afterAll(async() => {
        await db.close();
    });

    describe('[GET] meuMethod', () => {
        it('Should return all users names from seed', async () => {
            const result = await controller.meuMethod();

            expect(result).toHaveLength(2);
            expect(result[0]).toBe(users.admin.name);
        });
    });
});
