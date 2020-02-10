import "@babel/polyfill";

import { Application } from './environment';
import { Server } from './environment/server';

import { TesteController } from './controllers/teste';

const boot = [
    // ENVIRONMENT
    Server,
    // CONTROLLERS
    TesteController
];

// if (process.env.NODE_ENV == 'development') {
//     // SEED
//     boot.push(DevSeed);
// }

const app = new Application(...boot);
