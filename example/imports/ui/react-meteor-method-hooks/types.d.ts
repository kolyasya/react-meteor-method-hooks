export type UseMeteorCallHook = (
  name: string,
  params?: any[] | object,
  cb?: (error: object | undefined, result: any) => void,
  hookParams?: {
    /** Forces to use Meteor.call() instead of Meteor.callAsync() */
    forceSyncCall?: boolean;
    /** Adds some logging in console */
    logging?: boolean;
    /**
     * By default the package logs console.error for all incoming errors
     * The setting disables such logs
     */
    suppressErrorLogging?: boolean;
  }
) => [
  methodHandler: (...params: any[]) => Promise<any>,
  loading: boolean,
  error: object | undefined,
  result: any
];

export type UseMeteorCallHookInitialState = {
  loading: boolean;
  error: object | undefined;
  result: any;
};
