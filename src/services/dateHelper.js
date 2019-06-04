// eslint-disable-next-line import/prefer-default-export
export function secondsToMinutesSeconds(data, showZero) {
  let seconds = parseInt(data % 60, 10);
  let minutes = parseInt((data / 60) % 60, 10);

  minutes = minutes || showZero ? `${minutes}m` : '';
  seconds = seconds || showZero ? `${seconds}s` : '';

  return `${minutes} ${seconds}`.trim();
}
