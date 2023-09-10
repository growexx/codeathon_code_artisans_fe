### Google Analytics

1. Google analytics is implemented out of box in the boilerplate. To start using the feature, add `REACT_APP_GA_TAG_ID` field in the env file and add tag id of the google analytics account. 

2. To integrate google analytics with react app, `react-ga` npm package is used.

3. Google analytics helper util is already created in utils folder (app/utils/googleAnalytics.js). This file contains code for initialization and capturing of events.

4. Initialization of google analytics is done in the index file (app/containers/App/index). 
- Remove the code if not needed. 
- To use the code, add `REACT_APP_GA_TAG_ID` with appropriate value.

5. Google analytics event capturing demo is added into the sidebar where menu clicks on tab name are captured by google. 
- In the demo, following name convention is followed:
    1. Category: Type of clicks.
    2. Action: Action performed by user.
    3. Label: Component from which action got fired.
