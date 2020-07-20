jest.mock('dexie', () => {
  return class Dexie {
    open = () => Promise.resolve();

    // eslint-disable-next-line class-methods-use-this
    version() {
      return {
        stores: jest.fn(),
      };
    }
  };
});

export {};
