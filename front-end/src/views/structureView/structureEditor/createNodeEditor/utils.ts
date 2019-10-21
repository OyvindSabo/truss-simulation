export const validateCoordinates = (x: string, y: string, z: string) => {
  if (x === '' || y === '' || z === '') return false;
  if (isNaN(Number(x)) || isNaN(Number(y)) || isNaN(Number(z))) return false;
  return true;
};
