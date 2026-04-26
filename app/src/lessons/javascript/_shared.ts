// Shared helpers used by the JS lesson files.

import type { CSSProperties } from "react";

export const codePanelStyle: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 16,
  lineHeight: 1.5,
  padding: 20,
  borderRadius: 12,
  background: "#fff",
  border: "1px solid #e7e5e4",
  color: "#1c1917",
  whiteSpace: "pre",
  minWidth: 360,
  textAlign: "left",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

export const noteBoxStyle: CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: 15,
  padding: "12px 16px",
  borderRadius: 10,
  background: "#fef3c7",
  color: "#78350f",
  border: "1px solid #fcd34d",
  maxWidth: 380,
  textAlign: "left",
};
