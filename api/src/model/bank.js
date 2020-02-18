import Sequelize from 'sequelize';

export class Bank {
    identity = 'bank';

    attributes = {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    };

    associations = {
        hasMany: {
            account: { foreignKey: 'bankId', as: 'accounts' }
        }
    };
}
