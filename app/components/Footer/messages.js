/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Footer';

export default defineMessages({
  copyRightMessage: {
    id: `${scope}.copyRightMessage.message`,
    defaultMessage: `&copy; ${new Date().getFullYear()} React Boilerplate`,
  },
  copyRightSubMessage: {
    id: `${scope}.copyRightSubMessage.message`,
    defaultMessage: `Get started with your next react application in seconds.`,
  },
});
