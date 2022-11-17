export enum TYPES {
  BODY = 'body',
  DISABLED = 'disabled',
  TITLE = 'title',
  SUBTITLE = 'subtitle',
}

export enum SIZES {
  S7 = 'S7',
  S6 = 'S6',
  S5 = 'S5',
  S4 = 'S4',
  S3 = 'S3',
  S2 = 'S2',
  S1 = 'S1',
  S0 = 'S0',
  SM1 = 'SM1',
  SM2 = 'SM2',
}

export const SIZE_DEFINITIONS = {
  [SIZES.S7]: { fontSize: 80, lineHeight: 96 },
  [SIZES.S6]: { fontSize: 64, lineHeight: 76 },
  [SIZES.S5]: { fontSize: 48, lineHeight: 56 },
  [SIZES.S4]: { fontSize: 36, lineHeight: 44 },
  [SIZES.S3]: { fontSize: 24, lineHeight: 32 },
  [SIZES.S2]: { fontSize: 20, lineHeight: 28 },
  [SIZES.S1]: { fontSize: 16, lineHeight: 24 },
  [SIZES.S0]: { fontSize: 14, lineHeight: 20 },
  [SIZES.SM1]: { fontSize: 12, lineHeight: 18 },
  [SIZES.SM2]: { fontSize: 10, lineHeight: 16 },
};

export enum FONT_WEIGHTS {
  LIGHT = 300,
  REGULAR = 400,
  MEDIUM = 500,
  SEMIBOLD = 600,
  BOLD = 700,
}
