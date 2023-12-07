type UseMeteorCallHook = (
  name: string,
  params: object,
  cb: (error: object | undefined, result: any) => void
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
}
