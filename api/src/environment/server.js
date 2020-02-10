import restify from 'restify';
import jwt from 'restify-jwt-community';
import corsMiddleware from 'restify-cors-middleware';

import { Application } from './index';
import { Roles } from '../model/roles';

let _server = null;
let _routes = [];

export class Server {
    constructor() {
        _server = restify.createServer();

        _server.use(restify.plugins.queryParser());
        _server.use(restify.plugins.bodyParser());

        const cors = corsMiddleware({
            origins: ['*'],
            allowHeaders: ['Authorization']
        });

        _server.pre(cors.preflight);
        _server.use(cors.actual);

        _server.use((req, res, next) => {
            req.clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            next();
        });

        const params = { secret: process.env.AUTH_SECRET };
        const unless = { path: [
            '/account/access',
            '/account/token',
            '/account/password',
            '/health-check'
        ]};
        // _server.use(jwt(params).unless(unless));

        _server.get('/health-check', (req, res, next) => {
            res.send(200, 'ok');
        });

        _server.on('uncaughtException', (req, res, route, error) => {
            console.log(error);
            res.send(500, 'internal-server-error');
        });

        _server.listen(process.env.SERVER_PORT, () => {
            console.log(`Listening... :${process.env.SERVER_PORT}`);
        });

        _routes.forEach(this.bindRoute);
    }

    bindRoute(params) {
        const authorize = (req, res, next) => {
            if (!params.handler._authorization || req.user.role === Roles.super)
                next();
            else if (!params.handler._authorization.includes(req.user.role))
                res.send(403, 'access-denied');
            else
                next();
        };

        _server[params.method](params.route, authorize, (req, res) => {
            const instance = Application.GetInstance(params.controller);

            params.handler.call(instance, req).then(result => {
                if (result) {
                    if (result instanceof Buffer)
                        res.send(200, result, {
                            "Content-Type": 'application/octet-stream',
                            "Content-Disposition": "attachment; filename=document"
                        });
                    else
                        res.send(200, result);
                }
                else
                    res.send(204);
            })
            .catch(error => {
                console.log(error);
                res.send(500, error);
            });
        });
    }

    static mapRoute(method, route) {
        return function (elementDescriptor) {
            return {
                ...elementDescriptor,
                finisher: (_class) => {
                    _routes.push({
                        method: method,
                        route: route,
                        handler: elementDescriptor.descriptor.value,
                        controller: _class
                    });
                }
            };
        }
    }

    static get(route) {
        return Server.mapRoute('get', route);
    }

    static post(route) {
        return Server.mapRoute('post', route);
    }

    static put(route) {
        return Server.mapRoute('put', route);
    }

    static del(route) {
        return Server.mapRoute('del', route);
    }
}

export class Authorize {
    static any(...roles) {
        return function (elementDescriptor) {
            return {
                ...elementDescriptor,
                finisher: (_class) => {
                    elementDescriptor.descriptor.value._authorization = roles;
                }
            }
        }
    }
}
