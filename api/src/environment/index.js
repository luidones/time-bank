import fs from 'fs';

const _singletons = new Map();
const _handlers = [];

const _instantiate = cls => {
    const dependencies = (cls.dependsOn || []).map(d => _instantiate(d));

    if (!_singletons.get(cls)) {
        const i = new (Function.prototype.bind.apply(cls, [cls, ...dependencies]));
        _singletons.set(cls, i);

        (cls.mocks || []).forEach(m => _singletons.set(m, i));
    }

    return _singletons.get(cls);
}

export class Application {
    constructor(...rootModules) {
        rootModules.forEach(_instantiate);
    }

    static async EmitEvent(event) {
        const handlers = _handlers.filter(h => event instanceof h.eventType);

        for (let handler of handlers) {
            if (handler.func)
                await handler.func(event);
            else {
                const instance = _singletons.get(handler.cls);
                if (instance instanceof handler.cls)
                    await handler.method.call(instance, event)
            }
        }
    }

    static GetInstance(type) {
        return _instantiate(type);
    }
}

export function Inject(...dependencies) {
    return function (elementDescriptor) {
        return {
            ...elementDescriptor,
            finisher: (_class) => {
                _class.dependsOn = _class.dependsOn || [];
                _class.dependsOn.push(...dependencies);
            }
        };
    };
};

export function Mocks(...types) {
    return function (elementDescriptor) {
        return {
            ...elementDescriptor,
            finisher: (_class) => {
                _class.mocks = _class.mocks || [];
                _class.mocks.push(...types);
            }
        };
    };
};

Inject.All = function (dir) {
    return function (elementDescriptor) {
        const files = fs.readdirSync(`${__dirname}/../${dir}`);

        return {
            ...elementDescriptor,
            finisher: (_class) => {
                _class.dependsOn = _class.dependsOn || [];

                files.reduce((prev, curr) => {
                    const module = require(`${__dirname}/../${dir}/${curr}`);

                    for (let i in module)
                        if (typeof(module[i]) === 'function')
                            prev.push(module[i]);

                    return prev;
                }, _class.dependsOn);
            }
        };
    };
}

export function Handle(eventType) {
    return function (elementDescriptor) {
        return {
            ...elementDescriptor,
            finisher: (_class) => {
                _handlers.push({
                    eventType: eventType,
                    cls: _class,
                    method: elementDescriptor.descriptor.value
                })
            }
        }
    }
};

Handle.with = function (eventType, func) {
    _handlers.push({
        eventType: eventType,
        func: func
    });
}
