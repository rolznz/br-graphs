export const sortData = (data: { x: Date; y: number }[]) => {
  return data.sort((a, b) => a.x.getTime() - b.x.getTime());
};
