/**
 * Debounce function
 *
 * @param fnc Function to execute
 * @param time Time to wait until the function gets executed
 */
export const debounce = () => {
  let timeout;

  return (fnc: any, time: number) => {
    const functionCall = (...args) => fnc.apply(this, args);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
