/**
 * REACT - GA : https://www.npmjs.com/package/react-ga
 */
import ReactGA from 'react-ga';
export const initGA = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_TAG_ID, {
    testMode: process.env.NODE_ENV === 'test',
    titleCase: false,
  });
};

/**
 * recordPageView - record pages visited.
 * @param {string} location
 */
export const recordPageViewGA = location => {
  ReactGA.pageview(location);
};

/**
 * event - Add custom tracking event.
 * @param {string} category
 * @param {string} action
 * @param {string} label
 */
export const eventGA = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
