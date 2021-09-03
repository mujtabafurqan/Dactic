/*
 * HeroPage Messages
 *
 * This contains all the text for the HeroPage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.HeroPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HeroPage component!',
  },
});
