/**
 * Debounce function
 *
 * @param fnc Function to execute
 * @param time Time to wait until the function gets executed
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (): (fnc: Function, time: number) => void => {
  let timeout: number;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return (fnc: Function, time: number) => {
    const functionCall = (...args: any[]): any => fnc.apply(this, args); // eslint-disable-line @typescript-eslint/no-explicit-any
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
