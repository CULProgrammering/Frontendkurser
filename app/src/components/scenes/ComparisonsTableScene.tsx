import { useLang } from "../../i18n/LanguageContext";
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
    reads: { en: "greater than", sv: "större än" },
    example: "7 > 5",
    question: { en: "Is 7 greater than 5?", sv: "Är 7 större än 5?" },
    answer: true,
  },
  {
    op: "<",
    reads: { en: "less than", sv: "mindre än" },
    example: "2 < 8",
    question: { en: "Is 2 less than 8?", sv: "Är 2 mindre än 8?" },
    answer: true,
  },
  {
    op: ">=",
    reads: { en: "greater than or equal", sv: "större än eller lika med" },
    example: "4 >= 4",
    question: { en: "Is 4 greater than or equal to 4?", sv: "Är 4 större än eller lika med 4?" },
    answer: true,
  },
  {
    op: "<=",
    reads: { en: "less than or equal", sv: "mindre än eller lika med" },
    example: "9 <= 3",
    question: { en: "Is 9 less than or equal to 3?", sv: "Är 9 mindre än eller lika med 3?" },
    answer: false,
  },
  {
    op: "===",
    reads: { en: "equal (strict)", sv: "lika med (strikt)" },
    example: '"yes" === "yes"',
    question: { en: 'Is "yes" the same as "yes"?', sv: 'Är "yes" samma som "yes"?' },
    answer: true,
  },
  {
    op: "!==",
    reads: { en: "not equal", sv: "ej lika med" },
    example: '"no" !== "yes"',
    question: { en: 'Is "no" different from "yes"?', sv: 'Är "no" skilt från "yes"?' },
    answer: true,
  },
];

export function ComparisonsTableScene({ step: _step }: Props) {
  const { lang } = useLang();

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
              <Th>{t({ en: "Operator", sv: "Operator" }, lang)}</Th>
              <Th>{t({ en: "Reads as", sv: "Läses som" }, lang)}</Th>
              <Th>{t({ en: "Example", sv: "Exempel" }, lang)}</Th>
              <Th>{t({ en: "In words", sv: "Med ord" }, lang)}</Th>
              <Th>{t({ en: "Answer", sv: "Svar" }, lang)}</Th>
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
                <Td>{t(row.reads, lang)}</Td>
                <Td mono>{row.example}</Td>
                <Td>{t(row.question, lang)}</Td>
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
