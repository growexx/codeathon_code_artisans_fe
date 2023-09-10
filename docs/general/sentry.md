### Sentry Setup steps

1. Sentry setup is implemented out of box in the boilerplate. To start using the feature, checkout in branch named `feature/Sentry-setup`.

2. Visit the link: https://docs.sentry.io/product/sentry-basics/integrate-frontend/create-new-project/?original_referrer=https%3A%2F%2Fwww.google.com%2F

3. Register/Login with credentials used for sentry setup for project.

4. Create Project selecting technology (In our case: React).

5. Go to project settings to get the DSN url and Add it in.env file of the project.

6. Create a env variable `SENTRY` with appropriate Sentry DSN Endpoint value.
