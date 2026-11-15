import { useRef } from "react";
import Shield from "../../../assets/images/Jami Emas.webp";

import Card from "../generation/ActorCard";
import SectionTitle from "../generation/SectionTitle";
import ScrollRow from "../generation/ScrollRow";
import CarouselButton from "../generation/CarouselButton";
import ProgressBar from "../generation/ProgressBar";

import {
  shieldLogo,
  chiefs,
  logoMeanings,
  statusBoard,
  santriStats,
  socials,
} from "../generation/GenerationData";

function OurGeneration() {
  const chiefsRef = useRef(null);
  const meaningsRef = useRef(null);

  const scrollByAmount = (ref, direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction * Math.max(320, ref.current.clientWidth * 0.85),
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen text-white overflow-hidden">
      <div className="relative">
        <Card className="overflow-hidden" id="home">
          <div className="relative h-[clamp(20rem,50vh,60rem)] ">
            <img
              src={Shield}
              alt={Shield}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-linear-to-t from-[#170e07] via-[#0d0500]/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-10 sm:py-16 text-center">
              <p className="text-sm sm:text-base lg:text-lg uppercase tracking-[0.55em] text-violet-200/85">
                About
              </p>
              <h1 className="mt-2 text-[clamp(4rem,10vw,8.5rem)] font-black leading-none tracking-widest bg-linear-to-b from-white via-violet-200 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(168,85,247,0.16)]">
                6101
              </h1>
              <div className="mt-4 h-px w-20 bg-violet-300/60" />
              <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-white/85 italic">
                “Built from memories, united forever.”
              </p>
            </div>
          </div>
        </Card>
        <div className="w-full max-w-500 mx-auto px-5 sm:px-8 relative z-10">

          <main className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">


            <Card className="p-4 sm:p-6 lg:p-8" id="about">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.4fr] gap-5 lg:gap-8 items-center">
                <div className="space-y-5">
                  <div>
                    <h2 className="text-[clamp(1.4rem,2vw,2rem)] font-extrabold uppercase tracking-[0.12em] text-violet-300">
                      About Our Generation
                    </h2>
                    <div className="mt-3 h-px w-24 bg-violet-400/60" />
                  </div>

                  <p className="text-sm sm:text-base lg:text-lg leading-8 text-white/80 text-justify">
                    Generation 6101 adalah angkatan yang dibentuk dari semangat,
                    dedikasi, dan perjalanan panjang penuh makna. Kami hadir bukan
                    hanya untuk belajar, tetapi untuk tumbuh, berproses, dan
                    menjadi pribadi yang berkarakter serta bermanfaat bagi
                    lingkungan sekitar.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg leading-8 text-white/80 text-justify">
                    Kami percaya bahwa disiplin adalah fondasi, loyalitas adalah
                    kekuatan, dan kepemimpinan adalah arah. Dengan nilai-nilai
                    tersebut, kami melangkah bersama menuju masa depan yang lebih
                    baik.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />
                  <div className="grid min-h-70 place-items-center p-4 sm:p-6">
                    <div className="relative w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-3">
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
                      <img
                        src={shieldLogo}
                        alt="Generation 6101 group or emblem"
                        className="w-full max-h-130 object-contain rounded-[18px] grayscale contrast-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 lg:p-8" id="chiefs">
              <SectionTitle title="Chief of Generation" />
              <div className="mt-5 flex items-center justify-between gap-3">
                <CarouselButton
                  direction="left"
                  onClick={() => scrollByAmount(chiefsRef, -1)}
                />
                <div className="flex-1" />
                <CarouselButton
                  direction="right"
                  onClick={() => scrollByAmount(chiefsRef, 1)}
                />
              </div>

              <div className="mt-4">
                <ScrollRow containerRef={chiefsRef}>
                  {chiefs.map((chief) => (
                    <div
                      key={chief.name}
                      className="snap-start min-w-[82%] sm:min-w-[48%] lg:min-w-[31%]"
                    >
                      <Card className="h-full p-4 sm:p-5">
                        <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_45%),rgba(255,255,255,0.03)]">
                          <div className="flex h-65 sm:h-75 items-end justify-center p-3">
                            <img
                              src={chief.image}
                              alt={chief.name}
                              className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
                            />
                          </div>
                        </div>
                        <div className="pt-4 text-center">
                          <h3 className="text-xl sm:text-2xl font-bold text-violet-200">
                            {chief.name}
                          </h3>
                          <p className="mt-1 text-sm sm:text-base text-white/70">
                            {chief.district}
                          </p>
                        </div>
                      </Card>
                    </div>
                  ))}
                </ScrollRow>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 lg:p-8" id="logo">
              <SectionTitle title="Our Logo" />
              <div className="mt-5 flex items-center justify-between gap-3">
                <CarouselButton
                  direction="left"
                  onClick={() => scrollByAmount(meaningsRef, -1)}
                />
                <div className="flex-1" />
                <CarouselButton
                  direction="right"
                  onClick={() => scrollByAmount(meaningsRef, 1)}
                />
              </div>

              <div className="mt-4">
                <ScrollRow containerRef={meaningsRef}>
                  {logoMeanings.map((item) => (
                    <div
                      key={item.title}
                      className="snap-start min-w-[86%] sm:min-w-[48%] lg:min-w-[31%]"
                    >
                      <Card className="h-full p-4 sm:p-5">
                        <div className="flex h-full items-center gap-4 sm:gap-5">
                          <div className="grid h-20 w-20 sm:h-24 sm:w-24 shrink-0 place-items-center rounded-full border border-violet-300/60 bg-white/5 text-violet-200 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                            <span className="text-3xl sm:text-4xl">{item.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-violet-200">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm sm:text-base leading-7 text-white/75">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </ScrollRow>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.2fr] gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 lg:p-8">
                <SectionTitle title="Our Maskot" />
                <div className="mt-4 flex items-center justify-center">
                  <div className="relative w-full max-w-85 aspect-square rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%),rgba(255,255,255,0.03)] overflow-hidden">
                    <div className="absolute inset-0 opacity-50 bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[16px_16px]" />
                    <div className="relative z-10 flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl">🧑‍🎓</div>
                        <p className="mt-4 text-base sm:text-lg font-semibold text-violet-200">
                          Mascot Placeholder
                        </p>
                        <p className="mt-1 text-sm text-white/65">
                          Ganti dengan maskot asli angkatan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 lg:p-8">
                <SectionTitle title="Status Board" />
                <div className="mt-6 space-y-5">
                  {statusBoard.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[130px_1fr_58px] gap-3 items-center"
                    >
                      <div className="flex items-center gap-3 text-white/85">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm sm:text-base">{item.label}</span>
                      </div>
                      <ProgressBar value={item.value} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-4 sm:p-6 lg:p-8">
              <SectionTitle title="Presentase Of Santri" />
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5 lg:gap-8 items-start">
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 text-center">
                  <p className="text-sm text-white/65">Total Santri</p>
                  <p className="mt-2 text-[clamp(2.8rem,5vw,4.5rem)] font-black leading-none text-violet-200">
                    120
                  </p>
                </div>

                <div className="space-y-5">
                  {santriStats.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[140px_1fr_56px] gap-3 items-center"
                    >
                      <div className="flex items-center gap-3 text-white/85">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm sm:text-base">{item.label}</span>
                      </div>
                      <ProgressBar value={item.value} />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 lg:p-8" id="contact">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-violet-300/60 bg-white/5 text-violet-200">
                      6101
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-semibold text-white/90">
                        © 2026 Generation 6101
                      </p>
                      <p className="text-sm text-white/60">
                        Built from memories, united forever.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {socials.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/5 text-violet-200 transition hover:scale-105 hover:border-violet-300/60 hover:bg-white/10"
                      aria-label={item.label}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </a>
                  ))}
                </div>

                <div className="text-sm sm:text-base text-white/80">Contact Us</div>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

export default OurGeneration;