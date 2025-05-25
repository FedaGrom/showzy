// Definicija zajedničkih tipova koji se koriste u cijeloj aplikaciji.
// Ova datoteka služi za centralizaciju tipova koji se ponavljaju, posebno za komponente stranica i layouta.

import type { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
};