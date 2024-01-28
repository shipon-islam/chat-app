export const Debounce = (fn: () => void, deley: number) => {
  let timeoutId: NodeJS.Timeout;
  return function () {
    if (timeoutId) {
      clearInterval(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn();
    }, deley);
  };
};

export const getSession = () => {
  const localSession = localStorage.getItem("session");
  const sessionObj = localSession ? JSON.parse(localSession) : {};
  return sessionObj;
};

export const getTheme = () => {
  const localTheme = localStorage.getItem("theme");
  const theme = localTheme ? JSON.parse(localTheme) : "light";
  return theme;
};
