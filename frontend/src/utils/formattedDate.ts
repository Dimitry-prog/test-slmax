export const formattedDate = (data: number): string => {
  const date = new Date(data * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};
