import { useRef } from "react";

import Shield from "../../../assets/images/10. Panggung Gembira/Main Hero.webp";
import Ico from "../../../assets/logos/impervious-shield.webp";

import Card from "../generation/ActorCard";
import SectionTitle from "../generation/SectionTitle";
import ScrollRow from "../generation/ScrollRow";
import CarouselButton from "../generation/CarouselButton";

import { shieldLogo, chiefs, logoMeanings } from "../generation/GenerationData";

import { timelineEvents } from "../generation/TmelineData";

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
                <div className="p-[clamp(1.25rem,2vw,2.5rem)] border border-white/35 rounded-4xl my-25">
                  <h2 className="text-center text-[clamp(1.4rem,2vw,2rem)] font-extrabold uppercase tracking-[0.12em] text-violet-300">
                    About Panggung Gembira
                  </h2>

                  <div className="mx-auto mt-3 h-px w-24 bg-violet-400/60" />

                  <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1.05fr_1.4fr] lg:gap-8">
                    <div className="space-y-5">

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

              {/* CHIEF OF GENERATION */}
              <Card
                className="p-4 sm:p-6 lg:p-8  border border-white/35 rounded-4xl my-25"
                id="chiefs"
              >
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

              {/* MEMBER OF COMMITTEE */}
              <Card
                className="p-4 sm:p-6 lg:p-8 border border-white/35 rounded-4xl my-25"
                id="committee"
              >
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

              

{/* ========================================== */}
{/* TIMELINE KEGIATAN */}
{/* ========================================== */}

<Card
  className="overflow-hidden border border-marigold/15"
  id="timeline"
