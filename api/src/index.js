import "@babel/polyfill";

import { Application } from './environment';
import { MainDatabase } from './environment/main-db';
import { Server } from './environment/server';

import { TesteController } from './controllers/teste';

import { DevSeeds } from './dev-seeds';

const boot = [
    // ENVIRONMENT
    Server,
    MainDatabase,
    // CONTROLLERS
    TesteController
];

if (process.env.NODE_ENV == 'development') {
    // SEED
    boot.push(DevSeeds);
}

const app = new Application(...boot);
