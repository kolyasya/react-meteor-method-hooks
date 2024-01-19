# react-meteor-method-hooks

Updated to work with `Meteor.callAsync()` method.

Simple hook to handle `Meteor.callAsync()` or `Meteor.call()` requests.

Usage example:

```javascript
import React from 'react';
import { useMeteorCall } from 'react-meteor-method-hooks';

const MyComponent = () => {

  const [
    calculateSomething,
    calculateSomethingLoading,
    calculateSomethingError,
    calculateSomethingResult
  ] = useMeteorCall(
    'calculateSomethingMethodName',
    { methodParam: 'Test string' },
    (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        console.log(result);
      }
    },
    {
      /** Forces to use Meteor.call() instead of Meteor.callAsync() */
      forceSyncCall: true,
      /** Adds some logging in console */
      logging: true,
      /**
       * By default the package logs console.error for all incoming errors
       * The setting disables such logs
       */
      suppressErrorLogging: true
    }
  );

  return (
    <button
      onClick={calculateSomething}
      disabled={calculateSomethingLoading}
    >
      Calculate
    </button>

    <div className="error">{calculateSomethingError}</div>
    <div className="result">{calculateSomethingResult}</div>
  )
}
```
