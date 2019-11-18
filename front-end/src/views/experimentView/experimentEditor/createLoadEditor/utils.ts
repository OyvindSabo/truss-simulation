export const validateLoad = (fx: string, fy: string, fz: string) => {
  if (fx === '' || fy === '' || fz === '') return false;
  if (isNaN(Number(fx)) || isNaN(Number(fy)) || isNaN(Number(fz))) return false;
  return true;
};
