/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export const useFetching = (
  fetchFn: (signal: AbortSignal) => Promise<any> | undefined,
  callback: (res: any) => void,
  deps: unknown[]
) => {
  useEffect(() => {
    const controller = new AbortController();
    fetchFn(controller.signal)?.then(callback).catch(console.log);
    return () => controller.abort();
  }, [...deps]);
};
