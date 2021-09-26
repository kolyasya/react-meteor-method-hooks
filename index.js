import { useState, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  result: null,
};

const useMeteorCall = (name, params = {}, cb) => {
  if (!name) {
    console.error('Name is required for Meteor methods');
  }

  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [result, setResult] = useState(initialState.result);

  const methodHandler = useCallback(() => {
    setLoading(true);
    setError(initialState.error);
    setResult(initialState.result);

    Meteor.call(name, params, (error, result) => {
      setLoading(false);
      setError(error);
      setResult(result);

      if (typeof cb === 'function') {
        cb(error, result);
      }
    });
  }, [name, params, cb]);

  return [methodHandler, loading, error, result];
};

export { useMeteorCall };
