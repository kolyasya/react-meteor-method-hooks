import { Meteor } from 'meteor/meteor';
import { useState, useCallback } from 'react';

/// <reference path="./types.d.ts" />

/** @type {UseMeteorCallHookInitialState} */
const initialState = {
  loading: false,
  error: undefined,
  result: undefined,
};

/** @type {UseMeteorCallHook} */
const useMeteorCall = (
  name,
  params = {},
  cb,
  { forceSyncCall = false, logging = false, suppressErrorLogging = false } = {}
) => {
  if (!Meteor) {
    return console.error(
      `This package only works in Meteor environment. Check https://www.meteor.com/`
    );
  }

  if (!name) {
    console.error('Name is required to call Meteor method');
  }

  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [result, setResult] = useState(initialState.result);

  const methodHandler = useCallback(async () => {
    setLoading(true);
    setError(initialState.error);
    setResult(initialState.result);

    // Meteor 3.0
    if (typeof Meteor.callAsync === 'function' && !forceSyncCall) {
      try {
        if (logging) {
          console.log(
            `Method ${name} call with a new API (Meteor.callAsync), params:`
          );
          console.log(JSON.stringify(params, undefined, 2));
        }

        const result = await Meteor.callAsync(name, params);
        setLoading(false);
        setResult(result);

        if (logging) {
          console.log(`Method ${name} result received:`);
          console.log(JSON.stringify(result, undefined, 2));
        }

        if (typeof cb === 'function') {
          logging && console.log(`Method ${name} running a callback...`);
          cb(error, result);
        }
      } catch (error) {
        if (logging) {
          console.log(`Method ${name} error:`);
          console.log(JSON.stringify(error, undefined, 2));
        }

        if (!suppressErrorLogging) {
          console.error(error);
        }

        setError(error);
      }
    }
    // Meteor 2.x
    else {
      if (logging) {
        console.log(
          `Method ${name} call with an old API (Meteor.call), params:`
        );
        console.log(JSON.stringify(params, undefined, 2));
      }
      Meteor.call(name, params, (error, result) => {
        setLoading(false);
        setError(error);
        setResult(result);

        if (error && !suppressErrorLogging) {
          console.error(error);
        }

        if (logging) {
          if (!error) {
            console.log(`Method ${name} result received:`);
            console.log(JSON.stringify(result, undefined, 2));
          } else {
            console.log(`Method ${name} error:`);
            console.log(JSON.stringify(error, undefined, 2));
          }
        }

        if (typeof cb === 'function') {
          logging && console.log(`Method ${name} running a callback...`);
          cb(error, result);
        }
      });
    }
  }, [name, params, cb]);

  return [methodHandler, loading, error, result];
};

export { useMeteorCall };
