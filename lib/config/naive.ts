import type { GlobalThemeOverrides } from 'naive-ui';

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'GeistSans',
    fontSize: '16px',
    lineHeight: '1.5',
    primaryColor: '#00e182',
    primaryColorHover: '#00cd75',
    primaryColorPressed: '#00cd75',
    primaryColorSuppl: '#3dd68c',
    errorColor: '#F75A5A',
    successColor: '#00e182',
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
    textColorGhostPrimary: '#18191B',
  },

  DataTable: {
    borderColor: '#E0E1E7',
    thColor: '#0e0e0e',
    tdColorHover: '#F0F0F3',
    thTextColor: '#ABB7C2',
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
    border: '1px solid #E0E1E7',
  },

  Popover: {
    padding: '4px 10px',
  },
};
