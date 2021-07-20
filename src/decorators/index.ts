export const InjectModel = (entity: Function) => (target: any, key: string) => {
  const sKey = Symbol(key);
  const get = () => {
    if (!target[sKey]) target[sKey] = entity;
    return target[sKey];
  };

  Object.defineProperty(target, key, {
    get,
  });
};
