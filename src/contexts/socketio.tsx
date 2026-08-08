import { createContext } from "react";

/**
 * Realtime presence/socket features from the reference site are intentionally
 * not shipped here, so this context always provides a null socket. Components
 * guard on `socket` before using it.
 */
type MinimalSocket = {
  id?: string;
  on: (event: string, cb: (...args: any[]) => void) => void;
  off: (event: string, cb: (...args: any[]) => void) => void;
  emit: (event: string, ...args: any[]) => void;
};

export const SocketContext = createContext<{ socket: MinimalSocket | null }>({
  socket: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => (
  <SocketContext.Provider value={{ socket: null }}>{children}</SocketContext.Provider>
);
