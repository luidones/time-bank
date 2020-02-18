import Sequelize from 'sequelize';

export class Transaction {
    identity = 'transaction';

    attributes = {
        originAccountId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        destinationAccountId: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        hours: {
            type: Sequelize.STRING(1000),
            allowNull: false
        }
    };

    hooks: {
        beforeSave: function(transaction) {
            transaction.hours = Math.floot(transaction.hours);
        }
    }
}
