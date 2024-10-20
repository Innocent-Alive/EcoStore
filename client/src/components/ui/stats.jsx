import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: 1, name: "Transactions every 24 hours", value: 400000 },
  { id: 2, name: "Assets under holding", value: 15678 },
  { id: 3, name: "Active Buyers", value: 46000 },
];

function Stats() {
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statRefs.current.forEach((statRef, index) => {
        gsap.fromTo(
          statRef,
          { innerText: 0 },
          {
            innerText: stats[index].value,
            duration: 1,
            ease: "power1.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              statRef.innerText = Math.ceil(statRef.innerText).toLocaleString();
            },
            scrollTrigger: {
              trigger: statRef,
              start: "top center",
              once: true,
            },
          }
        );
      });
    }, statRefs);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative py-24 sm:py-32 bg-background">
      {/* Decorative Accent Circle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 w-96 h-96 bg-primary opacity-30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-16 text-primary font-elsie">
          Current Stats
        </h1>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4 transform transition-transform duration-300 hover:scale-105"
              >
                <dd
                  ref={(el) => (statRefs.current[index] = el)}
                  className="order-first text-5xl font-extrabold tracking-tight text-secondary sm:text-6xl"
                >
                  0
                </dd>
                <dt className="text-lg leading-7 text-primary font-medium">
                  {stat.name}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Stats;
