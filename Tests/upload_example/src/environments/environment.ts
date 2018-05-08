// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC35sA7CVPczbN6GOnwUBnnx2ldnlmP3dw",
    authDomain: "scientistscompetition.firebaseapp.com",
    databaseURL: "https://scientistscompetition.firebaseio.com",
    projectId: "scientistscompetition",
    storageBucket: "scientistscompetition.appspot.com",
    messagingSenderId: "66229167207"
  }
};

