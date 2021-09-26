# react-meteor-hooks

Simple hook to handle `Meteor.call` requests.

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
    {},
    (error, result) => {
      if (error) {
        alert(error.reason);
      } else {
        console.log(result);
      }
    },
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
