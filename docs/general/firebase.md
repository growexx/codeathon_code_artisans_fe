### Firebase Authentication

1. Firebase social authentication is implemented out of box in the boilerplate. To start using the feature, add `REACT_APP_FIREBASE_API_KEY`, `REACT_APP_FIREBASE_AUTH_DOMAIN`, `REACT_APP_FIREBASE_PROJECT_ID`, `REACT_APP_FIREBASE_STORAGE_BUCKET`, `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`, `REACT_APP_FIREBASE_APP_ID` fields in the env file and add respective values. 

2. To integrate firebase authentication with react app, `firebase` npm package is used.

3. Firebase helper util is already created in utils folder (app/utils/firebase.js). This file contains code for initialization and capturing of social clicks.

4. Firebase social login demo is added into login component. (app/containers/Auth/Login/index.js)

5. Saga file for login (app/containers/Auth/Login/saga.js) contains function calls for google and facebook.