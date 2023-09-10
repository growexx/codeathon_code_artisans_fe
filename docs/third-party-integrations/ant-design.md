# **Setup ant design library**

1. npm install antd
2. Update babel.config.js with antd library.

> Note: Edit default plugins array and add following code.

```
    ['import', { libraryName: 'antd', style: true }],
   ```
> Note: **true** here indicates importing less version of antd.

3. Update babel.config.js with styless package which allows less variables to be used in styled component.

> Note: Edit default plugins array and add following code.


   ```
    [
        'styless',
        {
            import: './app/styles/antDefaultVars.less',
            lessOptions: {
            javascriptEnabled: true,
            },
        },
    ],
   ```
> Note: Options array here imports our ant default theme variables file in app's every file.
> This entry in the Plugins array should come before **styled-components** entry.

4. Create less file overriding ant default theme variables.

> Currently created one: app/styles/antDefaultVars.less.
> This file should import default.less file of ant design with **@import url('~antd/lib/style/themes/default.less');** .
>For overriding variables, just create variables with same name as declared in default.less file of ant design. 
>> We can only override variables which are declared in default.less file of ant design.

```
    @primary-color: #4d186e;
    @primary-hover: #3E1358;
    @blue-base: #4d186e;
   ```

5. Update webpack.base.babel.js file 

```
    const fs = require('fs');
    const lessToJs = require('less-vars-to-js');
    const themeVariables = lessToJs(
        fs.readFileSync(
        path.join(__dirname, '../../app/styles/antDefaultVars.less'),
        'utf8',
        ),
    );
   ```
Less Loader config.
```
    {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables,
            },
          },
        ],
      },
   ```

> We are using styles of ant design library and can be found in default.less file.

[Default variables file of ant design](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)
