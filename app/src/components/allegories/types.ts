import type { JsTest } from "../../types";
import type { RunResult } from "../../runtime/jsRunner";

export type SceneRun = {
  test: JsTest;
  result: RunResult;
  pass: boolean;
};
