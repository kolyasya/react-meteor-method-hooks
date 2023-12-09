import React, { useEffect } from 'react';

import { useMeteorCall } from './react-meteor-method-hooks/useMeteorCall';

export const App = () => {
  const [
    methodWithResult,
    methodWithResultLoading,
    methodWithResultError,
    methodWithResultResult,
  ] = useMeteorCall(
    'methodWithResult',
    { param: 'This is param' },
    (error, result) => {
      console.log('methodWithResult callback', { error, result });
    }, {
      forceSyncCall: false,
      logging: false,
      suppressErrorLogging: false
    }
  );

  const [
    methodWithError,
    methodWithErrorLoading,
    methodWithErrorError,
    methodWithErrorResult,
  ] = useMeteorCall('methodWithError', {}, (error, result) => {
    console.log('methodWithError callback', { error, result });
  }, {
    forceSyncCall: true,
    logging: true,
    suppressErrorLogging: true
  });

  useEffect(() => {
    methodWithResult();
    methodWithError();
  }, []);

  useEffect(() => {
    console.log({
      methodWithResultLoading,
      methodWithResultError,
      methodWithResultResult,
      methodWithErrorLoading,
      methodWithErrorError,
      methodWithErrorResult,
    });
  }, [
    methodWithResultLoading,
    methodWithResultError,
    methodWithResultResult,
    methodWithErrorLoading,
    methodWithErrorError,
    methodWithErrorResult,
  ]);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h4>methodWithResult</h4>
        <pre>
          {JSON.stringify(
            {
              methodWithResultLoading,
              methodWithResultError,
              methodWithResultResult,
            },
            undefined,
            2
          )}
        </pre>
      </div>
      <div>
        <h4>methodWithError</h4>
        <pre>
          {JSON.stringify(
            {
              methodWithErrorLoading,
              methodWithErrorError,
              methodWithErrorResult,
            },
            undefined,
            2
          )}
        </pre>
      </div>
    </div>
  );
};
