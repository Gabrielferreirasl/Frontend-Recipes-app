const getListForEach = (number) => {
  let listForEach = [];
  for (let index = 1; index <= number; index += 1) {
    listForEach = [...listForEach, index];
  }
  return listForEach;
};

export default getListForEach;
