"use client";

import { useConsultationDialog } from "../model";

type ConsultationButtonProps = {
  className: string;
  children: string;
};

export function ConsultationButton({ className, children }: ConsultationButtonProps) {
  const { openConsultationDialog } = useConsultationDialog();

  return (
    <button type="button" onClick={openConsultationDialog} className={className}>
      {children}
    </button>
  );
}
