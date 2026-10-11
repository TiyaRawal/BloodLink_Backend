let cache = {};

let SetCache = (key, data) => {
  cache[key] = data;
};

let GetCache = (key) => {
  return cache[key];
};

let DeleteCache = (key) => {
  delete cache[key];
};

module.exports = {SetCache, GetCache, DeleteCache};