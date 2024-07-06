export enum PeriodValues {
  THIS_WEEK = "week",
  THIS_MONTH = "month",
  THIS_YEAR = "year",
  INFINITY = "infinity",
}

export enum FilterValues {
  LASTED = "lasted",
  HOT = "hot",
  // TRENDING = "trending",
}

export type ActionReturnType<T> = {
  data: T
  error: null | string
}
