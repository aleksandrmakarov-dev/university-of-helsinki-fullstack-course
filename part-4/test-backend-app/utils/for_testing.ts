const reverse = (str: string) => {
  return str.split('').reverse().join('');
};

const average = (array: any[]) => {
  const reducer = (sum: any, item: any) => {
    return sum + item;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
