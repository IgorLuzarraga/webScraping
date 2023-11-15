export const convertToNumber = (item) => ({
  ...item,
  points: parseInt(item.points, 10),
  comments: parseInt(item.comments, 10),
});
