import type { GlobalThemeOverrides } from 'naive-ui';

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Inter, ui-sans-serif, system-ui',
    fontSize: '16px',
    lineHeight: '1.5',
    primaryColor: '#34CFC6',
    primaryColorHover: '#37dbd3',
    primaryColorPressed: '#30bfb8',
    primaryColorSuppl: '#37dbd3',
    errorColor: '#F75A5A',
    successColor: '#16C123',
    placeholderColor: '#C4C4C4',
  },

  Button: {
    heightLarge: '50px',
    heightMedium: '42px',
    borderRadiusMedium: '6px',
    fontSizeMedium: '18px',
    heightSmall: '40px',
    borderRadiusSmall: '8px',
    fontSizeSmall: '16px',
    textColorGhostPrimary: '#1B2626',
  },

  Dropdown: {
    padding: '32px',
    color: '#F6F7FA',
    optionIconSizeMedium: '20px',
    optionHeightMedium: '36px',
    borderRadius: '10px',
    fontSizeLarge: '20px',
  },

  Form: {
    labelFontWeight: 500,
    labelFontSizeLeftLarge: '25px',
    labelFontSizeTopLarge: '25px',
    labelPaddingVertical: '0 0 8px 2px',
    labelTextColor: '#000000',
  },

  Input: {
    heightLarge: '72px',
    paddingLarge: '20px 16px',
    fontSizeLarge: '25px',
    heightMedium: '40px',
    paddingMedium: '10px 16px',
    fontSizeMedium: '16px',
    heightSmall: '35px',
    paddingSmall: '8px 12px',
    fontSizeSmall: '16px',
    borderRadius: '8px',
    border: '1px solid #D0D0D0',
  },

  Popover: {
    padding: '4px 10px',
  },
};
