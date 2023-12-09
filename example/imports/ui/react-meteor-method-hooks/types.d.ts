type UseMeteorCallHook = (
  name: string,
  params: object,
  cb: (error: object | undefined, result: any) => void,
  hookParams?: {
    forceSyncCall?: boolean;
    logging?: boolean;
    suppressErrorLogging?: boolean;
  }
) => [
  methodHandler: () => Promise<any>,
  loading: boolean,
  error: object | undefined,
  result: any
];

type UseMeteorCallHookInitialState = {
  loading: boolean;
  error: object | undefined;
  result: any;
};
