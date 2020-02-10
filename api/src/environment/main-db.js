import Sequelize from 'sequelize';
import { Inject } from './index';

Sequelize.postgres.DECIMAL.parse = function (value) { return parseFloat(value); };

const operatorsAliases = {
    $eq: Sequelize.Op.eq,
    $ne: Sequelize.Op.ne,
    $gte: Sequelize.Op.gte,
    $gt: Sequelize.Op.gt,
    $lte: Sequelize.Op.lte,
    $lt: Sequelize.Op.lt,
    $not: Sequelize.Op.not,
    $in: Sequelize.Op.in,
    $notIn: Sequelize.Op.notIn,
    $is: Sequelize.Op.is,
    $like: Sequelize.Op.like,
    $notLike: Sequelize.Op.notLike,
    $iLike: Sequelize.Op.iLike,
    $notILike: Sequelize.Op.notILike,
    $regexp: Sequelize.Op.regexp,
    $notRegexp: Sequelize.Op.notRegexp,
    $iRegexp: Sequelize.Op.iRegexp,
    $notIRegexp: Sequelize.Op.notIRegexp,
    $between: Sequelize.Op.between,
    $notBetween: Sequelize.Op.notBetween,
    $overlap: Sequelize.Op.overlap,
    $contains: Sequelize.Op.contains,
    $contained: Sequelize.Op.contained,
    $adjacent: Sequelize.Op.adjacent,
    $strictLeft: Sequelize.Op.strictLeft,
    $strictRight: Sequelize.Op.strictRight,
    $noExtendRight: Sequelize.Op.noExtendRight,
    $noExtendLeft: Sequelize.Op.noExtendLeft,
    $and: Sequelize.Op.and,
    $or: Sequelize.Op.or,
    $any: Sequelize.Op.any,
    $all: Sequelize.Op.all,
    $values: Sequelize.Op.values,
    $col: Sequelize.Op.col
};

let db = null;

@Inject.All('model')
export class MainDatabase {
    entities = {};

    constructor(...entities) {
        db = new Sequelize(process.env.MAIN_DB_CONNECTION, {
            logging: false,
            operatorsAliases
        });

        entities.forEach(i => {
            const options = {};

            if (i.validations)
                options.validate = i.validations;

            this.entities[i.identity] = db.define(i.identity, i.attributes, options);
        });

        entities.forEach(i => {
            for (let type in i.associations) {
                let association = i.associations[type];

                for (let entityName in association) {
                    let entity = this.entities[entityName];
                    let options = association[entityName];

                    if (options && options.through)
                        options.through = this.entities[options.through] || options.through;

                    this.entities[i.identity][type](entity, options);
                }
            }

            for (let method in i.methods)
                this.entities[i.identity].prototype[method] = i.methods[method];

            for (let query in i.queries)
                this.entities[i.identity][query] = i.queries[query].bind(this.entities[i.identity], this);

            for (let hook in i.hooks)
                this.entities[i.identity].addHook(hook, i.hooks[hook]);
        });

        db.authenticate().catch(error => {
            throw error;
        });
    }

    sync(options) {
        return db.sync(options);
    }
}
