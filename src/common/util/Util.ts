/**
 * Debounce function
 *
 * @param fnc Function to execute
 * @param time Time to wait until the function gets executed
 */
export const debounce = (): (fnc: typeof Function, time: number) => void => {
  let timeout;

  return (fnc: typeof Function, time: number) => {
    const functionCall = (...args): any => fnc.apply(this, args); // eslint-disable-line @typescript-eslint/no-explicit-any
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
