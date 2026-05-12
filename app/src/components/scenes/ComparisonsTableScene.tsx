import { t } from "../../i18n";
import type { LocalizedString } from "../../i18n";

type Props = { step: number };

type Row = {
  op: string;
  reads: LocalizedString;
  example: string;
  question: LocalizedString;
  answer: boolean;
};

const rows: Row[] = [
  {
    op: ">",
    reads: "greater than",
    example: "7 > 5",
    question: "Is 7 greater than 5?",
    answer: true,
  },
  {
    op: "<",
    reads: "less than",
    example: "2 < 8",
    question: "Is 2 less than 8?",
    answer: true,
  },
  {
    op: ">=",
    reads: "greater than or equal",
    example: "4 >= 4",
    question: "Is 4 greater than or equal to 4?",
    answer: true,
  },
  {
    op: "<=",
    reads: "less than or equal",
    example: "9 <= 3",
    question: "Is 9 less than or equal to 3?",
    answer: false,
  },
  {
    op: "===",
    reads: "equal (strict)",
    example: '"yes" === "yes"',
    question: 'Is "yes" the same as "yes"?',
    answer: true,
  },
  {
    op: "!==",
    reads: "not equal",
    example: '"no" !== "yes"',
    question: 'Is "no" different from "yes"?',
    answer: true,
  },
];

export function ComparisonsTableScene({ step: _step }: Props) {

  return (
    <div className="w-full h-full overflow-auto p-2">
      <div className="rounded-2xl overflow-hidden ring-1 ring-stone-200 shadow-sm
                      bg-white dark:bg-slate-900/60 dark:ring-white/10">
        <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider
                           bg-stone-100 text-stone-600
                           dark:bg-slate-800/60 dark:text-indigo-200/70">
              <Th>{t("Operator")}</Th>
              <Th>{t("Reads as")}</Th>
              <Th>{t("Example")}</Th>
              <Th>{t("In words")}</Th>
              <Th>{t("Answer")}</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={
                  "border-t border-stone-200 dark:border-white/10 " +
                  (i % 2 === 1
                    ? "bg-stone-50/60 dark:bg-slate-900/30"
                    : "")
                }
              >
                <Td mono>
                  <span className="text-amber-700 dark:text-amber-300 font-semibold">
                    {row.op}
                  </span>
                </Td>
                <Td>{t(row.reads)}</Td>
                <Td mono>{row.example}</Td>
                <Td>{t(row.question)}</Td>
                <Td>
                  <span
                    className={
                      "font-semibold " +
                      (row.answer
                        ? "text-emerald-600 dark:text-emerald-300"
                        : "text-rose-600 dark:text-rose-300")
                    }
                  >
                    {row.answer ? "true" : "false"}
                  </span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-medium">{children}</th>;
}

function Td({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td
      className={
        "px-3 py-2 align-top " +
        (mono ? "font-mono text-stone-800 dark:text-indigo-100" : "text-stone-700 dark:text-indigo-100")
      }
    >
      {children}
    </td>
  );
}
