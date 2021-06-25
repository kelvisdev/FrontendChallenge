export const spliceArray = (items: Array<any>, division: number) => {
  const res = [];
  while (items.length > 0) {
    const chunk = items.splice(0, division);
    res.push(chunk);
  }
  return res;
}

