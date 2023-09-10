# Folder Structure

Storybook creates three folders for it's use.

1. .storybook
- This folder contains configuration files for storybook according to our preference. We can specify addOns and decorators for global story configuration, webpack config for storybook, themes and other custom settings like where to find stories in the project etc here in this folder.


2. stories
- Storybook setup gives example stories for our reference and these stories are placed here in this folder. 


3. storybook-static
- This folder gets created when we run storybook build command `build-storybook`. It stores chunk folders and files for it's internal usage. 

> Note: Current setup is configured to detect stories which are placed in stories folder and have
> fileName for the story as componentName.stories.(js|jsx|ts|tsx)

Learn more about Storybook folders and config files at: [Storybook Config](https://storybook.js.org/docs/react/configure/overview)

# Command Line Commands

### Development

```Shell
npm run storybook
```

Builds and starts the development server for storybook at 
`localhost:6006`. Changes in the storybook files will be hot-reloaded.


## Building

```Shell
npm run build-storybook
```

Preps our storybook components for deployment.Optimizes and minifies all files, piping them to the `storybook-static` folder.

> Note: Storybook template file is  been added in the component generating scripts. Whenever a 
> component is created with `npm run generate` command. The storybook file will be automatically created. 
