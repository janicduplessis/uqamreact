var {
  Flummox,
  Store,
  Actions,
} = require('flummox');

class BaseStore extends Store {
  listen(fn) {
    this.addListener('change', fn);
  }

  unlisten(fn) {
    this.removeListener('change', fn);
  }
}

module.exports = {
  Flux: new Flummox(),
  Store: BaseStore,
  Actions: Actions,
};
