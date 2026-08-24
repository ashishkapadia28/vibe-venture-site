import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True only once mounted on the client. Use for content that touches
 * window/DOM globals a server render can't produce (portals, third-party
 * embeds). Avoids the render -> effect -> setState -> re-render waterfall
 * that a `useState` + `useEffect(() => setState(true), [])` mount-flag causes.
 */
export function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
