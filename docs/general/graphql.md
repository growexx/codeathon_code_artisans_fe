### Graphql Setup

1. Graphql setup is implemented out of box in the boilerplate. To start using the feature, checkout in branch named `feature/11-GraphQL-Support`.

2. Create two env variables `REACT_APP_GRAPHQL_ENDPOINT` and `REACT_APP_WS_ENDPOINT` with appropriate value.

3. This branch is compatible with subscription setup of graphql, so to remove the usage of that delete app/graphql/websocket.js file and change link to http link in app/graphql/client.js.

4. Demo for graphql basic query, mutation and subscription is added into the example/GraphQL directory.

5. ChangePassword container contains demo of react final form with graphql. Instead of redux-form react-final-form can be used in such cases.

6. Test case example is also added. It uses ApiMocks folder.