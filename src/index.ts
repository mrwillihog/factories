const factories = new Map();

const executeFunctions = (object: Object) => {
  const result = {};

  Object.getOwnPropertyNames(object).forEach((property) => {
    let value = object[property];
    if (value instanceof Function) {
      value = value();
    }
    result[property] = value;
  });

  return result;
}

export function register(name: string, object: Object) {
  factories.set(name, object);
};

export function build(name: string, overrides = {}) {
  const factory = factories.get(name);
  const result = executeFunctions(factory);
  const processedOverrides = executeFunctions(overrides);

  return Object.assign({}, result, processedOverrides);
}
