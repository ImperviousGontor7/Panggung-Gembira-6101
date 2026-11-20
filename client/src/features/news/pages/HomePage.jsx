import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import hero from "../../../assets/images/Jami Emas.webp";

import { mainSlides } from "../data/MainSlide";
import { firstScrollbar } from "../data/Aurora Vanguard";
import { secondScrollbar } from "../data/Nusantara Legacy";
import { rootSlides } from "../data/RootSlide";
import { thirdScrollbar } from "../data/Imperial Ascendancy";

// ==========================================
// INFINITE CAROUSEL HOOK
// ==========================================

function useInfiniteCarousel(slides, autoPlayMs = 0) {
  const totalSlides = slides.length;

  const [currentIndex, setCurrentIndex] = useState(totalSlides > 1 ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // NEXT SLIDE
  const nextSlide = () => {
    if (totalSlides <= 1) return;

    setCurrentIndex((prev) => prev + 1);
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    if (totalSlides <= 1) return;

    setCurrentIndex((prev) => prev - 1);
  };

  // DOT INDICATOR
  const goToSlide = (index) => {
    if (totalSlides <= 1) return;

    setCurrentIndex(index + 1);
  };

  // INFINITE LOOP
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || totalSlides <= 1) return;

    // Kembali ke slide pertama
    if (currentIndex >= totalSlides + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }

    // Kembali ke slide terakhir
    if (currentIndex <= 0) {
      setTransitionEnabled(false);
      setCurrentIndex(totalSlides);
    }
  };

  // RESET POSITION WITHOUT ANIMATION
  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  // AUTO PLAY
  useEffect(() => {
    if (autoPlayMs <= 0 || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoPlayMs);

    return () => clearInterval(interval);
  }, [autoPlayMs, totalSlides]);

  // DUPLICATE FIRST AND LAST SLIDES
  const renderedSlides =
    totalSlides > 1 ? [slides[totalSlides - 1], ...slides, slides[0]] : slides;

  // ACTIVE DOT INDEX
  const activeIndex =
    totalSlides > 1 ? (currentIndex - 1 + totalSlides) % totalSlides : 0;

  return {
    currentIndex,
    activeIndex,
    renderedSlides,
    transitionEnabled,
    nextSlide,
    prevSlide,
    goToSlide,
    handleTransitionEnd,
  };
}

