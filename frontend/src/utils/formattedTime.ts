export const formattedTime = (stamp: number): string => {
  const date = new Date(stamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour12: false,
    timeStyle: 'short',
  };
  const formattedTime = date.toLocaleTimeString('en-US', options);

  return formattedTime;
};
