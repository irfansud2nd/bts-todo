export const reduceData = (data: any[], key: string = "id") => {
  const reducedData = Object.values(
    data.reduce((acc, obj) => {
      acc[obj[key]] = obj;
      return acc;
    }, {} as any)
  );
  return reducedData;
};
