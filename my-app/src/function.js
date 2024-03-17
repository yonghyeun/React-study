export const getCookie = (key) => {
  if (!document.cookie) return null;

  const cookies = document.cookie.split(';');
  const entireCookie = cookies.find((cookie) => {
    return cookie.trim().startsWith(`${key}=`);
  });
  return entireCookie && entireCookie.split('=')[1];
};
