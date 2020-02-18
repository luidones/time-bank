import { Inject } from '../environment';
import { MainDatabase } from '../environment/main-db';
import { Roles } from '../model/roles';

@Inject(MainDatabase)
export class TalentsSeed {
    constructor(db) {
        this.db = db;
    }

    async seed(users) {
        const talents = await Promise.all([
            this.db.entities.talent.create({
                userId: users.jose.id,
                title: 'Aulas de Inglês',
                description: 'Aula particular de línigua inglesa (conversação, ortografia ou gramática).'
            }),
            this.db.entities.talent.create({
                userId: users.maria.id,
                title: 'Massoterapia',
                description: 'Sessão de massoterapia. Possuo maca móvel e o atendimento pode ser na casa do requerente.'
            })
        ]);

        return talents.map(t => t.dataValues);
    }
}
