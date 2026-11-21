import { useRef } from "react";

import Shield from "../../../assets/images/10. Panggung Gembira/Main Hero.webp";
import Ico from "../../../assets/logos/impervious-shield.webp";

import Card from "../generation/ActorCard";
import SectionTitle from "../generation/SectionTitle";
import ScrollRow from "../generation/ScrollRow";
import CarouselButton from "../generation/CarouselButton";

import { shieldLogo, chiefs, logoMeanings } from "../generation/GenerationData";

function OurGeneration() {
  const chiefsRef = useRef(null);
  const meaningsRef = useRef(null);

  const scrollByAmount = (ref, direction) => {
    const container = ref.current;
    if (!container) return;

    container.scrollBy({
      left: direction * Math.max(320, container.clientWidth * 0.85),
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="relative">
        {/* HERO */}
        <Card className="overflow-hidden" id="home">
          <div className="relative h-[clamp(20rem,50vh,60rem)]">
            <img
              src={Shield}
              alt="Jami Emas, Gontor Campus 7"
              className="absolute inset-0 h-full w-full object-cover object-center"
              fetchPriority="high"
            />

            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-linear-to-t from-[#170e07] via-[#0d0500]/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-10 text-center sm:py-16">
              <p className="text-sm uppercase tracking-[0.55em] text-violet-200/85 sm:text-base lg:text-lg">
                About
              </p>
              <h1 className="mt-2 bg-linear-to-b from-white via-violet-200 to-violet-500 bg-clip-text text-[clamp(4rem,10vw,8.5rem)] font-black leading-none tracking-widest text-transparent drop-shadow-[0_0_24px_rgba(168,85,247,0.16)]">
                6101
              </h1>
              <div className="mt-4 h-px w-20 bg-violet-300/60" />
              <p className="mt-4 max-w-2xl text-sm italic text-white/85 sm:text-base lg:text-lg">
                “Built from memories, united forever.”
              </p>
            </div>
          </div>
        </Card>
        <div
          className="
        relative z-10 mx-auto
        my-[clamp(4.5rem,7.5vw,15rem)]
        w-full max-w-500
        px-5 sm:px-8
      "
        >
          <div className="relative z-10 mx-auto my-[clamp(4.5rem,7.5vw,15rem)] w-full max-w-[2000px] px-5 sm:px-8">
            <main className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
              {/* ABOUT OUR GENERATION */}
              <Card id="about">
                <div className="p-[clamp(1.25rem,2vw,2.5rem)]">
                  <h2 className="text-center text-[clamp(1.4rem,2vw,2rem)] font-extrabold uppercase tracking-[0.12em] text-violet-300">
                    About Panggung Gembira
                  </h2>
                  <div className="mx-auto mt-3 h-px w-24 bg-violet-400/60" />
                  <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1.05fr_1.4fr] lg:gap-8">
                    <div className="space-y-5">
                      <div></div>

                      <p className="text-justify text-sm leading-8 text-white/80 sm:text-base lg:text-lg">
                        Generation 6101 adalah angkatan yang dibentuk dari
                        semangat, dedikasi, dan perjalanan panjang penuh makna.
                        Kami hadir bukan hanya untuk belajar, tetapi untuk
                        tumbuh, berproses, dan menjadi pribadi yang berkarakter
                        serta bermanfaat bagi lingkungan sekitar.
                      </p>

                      <p className="text-justify text-sm leading-8 text-white/80 sm:text-base lg:text-lg">
                        Kami percaya bahwa disiplin adalah fondasi, loyalitas
                        adalah kekuatan, dan kepemimpinan adalah arah. Dengan
                        nilai-nilai tersebut, kami melangkah bersama menuju masa
                        depan yang lebih baik.
                      </p>
                    </div>

                    <div className="relative overflow-hidden object-contain p-[clamp(1.25rem,2vw,2.5rem)]">
                      <img
                        src={shieldLogo}
                        alt="Emblem Generation 6101"
                        className="relative w-full rounded-[18px] object-contain grayscale contrast-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* CHIEF OF GENERATION — single carousel */}
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
                        className="min-w-[82%] snap-start sm:min-w-[48%] lg:min-w-[31%]"
                      >
                        <Card className="h-full p-4 sm:p-5">
                          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_45%),rgba(255,255,255,0.03)]">
                            <div className="flex h-65 items-end justify-center p-3 sm:h-75">
                              <img
                                src={chief.image}
                                alt={chief.name}
                                className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div className="pt-4 text-center">
                            <h3 className="text-xl font-bold text-violet-200 sm:text-2xl">
                              {chief.name}
                            </h3>
                            <p className="mt-1 text-sm text-white/70 sm:text-base">
                              {chief.district}
                            </p>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </ScrollRow>
                </div>
              </Card>

              {/* CHIEF OF GENERATION — single carousel */}
              <Card className="p-4 sm:p-6 lg:p-8" id="chiefs">
                <SectionTitle title="Member Of Committee" />

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
                        className="min-w-[82%] snap-start sm:min-w-[48%] lg:min-w-[31%]"
                      >
                        <Card className="h-full p-4 sm:p-5">
                          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.16),transparent_45%),rgba(255,255,255,0.03)]">
                            <div className="flex h-65 items-end justify-center p-3 sm:h-75">
                              <img
                                src={chief.image}
                                alt={chief.name}
                                className="h-full w-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
                                loading="lazy"
                              />
                            </div>
                          </div>
                          <div className="pt-4 text-center">
                            <h3 className="text-xl font-bold text-violet-200 sm:text-2xl">
                              {chief.name}
                            </h3>
                            <p className="mt-1 text-sm text-white/70 sm:text-base">
                              {chief.district}
                            </p>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </ScrollRow>
                </div>
              </Card>

              <Card>

                    {/* Tempat menaruh card yang saya minta */}

              </Card>

              {/* ABOUT OUR LOGO */}
              <Card className="p-4 sm:p-6 lg:p-8" id="about-logo">
                <h2 className="text-center text-[clamp(1.4rem,2vw,2rem)] font-extrabold uppercase tracking-[0.12em] text-violet-300">
                  About Our Logo
                </h2>
                <div className="mx-auto mt-3 h-px w-24 bg-violet-400/60" />

                <div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
                  <div className="relative flex w-full aspect-5/4 items-center justify-center overflow-hidden p-6">
                    <img
                      src={Ico}
                      alt="Impervious Generation shield logo"
                      className="relative z-10     aspect-4/5
    landscape:aspect-square w-[75%] max-h-112 object-contain grayscale contrast-125"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="my-2.5 text-justify text-sm leading-8 text-white/80 sm:text-base lg:text-lg">
                      Generation 6101 adalah angkatan yang dibentuk dari
                      semangat, dedikasi, dan perjalanan panjang penuh makna.
                      Kami hadir bukan hanya untuk belajar, tetapi untuk tumbuh,
                      berproses, dan menjadi pribadi yang berkarakter serta
                      bermanfaat bagi lingkungan sekitar.
                    </p>

                    <p className="my-2.5 text-justify text-sm leading-8 text-white/80 sm:text-base lg:text-lg">
                      Kami percaya bahwa disiplin adalah fondasi, loyalitas
                      adalah kekuatan, dan kepemimpinan adalah arah. Dengan
                      nilai-nilai tersebut, kami melangkah bersama menuju masa
                      depan yang lebih baik.
                    </p>
                  </div>
                </div>
              </Card>

              {/* LOGO MEANINGS CAROUSEL */}
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
                        className="min-w-[86%] snap-start sm:min-w-[48%] lg:min-w-[31%]"
                      >
                        <Card className="h-full p-4 sm:p-5">
                          <div className="flex h-full items-center gap-4 sm:gap-5">
                            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-violet-300/60 bg-white/5 text-violet-200 shadow-[0_0_30px_rgba(168,85,247,0.15)] sm:h-24 sm:w-24">
                              <span className="text-3xl sm:text-4xl">
                                {item.icon}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold uppercase tracking-[0.08em] text-violet-200 sm:text-xl">
                                {item.title}
                              </h3>
                              <p className="mt-2 text-sm leading-7 text-white/75 sm:text-base">
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
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurGeneration;
