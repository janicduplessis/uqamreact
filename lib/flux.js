declare module flux {
  declare class Dispatcher<P> {
    register(callback: (payload: P) => void): string;
    unregister(id: string): void;
    waitFor(ids: Array<string>): void;
    dispatch(payload: P): void;
    isDispatching(): boolean;
  }
}
