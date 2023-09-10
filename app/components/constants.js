export const LAYOUT_CONFIG = {
  VERTICAL_OPTION_1: 1,
  VERTICAL_OPTION_2: 2,

  HORIZONTAL_OPTION_1: 3,
};

export const showLogoInSideBar = currentVariant =>
  ![
    LAYOUT_CONFIG.VERTICAL_OPTION_2,
    LAYOUT_CONFIG.HORIZONTAL_OPTION_1,
  ].includes(currentVariant);
