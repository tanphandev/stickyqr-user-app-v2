export const isTokenExpired = (expiresIn: string) => {
  const exp = new Date(expiresIn)?.getTime();
  const now = Date.now();

  const diff = exp - now;
  return diff < 60 * 1000;
};
