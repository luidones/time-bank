import Sequelize from 'sequelize';

export class Review {
    identity = 'review';

    attributes = {
        talentId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        reviewerId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        notes: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3, 4, 5]]
            }
        }
    };

    associations = {
        belongsTo: {
            user: { as: 'reviewer', foreignKey: 'reviewerId' }
        }
    };
}
