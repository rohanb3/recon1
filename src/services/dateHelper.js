import moment from 'moment';
import { DATE_FORMATS } from '@/constants';

// eslint-disable-next-line import/prefer-default-export
export function secondsToMinutesSeconds(data, showZero) {
  let seconds = parseInt(data % 60, 10);
  let minutes = parseInt((data / 60) % 60, 10);

  minutes = minutes || showZero ? `${minutes}m` : '';
  seconds = seconds || showZero ? `${seconds}s` : '';

  return `${minutes} ${seconds}`.trim();
}

// eslint-disable-next-line import/prefer-default-export
export const dateRange = (from, to, format = DATE_FORMATS.DAY_FULL_MONTH) => {
  const numberDays = moment.utc(to).diff(moment.utc(from), 'days');
  const dateList = [];
  for (let i = 0; i <= numberDays; i += 1) {
    dateList.push(
      moment
        .utc(from)
        .add(i, 'days')
        .local()
        .format(format)
    );
  }
  return dateList;
};
