"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ConsultationDialog } from "../ui/ConsultationDialog";

type ConsultationDialogContextValue = {
  openConsultationDialog: () => void;
};

const ConsultationDialogContext = createContext<ConsultationDialogContextValue | null>(null);

type ConsultationDialogProviderProps = {
  children: ReactNode;
};

export function ConsultationDialogProvider({ children }: ConsultationDialogProviderProps) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const openConsultationDialog = useCallback(() => setConsultationOpen(true), []);

  const value = useMemo(
    () => ({
      openConsultationDialog,
    }),
    [openConsultationDialog],
  );

  return (
    <ConsultationDialogContext.Provider value={value}>
      {children}
      <ConsultationDialog open={consultationOpen} onOpenChangeAction={setConsultationOpen} />
    </ConsultationDialogContext.Provider>
  );
}

export function useConsultationDialog() {
  const context = useContext(ConsultationDialogContext);

  if (!context) {
    throw new Error("useConsultationDialog must be used within ConsultationDialogProvider");
  }

  return context;
}
