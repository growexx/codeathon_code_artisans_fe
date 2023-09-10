import React from 'react';
import WrapperStory from '../app/stories/decorators/WrapperStory';
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
export const decorators = [
  (Story) => (
    <WrapperStory>
      <Story />
    </WrapperStory>
  ),
];