function Home() {
  // MAIN SLIDER
  const mainCarousel = useInfiniteCarousel(mainSlides, 5000);

  // ROOT SLIDER
  const rootCarousel = useInfiniteCarousel(rootSlides, 5000);

  // Glow Effect
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    card.style.setProperty("--opacity", "1");
  };

  const handleLeave = (e) => {
    e.currentTarget.style.setProperty("--opacity", "0");
  };

  if (!mainSlides.length) return null;

  return (
    <div id="view-beranda" className="view-pane active">
      {/* ========================================== */}
      {/* MAIN SLIDER */}
      {/* ========================================== */}

      <section className="relative w-full overflow-hidden">
        <div
          onTransitionEnd={mainCarousel.handleTransitionEnd}
          className={`flex w-full will-change-transform ${
            mainCarousel.transitionEnabled
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${mainCarousel.currentIndex * 100}%)`,
          }}
        >
          {mainCarousel.renderedSlides.map((slide, index) => (
            <article
              key={index}
              className="
                relative
                h-[clamp(24rem,65vh,48rem)]
                min-w-full
                overflow-hidden
              "
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-black/55" />

              <div className="absolute inset-0 bg-linear-to-t from-bg-main via-transparent to-transparent" />

              <div
                className="
                  relative z-10
                  flex h-full items-center justify-center
                  px-4 py-14
                  sm:px-6 sm:py-16
                  md:px-8
                  lg:px-10 lg:py-20
                "
              >
                <div className="w-full max-w-272 text-center text-white">
                  <p
                    className="
                      mb-2
                      text-[clamp(.7rem,.9vw,.95rem)]
                      font-medium uppercase
                      tracking-[0.18em]
                      text-white/70
                      sm:mb-3 sm:tracking-[0.25em]
                      lg:tracking-[0.35em]
                    "
                  >
                    {slide.subtitle}
                  </p>

                  <h1
                    className="
                      mx-auto max-w-232
                      wrap-break-word
                      text-[clamp(2rem,7vw,6rem)]
                      font-bold
                      leading-[1.05]
                    "
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="
                      mx-auto
                      mt-[clamp(.9rem,1.5vw,1.4rem)]
                      max-w-2xl
                      text-[clamp(.95rem,1.2vw,1.25rem)]
                      leading-relaxed
                      text-white/75
                    "
                  >
                    {slide.description}
                  </p>

                  <div
                    className="
                      mt-[clamp(1.25rem,2vw,2rem)]
                      flex flex-wrap justify-center
                      gap-3
                      sm:gap-4
                    "
                  >
                    <Link
                      to={slide.buttonPrimary.href}
                      className="
                        inline-flex items-center justify-center
                        rounded-full bg-white
                        px-[clamp(1.25rem,3vw,2.5rem)]
                        py-[clamp(.7rem,1vw,1rem)]
                        text-[clamp(.875rem,1vw,1rem)]
                        font-semibold text-black
                        text-center
                        transition duration-300
                        hover:scale-105 hover:bg-white/90
                        focus:outline-none focus-visible:ring-2
                        focus-visible:ring-white/80
                      "
                    >
                      {slide.buttonPrimary.text}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PREVIOUS BUTTON */}
        <button
          onClick={mainCarousel.prevSlide}
          aria-label="Previous slide"
          className="
            absolute left-2 top-1/2 z-20
            flex size-11 -translate-y-1/2
            items-center justify-center
            rounded-full bg-black/40 text-white
            backdrop-blur-md transition
            hover:bg-black/60
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-white/80
            sm:left-3 sm:size-12
            lg:left-4
          "
        >
          <span className="block text-lg leading-none sm:text-xl">←</span>
        </button>

        {/* NEXT BUTTON */}
        <button
          onClick={mainCarousel.nextSlide}
          aria-label="Next slide"
          className="
            absolute right-2 top-1/2 z-20
            flex size-11 -translate-y-1/2
            items-center justify-center
            rounded-full bg-black/40 text-white
            backdrop-blur-md transition
            hover:bg-black/60
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-white/80
            sm:right-3 sm:size-12
            lg:right-4
          "
        >
          <span className="block text-lg leading-none sm:text-xl">→</span>
        </button>

        {/* DOT INDICATOR */}
        <div
          className="
            absolute bottom-3 left-1/2 z-20
            flex -translate-x-1/2 items-center gap-2
            sm:bottom-4
            md:bottom-5
          "
        >
          {mainSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => mainCarousel.goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                mainCarousel.activeIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* AURORA VANGUARD */}
      {/* ========================================== */}

      <div
        className="
        relative z-10 mx-auto
        my-[clamp(4.5rem,7.5vw,15rem)]
        w-full max-w-500
        px-5 sm:px-8
      "
      >
        <div className="mx-auto my-8 w-full sm:my-10 lg:my-12">
          <h3
            className="
              mb-4
              text-[clamp(1.25rem,2vw,2.5rem)]
              sm:mb-5
            "
          >
            Aurora Vanguard
          </h3>

          <div
            className="
              scrollbar-hidden
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              snap-x snap-mandatory
              py-4 sm:py-5
            "
          >
            <div
              className="
                mx-0 flex w-max min-w-full
                items-stretch
                gap-4
                sm:gap-5
                lg:gap-8
              "
            >
              {firstScrollbar.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
    glow-card
    relative isolate shrink-0
    snap-start

    w-[clamp(15rem,30vw,30rem)]
    aspect-[4/5]

    overflow-hidden
    rounded-3xl
    border border-white/10
    bg-choco

    transition-all duration-300
    hover:z-10
    hover:-translate-y-2
    hover:shadow-2xl
    sm:hover:-translate-y-4
  "
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full select-none object-cover object-center"
                    />

                    <div
                      className="
        absolute inset-0 h-full w-full
        bg-linear-to-t from-choco to-choco/25
      "
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="
      absolute inset-0
      bg-linear-to-t
      from-choco
      via-choco/35
      to-transparent
    "
                  />

                  {/* BADGES - FLEX COLUMN */}
                  <div
                    className="
    absolute inset-x-4 bottom-[10.5rem] z-20
    flex flex-col gap-2

    sm:inset-x-5 sm:bottom-[10.75rem]
    lg:inset-x-6 lg:bottom-[11rem]
  "
                  >
                    {/* BADGE 1 - EVENT TIME */}
                    <span
                      className="
      inline-flex
      w-fit max-w-[85%]
      min-h-8
      self-end
      items-center justify-center

      overflow-hidden
      rounded-lg
      bg-honey/90
      px-3 py-2

      text-xs
      font-semibold
      tracking-wide
      text-white
      text-center
      break-words

      shadow-md
      backdrop-blur-md
    "
                    >
                      {item.time}
                    </span>

                    {/* BADGE 2 - EVENT CATEGORY */}
                    <span
                      className="
      inline-flex
      w-fit max-w-[85%]
      min-h-8
      self-start
      items-center justify-center

      overflow-hidden
      rounded-lg
      border border-white/15
      bg-white/10
      px-3 py-2

      text-xs
      font-medium
      tracking-wide
      text-white/90
      text-center
      break-words

      backdrop-blur-md
    "
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div
                    className="
      absolute inset-x-0 bottom-0 z-10

      grid
      grid-rows-[4rem_4.5rem]
      gap-y-2

      p-4
      text-white
      sm:p-5
      lg:p-6
    "
                  >
                    {/* TITLE */}
                    <h2
                      className="
        h-full min-w-0 overflow-hidden
        text-white
        text-[clamp(1.15rem,1.35vw,1.6rem)]
        font-bold
        leading-[1.75rem]
        line-clamp-2
      "
                    >
                      {item.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className="
        h-full min-w-0 overflow-hidden
        text-[clamp(.8rem,.7vw,1rem)]
        leading-6
        text-white/60
        line-clamp-3
      "
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* NUSANTARA LEGACY */}
      {/* ========================================== */}

      <div
        className="
        relative z-10 mx-auto
        my-[clamp(4.5rem,7.5vw,15rem)]
        w-full max-w-500
        px-5 sm:px-8
      "
      >
        <div className="mx-auto my-8 w-full sm:my-10 lg:my-12">
          <h3
            className="
              mb-4
              text-[clamp(1.25rem,2vw,2.5rem)]
              sm:mb-5
            "
          >
            Nusantara Legacy
          </h3>

          <div
            className="
              scrollbar-hidden
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              snap-x snap-mandatory
              py-4 sm:py-5
            "
          >
            <div
              className="
                mx-0 flex w-max min-w-full
                items-stretch
                gap-4
                sm:gap-5
                lg:gap-8
              "
            >
              {secondScrollbar.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
    glow-card
    relative isolate shrink-0
    snap-start

    w-[clamp(15rem,30vw,30rem)]
    aspect-[4/5]

    overflow-hidden
    rounded-3xl
    border border-white/10
    bg-choco

    transition-all duration-300
    hover:z-10
    hover:-translate-y-2
    hover:shadow-2xl
    sm:hover:-translate-y-4
  "
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full select-none object-cover object-center"
                    />

                    <div
                      className="
        absolute inset-0 h-full w-full
        bg-linear-to-t from-choco to-choco/25
      "
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="
      absolute inset-0
      bg-linear-to-t
      from-choco
      via-choco/35
      to-transparent
    "
                  />

                  {/* BADGES - FLEX COLUMN */}
                  <div
                    className="
    absolute inset-x-4 bottom-[10.5rem] z-20
    flex flex-col gap-2

    sm:inset-x-5 sm:bottom-[10.75rem]
    lg:inset-x-6 lg:bottom-[11rem]
  "
                  >
                    {/* BADGE 1 - EVENT TIME */}
                    <span
                      className="
      inline-flex
      w-fit max-w-[85%]
      min-h-8
      self-end
      items-center justify-center

      overflow-hidden
      rounded-lg
      bg-honey/90
      px-3 py-2

      text-xs
      font-semibold
      tracking-wide
      text-white
      text-center
      break-words

      shadow-md
      backdrop-blur-md
    "
                    >
                      {item.time}
                    </span>

                    {/* BADGE 2 - EVENT CATEGORY */}
                    <span
                      className="
      inline-flex
      w-fit max-w-[85%]
      min-h-8
      self-start
      items-center justify-center

      overflow-hidden
      rounded-lg
      border border-white/15
      bg-white/10
      px-3 py-2

      text-xs
      font-medium
      tracking-wide
      text-white/90
      text-center
      break-words

      backdrop-blur-md
    "
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div
                    className="
      absolute inset-x-0 bottom-0 z-10

      grid
      grid-rows-[4rem_4.5rem]
      gap-y-2

      p-4
      text-white
      sm:p-5
      lg:p-6
    "
                  >
                    {/* TITLE */}
                    <h2
                      className="
        h-full min-w-0 overflow-hidden
        text-white
        text-[clamp(1.15rem,1.35vw,1.6rem)]
        font-bold
        leading-[1.75rem]
        line-clamp-2
      "
                    >
                      {item.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className="
        h-full min-w-0 overflow-hidden
        text-[clamp(.8rem,.7vw,1rem)]
        leading-6
        text-white/60
        line-clamp-3
      "
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* ROOT SLIDER */}
      {/* ========================================== */}

      <div
        className="
        relative z-10 mx-auto
        my-[clamp(4.5rem,7.5vw,15rem)]
        w-full max-w-500
        px-5 sm:px-8
      "
      >
        <section
          className="
            relative
            aspect-video
            w-full
            overflow-hidden
            rounded-3xl
            border
            sm:rounded-4xl
          "
        >
          {/* HERO SLIDES */}
          <div
            onTransitionEnd={rootCarousel.handleTransitionEnd}
            className={`flex h-full w-full ${
              rootCarousel.transitionEnabled
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${rootCarousel.currentIndex * 100}%)`,
            }}
          >
            {rootCarousel.renderedSlides.map((slide, index) => (
              <div
                key={index}
                className="
                  relative
                  h-full
                  min-w-full
                  shrink-0
                  overflow-hidden
                "
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="
                    absolute inset-0
                    h-full w-full
                    object-cover object-center
                  "
                />

                <div className="absolute inset-0 bg-black/60" />

                <div
                  className="
                    absolute inset-0
                    bg-linear-to-r
                    from-bg-main
                    via-[#0d0500]/75
                    to-transparent
                  "
                />

                <div
                  className="
                    absolute inset-0 z-10
                    flex h-full w-full
                    items-center justify-center
                    px-4 py-4
                    sm:px-8 sm:py-6
                    lg:px-12
                  "
                >
                  <div className="w-full max-w-4xl text-center text-white">
                    <p
                      className="
                        mb-2
                        text-[clamp(.65rem,1vw,.875rem)]
                        tracking-[0.15em]
                        text-white/70
                        sm:mb-4
                        sm:tracking-[0.35em]
                        lg:tracking-[0.5em]
                      "
                    >
                      {slide.subtitle}
                    </p>

                    <h1
                      className="
                        wrap-break-word
                        text-[clamp(1.5rem,7vw,6rem)]
                        font-bold
                        leading-tight
                      "
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="
                        mx-auto
                        mt-2
                        max-w-2xl
                        text-[clamp(.75rem,1.2vw,1.25rem)]
                        leading-relaxed
                        text-white/75
                        sm:mt-5
                      "
                    >
                      {slide.description}
                    </p>

                    <div
                      className="
                        mt-3
                        flex flex-wrap justify-center
                        gap-3
                        sm:mt-8 sm:gap-4
                      "
                    >
                      <Link
                        to={slide.buttonPrimary.href}
                        className="
                          inline-flex
                          items-center justify-center
                          rounded-full
                          bg-white
                          px-[clamp(1rem,3vw,2.5rem)]
                          py-[clamp(.5rem,1vw,1rem)]
                          text-[clamp(.75rem,1vw,1rem)]
                          font-semibold
                          text-center
                          text-black
                          transition
                          hover:scale-105
                          hover:bg-white/90
                        "
                      >
                        {slide.buttonPrimary.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PREV BUTTON */}
          <button
            onClick={rootCarousel.prevSlide}
            className="
              absolute left-2 top-1/2 z-20
              flex size-9 -translate-y-1/2
              items-center justify-center
              rounded-full bg-black/40
              text-white
              backdrop-blur-md
              transition
              hover:bg-black/60
              sm:left-4 sm:size-12
            "
            aria-label="Previous slide"
          >
            ←
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={rootCarousel.nextSlide}
            className="
              absolute right-2 top-1/2 z-20
              flex size-9 -translate-y-1/2
              items-center justify-center
              rounded-full bg-black/40
              text-white
              backdrop-blur-md
              transition
              hover:bg-black/60
              sm:right-4 sm:size-12
            "
            aria-label="Next slide"
          >
            →
          </button>

          {/* DOT INDICATOR */}
          <div
            className="
              absolute bottom-2 left-1/2 z-20
              flex -translate-x-1/2
              items-center gap-2
              sm:bottom-4
              md:bottom-5
            "
          >
            {rootSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => rootCarousel.goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  rootCarousel.activeIndex === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* ========================================== */}
      {/* IMPERIAL ASCENDANCY */}
      {/* ========================================== */}

      <div
        className="
        relative z-10 mx-auto
        my-[clamp(4.5rem,7.5vw,15rem)]
        w-full max-w-500
        px-5 sm:px-8
      "
      >
        <div className="mx-auto my-8 w-full sm:my-10 lg:my-12">
          <h3
            className="
              mb-4
              text-[clamp(1.25rem,2vw,2.5rem)]
              sm:mb-5
            "
          >
            Imperial Ascendancy
          </h3>

          <div
            className="
              scrollbar-hidden
              overflow-x-auto overflow-y-hidden
              scroll-smooth
              snap-x snap-mandatory
              py-4 sm:py-5
            "
          >
            <div
              className="
                mx-0 flex w-max min-w-full
                items-stretch
                gap-4
                sm:gap-5
                lg:gap-8
              "
            >
              {thirdScrollbar.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
    glow-card
    relative isolate shrink-0
    snap-start

    w-[clamp(15rem,30vw,30rem)]
    aspect-[4/5]

    overflow-hidden
    rounded-3xl
    border border-white/10
    bg-choco

    transition-all duration-300
    hover:z-10
    hover:-translate-y-2
    hover:shadow-2xl
    sm:hover:-translate-y-4
  "
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full select-none object-cover object-center"
                    />

                    <div
                      className="
        absolute inset-0 h-full w-full
        bg-linear-to-t from-choco to-choco/25
      "
                    />
                  </div>

                  {/* OVERLAY */}
                  <div
                    className="
      absolute inset-0
      bg-linear-to-t
      from-choco
      via-choco/35
      to-transparent
    "
                  />

                  {/* BADGES - FLEX COLUMN */}
                  <div
                    className="
    absolute inset-x-4 bottom-[10.5rem] z-20
    flex flex-col gap-2

    sm:inset-x-5 sm:bottom-[10.75rem]
    lg:inset-x-6 lg:bottom-[11rem]
  "
                  >
                    {/* BADGE 1 - EVENT TIME */}
                    <span
                      className="
      inline-flex
      w-fit max-w-[85%]
      min-h-8
      self-end
      items-center justify-center

      overflow-hidden
      rounded-lg
      bg-honey/90
      px-3 py-2

      text-xs
      font-semibold
      tracking-wide
      text-white
      text-center
      break-words

      shadow-md
      backdrop-blur-md
    "
                    >
                      {item.time}
                    </span>

                    {/* BADGE 2 - EVENT CATEGORY */}
                    <span
                      className="
      inline-flex
      w-fit max-w-[85%]
      min-h-8
      self-start
      items-center justify-center

      overflow-hidden
      rounded-lg
      border border-white/15
      bg-white/10
      px-3 py-2

      text-xs
      font-medium
      tracking-wide
      text-white/90
      text-center
      break-words

      backdrop-blur-md
    "
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div
                    className="
      absolute inset-x-0 bottom-0 z-10

      grid
      grid-rows-[4rem_4.5rem]
      gap-y-2

      p-4
      text-white
      sm:p-5
      lg:p-6
    "
                  >
                    {/* TITLE */}
                    <h2
                      className="
        h-full min-w-0 overflow-hidden
        text-white
        text-[clamp(1.15rem,1.35vw,1.6rem)]
        font-bold
        leading-[1.75rem]
        line-clamp-2
      "
                    >
                      {item.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className="
        h-full min-w-0 overflow-hidden
        text-[clamp(.8rem,.7vw,1rem)]
        leading-6
        text-white/60
        line-clamp-3
      "
                    >
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
