import type { CSSProperties } from "react";

export type DemoBox = {
  id: string;
  label?: string;
  baseStyle?: CSSProperties;
  children?: DemoBox[];
};

export type ExplanationStep = {
  narration?: string;
  styles?: Record<string, CSSProperties>;
  highlight?: string[];
};

export type ExplanationSlide = {
  kind: "explanation";
  title: string;
  intro?: string;
  demo: DemoBox[];
  steps: ExplanationStep[];
};

export type StyleCheck = {
  selector: string;
  property: string;
  expected: string;
  tolerance?: number;
  hint?: string;
};

export type LegendEntry = {
  name: string;
  syntax: string;
  example: string;
  note?: string;
};

export type AssignmentSlide = {
  kind: "assignment";
  title: string;
  prompt: string;
  html: string;
  startingCss: string;
  checks: StyleCheck[];
  legend?: LegendEntry[];
  targetCss?: string;
};

export type Slide = ExplanationSlide | AssignmentSlide;

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  slides: Slide[];
};
