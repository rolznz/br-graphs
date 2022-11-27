export const timeFormats = ["day", "week", "month"] as const;
export type TimeFormat = typeof timeFormats[number];

export type TimeFormatProps = { timeFormat?: TimeFormat };
