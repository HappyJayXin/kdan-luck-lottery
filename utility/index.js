export const shuffle = (arr) => {
  const n = arr.length;
  for (let i = n - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }

  return arr;
};
