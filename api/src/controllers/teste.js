import { Server } from '../environment/server';

export class TesteController {
    @Server.get('/')
    async meuMethod() {
        return 'MAOE';
    }

    @Server.post('/')
    async nome({ params, body, user, query }) {

    }
}
