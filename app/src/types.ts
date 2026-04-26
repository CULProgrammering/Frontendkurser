import type { CSSProperties } from "react";
import type { Loc } from "./i18n";

export type DemoBox = {
  id: string;
  label?: Loc;
  baseStyle?: CSSProperties;
  children?: DemoBox[];
};

export type ExplanationStep = {
  narration?: Loc;
  styles?: Record<string, CSSProperties>;
  highlight?: string[];
};

/** Identifier of a custom intro scene component (e.g. stick-figure animation). */
export type CustomSceneId =
  | "crosswalk"
  | "wardrobe"
  | "recycling"
  | "bouncer";

export type ExplanationSlide = {
  kind: "explanation";
  title: Loc;
  intro?: Loc;
  demo: DemoBox[];
  steps: ExplanationStep[];
  /** When set, replaces the demo column with a hand-drawn scene. */
  customScene?: CustomSceneId;
};

export type StyleCheck = {
  selector: string;
  property: string;
  expected: string;
  tolerance?: number;
  hint?: Loc;
};

export type LegendEntry = {
  name: Loc;
  syntax: string;
  example: string;
  note?: Loc;
};

export type AssignmentSlide = {
  kind: "assignment";
  title: Loc;
  prompt: Loc;
  /** HTML markup for the preview iframe. May contain visible Swedish/English text. */
  html: Loc;
  startingCss: Loc;
  checks: StyleCheck[];
  legend?: LegendEntry[];
  targetCss?: Loc;
};

export type JsTest = {
  label: Loc;
  input: unknown;
  expected: unknown;
};

export type DoorConfig = {
  conditionLabel: Loc;
  inputKey?: string;
  acceptLabel?: Loc;
  rejectLabel?: Loc;
};

export type ForkBranch = { key: string; label: Loc };
export type ForkConfig = {
  conditionLabel: Loc;
  branches: ForkBranch[];
};

export type ConveyorBin = { key: string; label: Loc };
export type ConveyorConfig = {
  inputLabel: Loc;
  bins: ConveyorBin[];
  defaultBinKey?: string;
};

export type MultiGateConfig = {
  mode: "and" | "or" | "not";
  operandLabels: [string, string?];
  passLabel?: Loc;
  failLabel?: Loc;
};

export type CrosswalkConfig = {
  conditionLabel: Loc;
  /** When input is an object, which property holds the light state. */
  inputKey?: string;
  /**
   * The value the user's function must return for the figure to walk.
   * Default: true. For string-returning exercises, set this to e.g. "walk".
   */
  walkWhen?: unknown;
  walkLabel?: Loc;
  waitLabel?: Loc;
};

export type Allegory =
  | { kind: "door"; config: DoorConfig }
  | { kind: "fork"; config: ForkConfig }
  | { kind: "conveyor"; config: ConveyorConfig }
  | { kind: "multi-gate"; config: MultiGateConfig }
  | { kind: "crosswalk"; config: CrosswalkConfig };

export type JsAssignmentSlide = {
  kind: "js-assignment";
  title: Loc;
  prompt: Loc;
  starterCode: Loc;
  functionName: string;
  /**
   * When true, `starterCode` is the function BODY only. The view renders a
   * read-only `function name(param) {` above the editor and `}` below it,
   * and the runner wraps the body as a function before invoking it.
   */
  bodyOnly?: boolean;
  /** Required when bodyOnly is true. The parameter name shown in the wrapper. */
  paramName?: string;
  tests: JsTest[];
  allegory: Allegory;
  legend?: LegendEntry[];
};

export type Slide = ExplanationSlide | AssignmentSlide | JsAssignmentSlide;

export type Lesson = {
  id: string;
  title: Loc;
  summary: Loc;
  slides: Slide[];
};

export type Course = {
  id: string;
  title: Loc;
  summary?: Loc;
  lessons: Lesson[];
};
