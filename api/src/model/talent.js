import Sequelize from 'sequelize';

export class Talent {
    identity = 'talent';

    attributes = {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    };

    associations = {
        belongsTo: {
            user: { foreignKey: 'userId' }
        }
    };
}
