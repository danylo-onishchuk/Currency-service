export const configForCoinAPIRequests = {
  headers: { 'X-CoinAPI-Key': 'A4CB16FC-C523-4C55-B054-157F9D8F971A' },
};

export const enum Period {
  Day = '1DAY',
  Hour = '1HRS',
  Minute = '1MIN',
  Sec = '1SEC',
}

export const periodMapper = {
  Day: Period.Day,
  Hour: Period.Hour,
  Minute: Period.Minute,
  Sec: Period.Sec,
};

export const defaultPeriod = Period.Day;
