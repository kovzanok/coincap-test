import { useEffect } from "react";

export const useFetching = (
  fetchFn: (signal: AbortSignal) => Promise<unknown> | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (res: any) => void,
  deps: unknown[]
) => {
  useEffect(() => {
    const controller = new AbortController();
    fetchFn(controller.signal)?.then(callback).catch(console.log);
    return () => controller.abort();
  }, [...deps]);
};
