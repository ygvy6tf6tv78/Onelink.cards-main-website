"use client";

import { createContext, useContext } from "react";

const SplashCompleteContext = createContext(true);

export const SplashCompleteProvider = SplashCompleteContext.Provider;

export function useSplashComplete() {
  return useContext(SplashCompleteContext);
}
