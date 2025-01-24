// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
export const calculateAverage = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  const total = ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (total / ratings.length).toFixed(1);
};
