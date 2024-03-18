export const getCookie = (key) => {
  if (!document.cookie) return null;

  const cookies = document.cookie.split(';');
  const entireCookie = cookies.find((cookie) => {
    return cookie.trim().startsWith(`${key}=`);
  });
  return entireCookie && entireCookie.split('=')[1];
};

export const removeCookie = (key) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
