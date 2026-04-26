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

export type JsTest = {
  label: string;
  input: unknown;
  expected: unknown;
};

export type DoorConfig = {
  conditionLabel: string;
  inputKey?: string; // which property of input to display (when input is an object)
  acceptLabel?: string;
  rejectLabel?: string;
};

export type ForkBranch = { key: string; label: string };
export type ForkConfig = {
  conditionLabel: string;
  branches: ForkBranch[];
  // For each test, the key of the branch that is correct (derived from expected by default).
  // The scene maps test.expected → branch.key by string match.
};

export type ConveyorBin = { key: string; label: string };
export type ConveyorConfig = {
  inputLabel: string;
  bins: ConveyorBin[];
  defaultBinKey?: string;
};

export type MultiGateConfig = {
  mode: "and" | "or" | "not";
  operandLabels: [string, string?]; // second optional for "not"
  passLabel?: string;
  failLabel?: string;
};

export type Allegory =
  | { kind: "door"; config: DoorConfig }
  | { kind: "fork"; config: ForkConfig }
  | { kind: "conveyor"; config: ConveyorConfig }
  | { kind: "multi-gate"; config: MultiGateConfig };

export type JsAssignmentSlide = {
  kind: "js-assignment";
  title: string;
  prompt: string;
  starterCode: string;
  functionName: string;
  tests: JsTest[];
  allegory: Allegory;
  legend?: LegendEntry[];
};

export type Slide = ExplanationSlide | AssignmentSlide | JsAssignmentSlide;

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  slides: Slide[];
};

export type Course = {
  id: string;
  title: string;
  summary?: string;
  lessons: Lesson[];
};
