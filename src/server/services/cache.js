// @todo replace in-memory store with redis
const store = {};

const expired = entry => entry.expiry < Date.now();

module.exports = ({
  get (key, defaultValue = null) {
    if (!store.hasOwnProperty(key) || expired(store[key])) {
      return defaultValue;
    }
    return store[key].value;
  },
  set (key, value, expiry = Infinity) {
    store[key] = {value, expiry: Date.now() + expiry};
  },
  has (key) {
    return store.hasOwnProperty(key) && !expired(store[key]);
  },
});
