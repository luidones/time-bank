import Sequelize from 'sequelize';

export class Account {
    identity = 'account';

    attributes = {
        bankId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    };
}
