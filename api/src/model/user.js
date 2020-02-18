import Sequelize from 'sequelize';
import { Roles } from './roles';

export class User {
    identity = 'user';

    attributes = {
        firstName: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(150),
            unique: true
        },
        password: {
            type: Sequelize.STRING(60),
            allowNull: false
        },
        faults: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isIn: [Object.values(Roles)]
            }
        },
        fullName: {
            type: Sequelize.VIRTUAL(Sequelize.STRING(101)),
            get: function() {
                return `${this.get('firstName')} ${this.get('lastName')}`;
            }
        }
    };

    associations = {
        hasMany: {
            account: { foreignKey: 'userId', as: 'accounts' }
        }
    };

    methods = {
        addFault: async function () {
            this.faults = this.faults + 1;

            if (this.faults > process.env.AUTH_FAULTS_LIMIT)
                this.active = false;

            return this.save();
        }
    };

    queries = {
        findActive: async function (db, params) {
            if (!params) params = {};
            if (!params.where) params.where = {};

            params.where.active = true;

            const user = await this.findOne(params);

            if (!user)
                throw 'user-not-found';

            return user;
        }
    };
}