>
  <section className="relative isolate overflow-hidden px-5 py-[clamp(3.5rem,7vw,6.5rem)] sm:px-8">

    {/* BACKGROUND GLOW */}
    <div
      className="
        pointer-events-none absolute
        -top-40 left-1/2 -z-10
        h-80 w-[70%]
        -translate-x-1/2
        rounded-full
        bg-marigold/4.5
        blur-[100px]
      "
    />

    {/* HEADER */}
    <header className="relative mb-14 text-center sm:mb-16">

      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-marigold/50" />

        <span className="font-visby text-[10px] font-semibold uppercase tracking-[0.3em] text-marigold sm:text-xs">
          Rangkaian Acara
        </span>

        <span className="h-px w-8 bg-marigold/50" />
      </div>

      <h2 className="font-zhoro text-[clamp(2.1rem,5vw,3.75rem)] leading-[1.1] uppercase tracking-[0.035em] text-antiquewhite">
        Timeline{" "}
        <span className="text-marigold">
          Kegiatan
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-lg font-visby text-sm leading-7 text-antiquewhite/55 sm:text-base">
        Jejak perjalanan dan rangkaian kegiatan
        menuju malam puncak Panggung Gembira.
      </p>
    </header>

    {/* ========================================== */}
    {/* TIMELINE TRACK */}
    {/* ========================================== */}

    <div
      className="
        relative mx-auto
        grid max-w-330
        grid-cols-6
        max-lg:grid-cols-1
      "
    >

      {/* HORIZONTAL / VERTICAL LINE */}
      <div
        className="
          pointer-events-none absolute z-0
          left-[8.333%] right-[8.333%]
          top-1/2 h-px
          -translate-y-1/2
          bg-linear-to-r
          from-transparent
          via-marigold/40
          to-transparent

          max-lg:left-1.75
          max-lg:right-auto
          max-lg:top-0
          max-lg:bottom-0
          max-lg:h-auto
          max-lg:w-px
          max-lg:translate-y-0
          max-lg:bg-linear-to-b
        "
      />

      {/* SIX TIMELINE POINTS */}
      {timelineEvents.map((event, index) => (

        <div
          key={event.id}
          className="
            relative z-10
            grid min-h-130
            grid-rows-[1fr_18px_1fr]

            max-lg:min-h-0
            max-lg:grid-cols-[16px_minmax(0,1fr)]
            max-lg:grid-rows-1
            max-lg:gap-x-5
            max-lg:py-8
          "
        >

          {/* EVENT CONTENT */}
          <article
            className={`
              group flex flex-col
              items-center
              px-3
              text-center

              ${
                event.position === "top"
                  ? "row-start-1 justify-end pb-9"
                  : "row-start-3 justify-start pt-9"
              }

              max-lg:col-start-2
              max-lg:row-start-1
              max-lg:items-start
              max-lg:justify-start
              max-lg:pt-0
              max-lg:pb-0
              max-lg:px-0
              max-lg:text-left
            `}
          >

            {/* EVENT NUMBER */}
            <span className="mb-3 font-visby text-[9px] font-semibold tracking-[0.18em] text-marigold/65 transition-colors duration-300 group-hover:text-marigold">
              EVENT / {String(index + 1).padStart(2, "0")}
            </span>

            {/* DATE */}
            <span className="mb-2 font-visby text-[9px] font-semibold uppercase tracking-[0.17em] text-marigold sm:text-[10px]">
              {event.date}
            </span>

            {/* TITLE */}
            <h3 className="w-full max-w-47.5 font-zhoro text-[clamp(1.2rem,1.8vw,1.65rem)] font-semibold uppercase leading-[1.2] text-antiquewhite transition-colors duration-300 group-hover:text-marigold">
              {event.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="mt-4 w-full max-w-47.5 font-visby text-xs leading-[1.8] text-antiquewhite/60">
              {event.description}
            </p>

            {/* STATUS */}
            <div
              className="
                mt-5 inline-flex
                max-w-full items-center gap-2
                rounded-full
                border border-marigold/20
                bg-marigold/4.5
                px-2.5 py-1.5
              "
            >
              <span
                className={`
                  size-1.5 shrink-0 rounded-full
                  ${
                    event.active
                      ? "bg-marigold shadow-[0_0_8px_2px_rgba(227,164,25,0.4)]"
                      : "bg-marigold/50"
                  }
                `}
              />

              <span className="font-visby text-[8px] font-semibold tracking-[0.04em] text-marigold sm:text-[9px]">
                {event.status}
              </span>
            </div>

          </article>

          {/* TIMELINE MARKER */}
          <div
            className="
              col-start-1 row-start-2
              z-20 grid place-items-center

              max-lg:col-start-1
              max-lg:row-start-1
              max-lg:self-start
              max-lg:mt-1
            "
          >
            <span
              className={`
                relative block size-3
                rounded-full ring-4
                transition-all duration-500

                ${
                  event.active
                    ? `
                      bg-antiquewhite
                      ring-antiquewhite/10
                      shadow-[0_0_18px_5px_rgba(242,227,208,0.22)]
                    `
                    : `
                      bg-marigold
                      ring-marigold/10
                      shadow-[0_0_14px_3px_rgba(227,164,25,0.15)]
                    `
                }
              `}
            />
          </div>

        </div>
      ))}

    </div>

    {/* FOOTER */}
    <div className="mx-auto mt-7 flex max-w-275 items-center justify-center gap-3">
      <span className="h-px w-8 bg-marigold/20" />

      <span className="font-visby text-[9px] font-medium uppercase tracking-[0.25em] text-antiquewhite/35">
        Impervious Generation
      </span>

      <span className="h-px w-8 bg-marigold/20" />
    </div>

  </section>
</Card>



              {/* ABOUT OUR LOGO */}
              <Card
                className="p-4 sm:p-6 lg:p-8 border border-white/35 rounded-4xl my-25"
                id="about-logo"
              >
                <h2 className="text-center text-[clamp(1.4rem,2vw,2rem)] font-extrabold uppercase tracking-[0.12em] text-violet-300">
                  About Our Logo
                </h2>

                <div className="mx-auto mt-3 h-px w-24 bg-violet-400/60" />

                <div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
                  <div className="relative flex aspect-5/4 w-full items-center justify-center overflow-hidden p-6">
                    <img
                      src={Ico}
                      alt="Impervious Generation shield logo"
                      className="relative z-10 aspect-4/5 landscape:aspect-square w-[75%] max-h-112 object-contain grayscale contrast-125"
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
              <Card
                className="p-4 sm:p-6 lg:p-8 border border-white/35 rounded-4xl my-25"
                id="logo"
              >
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
