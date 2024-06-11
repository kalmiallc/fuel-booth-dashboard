import dayjs from 'dayjs';

/**
 * @returns Progress percent with decimal number, eg 0.75 == 75%
 */
export function getDurationProgress(tsFrom: number | string, tsTo: number | string) {
  const from = dayjs(tsFrom);
  const to = dayjs(tsTo);
  const now = dayjs();
  return +(
    Math.min(100, Math.round((Math.abs(from.diff(now)) / Math.abs(from.diff(to))) * 100)) / 100
  ).toFixed(2);
}

export function getDaysRemaining(tsTo: number | string) {
  const now = dayjs();
  const to = dayjs(tsTo);
  return Math.max(0, to.diff(now, 'day'));
}

/**
 * @url https://day.js.org/docs/en/display/format
 */
export function getFormattedDate(ts: number | string, format = 'DD/MM/YY') {
  const date = dayjs(ts);
  if (!date || !date.isValid()) {
    return '';
  }
  return date.format(format);
}

/**
 * Return formatted date string if date is in future
 */
export function getDateIfBefore(ts: number | string) {
  const date = dayjs(ts);
  if (!date || !date.isValid() || !dayjs().isBefore(ts)) {
    return '';
  }
  return date.format('DD/MM/YYYY');
}

export const formattedTime = time => {
  const timeInSeconds = time > 1000 ? Math.round(time / 1000) : time;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;
  return minutes > 0 ? `${minutes}min ${seconds}s` : `${seconds}s`;
};
