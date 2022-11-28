type DateTimeMs = number;
type Quantity = number;

export type ChartDataArray<T = DateTimeMs> = { x: T; y: Quantity }[];
