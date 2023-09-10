### Role Based Access

1.  `app/containers/app/RoleMiddleWare.js` file is designed to get role from backend on accessing role based route.
2.  For making a route protected based on role you need to update roles and routes in constant at `app/containers/constants.js`. This file contains following variables which are used in role based page access

```
/**
* Roles for system
* ACL from frontend
* This configuration is being used in RoleMiddleware
*/
// Note: Define role in this constant
export  const  ROLES = {
	USER:  1,
	ADMIN:  10,
};

// Note: Add Routes which needs to check role before it's access
export  const  RESTRICTED_ROUTES = [
	ROUTES.PROFILE, ROUTES.TEST_ADMIN_PAGE
];

// Note: Define role against all accessible routes
 export  const  ROLE_BASED_ROUTE_ACCESS = {
	[ROLES.USER]: [ROUTES.PROFILE],
	[ROLES.ADMIN]: [ROUTES.TEST_ADMIN_PAGE],
};

// Note: Role based default routes for redirection
export  const  ROLE_BASED_DEFAULT_ROUTE = {
    [ROLES.USER]:  ROUTES.HOME,
};

/**
* Controls which sidebar entries shown to this user
*/

// Sidebar role based update
export  const  ROLE_BASED_SIDEBAR_MENU = {
  [ROLES.USER]: [],
	[ROLES.ADMIN]: [ROUTES.TEST_ADMIN_PAGE],
};
```

### Sidebar Role Constants

1. If sidebar needs to be role based pass **user** prop in `app/components/MainLayout/index.js` sidebar component path. That will automatically start filtering of sidebar routes based on role
2. If role based side bar is not needed then remove that **user** Prop and in sidebar component remove **GET_FILTERED_MENU_ITEM** and directly use **MENU_ITEM**
