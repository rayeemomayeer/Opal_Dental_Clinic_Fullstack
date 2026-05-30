import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect runs before paint (no flash of un-animated content) but warns
 * during SSR. Fall back to useEffect on the server.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
