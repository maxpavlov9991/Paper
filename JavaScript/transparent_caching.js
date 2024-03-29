function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments);
    if (cache.has(key)) {
      return cache.get(key);
    }

    // .call for using object methods
    let result = func.call(this, ...arguments);

    cache.set(key, result);
    return result;
  };
}

// for multiple arguments
function hash() {
  return [].join.call(arguments);
}

someObj.someHeavyFunc = cachingDecorator(someObj.someHeavyFunc, hash);