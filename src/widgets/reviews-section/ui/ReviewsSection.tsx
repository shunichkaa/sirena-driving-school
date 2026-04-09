"use client";

import { siteData } from "@/shared/config/site-data";
import { motion } from "framer-motion";

export function ReviewsSection() {
  return (
    <section id="otzyvy" className="bg-wash/30 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-black tracking-tight text-ink md:text-4xl">Отзывы</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {siteData.reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-wash bg-white p-5 transition duration-200 hover:-translate-y-0.5"
            >
              <p className="text-sm leading-relaxed text-muted">{review.text}</p>
              <p className="mt-4 text-sm font-bold text-ink">{review.name}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
