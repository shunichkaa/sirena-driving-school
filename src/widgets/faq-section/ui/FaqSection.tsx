"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function FaqSection() {
  return (
    <section id="faq" className="border-t border-wash bg-white py-14 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-6 lg:px-8">
        <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-ink">
          Вопросы и ответы
        </h2>
        <div className="mt-8 space-y-3">
          {siteData.faq.map((item, index) => (
            <motion.details
              key={item.question}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: index * 0.05 }}
              className="faq-item rounded-2xl border border-wash bg-white p-5 shadow-card [&[open]_.faq-chevron]:rotate-180"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-medium leading-snug text-ink">
                <span className="min-w-0">{item.question}</span>
                <span
                  className="faq-chevron inline-block shrink-0 text-lg leading-none text-muted transition-transform duration-300"
                  aria-hidden
                >
                  ▾
                </span>
              </summary>
              <div className="faq-answer">
                {(() => {
                  const answerLines = item.answer.split("\n");
                  const renderLine = (line: string) => {
                    if (line === "Пройдите медосмотр и получите справку 003-в/у") {
                      return (
                        <>
                          Пройдите медосмотр и получите{" "}
                          <a
                            href="https://www.gosuslugi.ru/newsearch/medicinskaya-spravka-dlya-gibdd-gai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-muted/60 underline-offset-2 transition-colors hover:text-ink"
                          >
                            справку 003-в/у
                          </a>
                        </>
                      );
                    }

                    if (line === "ПДД Мастер") {
                      return (
                        <span className="inline-flex flex-col items-start gap-1">
                          <a
                            href="https://pddmaster.ru/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-muted/60 underline-offset-2 transition-colors hover:text-ink"
                          >
                            {line}
                          </a>
                          <a
                            href="https://pdd-exam.ru/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-muted/60 underline-offset-2 transition-colors hover:text-ink"
                          >
                            ПДД тесты
                          </a>
                        </span>
                      );
                    }

                    return line;
                  };

                  if (answerLines.length > 1) {
                    return (
                      <ul className="max-w-measure list-disc border-t border-wash pt-3 pl-5 text-[15px] leading-relaxed text-muted">
                        {answerLines.map((line, lineIndex) => (
                          <li key={`${item.question}-${lineIndex}`}>{renderLine(line)}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p className="max-w-measure border-t border-wash pt-3 text-[15px] leading-relaxed text-muted">
                      {renderLine(answerLines[0] ?? "")}
                    </p>
                  );
                })()}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
