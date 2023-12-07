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
const useMeteorCall = (name, params = {}, cb) => {
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
    if (typeof Meteor.callAsync === 'function') {
      try {
        const result = await Meteor.callAsync(name, params);
        setLoading(false);
        setResult(result);

        if (typeof cb === 'function') {
          cb(error, result);
        }
      } catch (error) {
        setError(error);
      }
    } 
    // Meteor 2.x
    else {
      Meteor.call(name, params, (error, result) => {
        setLoading(false);
        setError(error);
        setResult(result);

        if (typeof cb === 'function') {
          cb(error, result);
        }
      });
    }
  }, [name, params, cb]);

  return [methodHandler, loading, error, result];
};

export { useMeteorCall };
