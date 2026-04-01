import { useEffect, useMemo, useState } from "react";

export default function Landing({ onApply }: { onApply: () => void }) {
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(20);
  const [maybeText, setMaybeText] = useState("Maybe Later (you won’t)");
  const [maybeCount, setMaybeCount] = useState(1);
  const [maybeOffset, setMaybeOffset] = useState({ x: 0, y: 0 });
  const [maybeDrift, setMaybeDrift] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState("Software Engineering");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => {
        const change = Math.random() * 30 - 10;
        let next = value + change;
        if (next < 0) next = 5;
        if (next > 100) next = 80;
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const texts = [
      "Software Engineering",
      "Software Guessing",
      "Bug Creator",
      "Stack Overflow Specialist",
    ];

    const interval = setInterval(() => {
      setGlitchText(texts[Math.floor(Math.random() * texts.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMaybeDrift({
        x: Math.random() * 220 - 110,
        y: Math.random() * 120 - 60,
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const initialCards = useMemo(
    () => [
      { id: 0, x: 0, y: 0, vx: 0.8, vy: 0.6 },
      { id: 1, x: 20, y: 10, vx: -0.6, vy: 0.9 },
      { id: 2, x: -10, y: 20, vx: 0.7, vy: -0.5 },
      { id: 3, x: 10, y: -10, vx: -0.5, vy: 0.7 },
    ],
    [],
  );

  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((previousCards) =>
        previousCards.map((card) => {
          let nextX = card.x + card.vx * 10;
          let nextY = card.y + card.vy * 10;
          let nextVx = card.vx;
          let nextVy = card.vy + 0.08;

          if (nextX > 200 || nextX < -200) nextVx = -nextVx;
          if (nextY > 120 || nextY < -120) nextVy = -nextVy;

          nextX += Math.random() * 10 - 5;
          nextY += Math.random() * 10 - 5;

          return { ...card, x: nextX, y: nextY, vx: nextVx, vy: nextVy };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMaybeLater = () => {
    const phrases = [
      "ok fine…",
      "wait come back",
      "you sure?",
      "this is your last chance",
      "bro just apply 😭",
    ];

    setMaybeText(phrases[Math.floor(Math.random() * phrases.length)]);
    setMaybeOffset({
      x: Math.random() * 60 - 30,
      y: Math.random() * 30 - 15,
    });

    if (maybeCount < 5) {
      setMaybeCount(maybeCount + 1);
    } else {
      alert("we are too lazy… just close the website 😭");
    }
  };

  const moveButton = () => {
    setBtnPos({
      x: Math.random() * 500 - 250,
      y: Math.random() * 250 - 125,
    });
  };

  const content = [
    ["What you’ll do", "Build features, fix bugs, and question your life choices."],
    ["What we value", "Clean code, clear thinking, and vibes."],
    ["Unofficial title", "Stack Overflow Speedrunner."],
    ["Fun fact", "This card rearranges itself when you get comfortable."],
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="fixed left-0 top-0 h-1 bg-slate-900" style={{ width: `${progress}%` }} />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12 md:px-10">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-400">Job ID 6767</p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Senior Associate Junior Principal Staff Software Engineer of Distributed Systems, Button
            Optimization, and Vibe Alignment
          </h1>

          <div className="relative mt-10 h-28">
            {Array.from({ length: maybeCount }).map((_, index) => (
              <button
                key={index}
                onClick={handleMaybeLater}
                style={{
                  position: "absolute",
                  left: index * 6,
                  top: 10,
                  zIndex: 1,
                  transform: `translate(${maybeOffset.x + maybeDrift.x}px, ${maybeOffset.y + maybeDrift.y}px)`,
                }}
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700"
              >
                {maybeText}
              </button>
            ))}

            <button
              onMouseEnter={moveButton}
              onClick={onApply}
              style={{
                position: "absolute",
                left: 200,
                top: 10,
                zIndex: 3,
                transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
              }}
              className="rounded-xl bg-slate-900 px-7 py-4 text-base font-semibold text-white shadow"
            >
              Apply Now (good luck)
            </button>
          </div>
        </div>

        <div className="mt-20">
          <div className="relative h-100 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Role snapshot</p>
              <p className="text-2xl font-bold">{glitchText}</p>
            </div>

            <div className="relative h-full">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="absolute w-[40%] rounded-lg border border-slate-200 bg-slate-50 p-4 shadow"
                  style={{
                    transform: `translate(${card.x}px, ${card.y}px) rotate(${(card.id % 2 ? 1 : -1) * 4}deg)`,
                    left: `${20 + card.id * 12}%`,
                    top: `${20 + card.id * 6}%`,
                    zIndex: 1 + card.id,
                  }}
                >
                  <p className="text-sm font-semibold text-slate-900">{content[card.id][0]}</p>
                  <p className="mt-2 text-sm leading-5 text-slate-600">{content[card.id][1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
