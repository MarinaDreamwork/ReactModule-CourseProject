export const changeProfessionFormat = (professions) => {
  let string = '';
  for (const item of professions) {
    string = item.value;
  }
  return string;
};

export const changeQualityFormat = (qualities) => {
  const array = [];
  for (const qual of qualities) {
    array.push(qual.value);
  }
  return array;
};
