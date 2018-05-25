# Shitzu
An extremely helpful and tiny wrapper for the fetch api.

## Basic usage example

```
import Api from 'shitzu';

Api.setEndpoint('www.yourapi.com');

let call;

try {
  call = await Api.post('/auth/signup', {
    email: 'foo@bar.com',
    password: 'johndoe'
  });
  // Response body = { status: 'OK', data: 'YOUR-TOKEN' }
  Api.setHeaders( {
    Authorization: `Bearer ${call.data}`
  } );
  call = await Api.get('/users/me');
  // Response body = { status: 'OK', data: { email: 'foo@bar.com' } }
}
catch( ERR ){
  console.error( ERR );
}
```

## Setting custom headers

```
Api.setHeaders( {
  Authorization: 'Bearer [YOUR-TOKEN]',
  Accept: 'application/json'
} );
```

## Changing mode

```
Api.setMode('no-cors|cors|same-origin');
```