"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const testimonials = [
  {
    quote:
      "AcademiAI helped me find the perfect Computer Science program that aligned with my AI interests. The recommendations were spot-on!",
    avatar: "https://github.com/shadcn.png",
    name: "Adebayo Ogundimu",
    role: "Computer Science Graduate",
  },
  {
    quote:
      "I was confused about which postgraduate program to choose. AcademiAI's AI analysis made the decision crystal clear for me.",
    avatar: "https://github.com/midudev.png",
    name: "Chioma Nwankwo",
    role: "Engineering Student",
  },
  {
    quote:
      "The personalized recommendations saved me months of research. Found my ideal Data Science program in just minutes!",
    avatar: "https://github.com/rauchg.png",
    name: "Ibrahim Yusuf",
    role: "Data Analyst",
  },
  {
    quote:
      "Finally, an academic advisor that understands Nigerian students. The program matches were incredibly accurate!",
    avatar: "https://github.com/pheralb.png",
    name: "Funmi Adeyemi",
    role: "Business Administration Graduate",
  },
  {
    quote:
      "AcademiAI's AI technology is revolutionary. It matched me with programs I never considered but turned out perfect!",
    avatar: "https://github.com/shadcn.png",
    name: "Kelechi Okoro",
    role: "Software Developer",
  },
  {
    quote:
      "The detailed explanations for each recommendation helped me understand why certain programs fit my profile better.",
    avatar: "https://github.com/midudev.png",
    name: "Aisha Mohammed",
    role: "Psychology Graduate",
  },
  {
    quote:
      "As a career changer, AcademiAI identified bridge programs that perfectly connected my background to my new goals.",
    avatar: "https://github.com/rauchg.png",
    name: "Samuel Okafor",
    role: "Career Transition Specialist",
  },
  {
    quote:
      "The system understood my academic strengths and career ambitions better than any human advisor I've consulted.",
    avatar: "https://github.com/pheralb.png",
    name: "Blessing Emeka",
    role: "Medical Sciences Student",
  },
];
const DURATION = 5000; // ms
const BAR_WIDTH = 50;
const CIRCLE_SIZE = 12;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, DURATION);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <section className="bg-background relative flex flex-col items-center py-16">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
        <div className="min-h-[120px] w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-foreground mb-8 text-center text-2xl leading-tight font-semibold md:text-4xl"
            >
              “{testimonials[index].quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="flex w-full max-w-lg items-center justify-center gap-8 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Image
                src={testimonials[index].avatar}
                alt={testimonials[index].name + " avatar"}
                width={48}
                height={48}
                className="bg-foreground/10 h-12 w-12 rounded-full border object-cover"
              />
              <div className="border-muted-foreground/30 mx-4 h-8 border-l" />
              <div className="text-left">
                <div className="text-foreground text-lg font-medium italic">
                  {testimonials[index].name}
                </div>
                <div className="text-muted-foreground text-base">
                  {testimonials[index].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress Bar & Circles Indicator */}
        <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
          {testimonials.map((_, i) => {
            const isActive = i === index;
            return (
              <motion.span
                key={i}
                layout
                initial={false}
                animate={{
                  width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: isActive ? 8 : 999,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                className="bg-foreground/10 relative block overflow-hidden"
                style={{
                  minWidth: CIRCLE_SIZE,
                  maxWidth: BAR_WIDTH,
                  border: "none",
                }}
              >
                {isActive && (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                    className="bg-brand absolute top-0 left-0 h-full rounded-lg"
                  />
                )}
              </motion.span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
