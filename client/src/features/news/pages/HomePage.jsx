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
      {/* MAIN SLIDER - IMPERVIOUS CINEMATIC */}
      {/* ========================================== */}

      {/* ========================================== */}
      {/* MAIN SLIDER - IMPERVIOUS CINEMATIC */}
      {/* ========================================== */}

      <section
        className="
          relative
          min-w-full shrink-0
          overflow-hidden
          aspect-video
          h-[clamp(65rem,70vw,75rem)]
        "
      >
        {/* ========================================== */}
        {/* HERO SLIDES */}
        {/* ========================================== */}

        <div
          onTransitionEnd={mainCarousel.handleTransitionEnd}
          className={`relative z-20 pointer-events-none flex h-full w-full ${
            mainCarousel.transitionEnabled
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${mainCarousel.currentIndex * 100}%)`,
          }}
        >
          {mainCarousel.renderedSlides.map((slide, index) => {
            const duration = slide.duration ?? slide.time;

            return (
              <article
                key={index}
                className="
              relative
              h-full
              min-h-140
              min-w-full
              shrink-0
              overflow-hidden
              bg-transparent
            "
              >
                {/* ========================================== */}
                {/* SLIDE IMAGE — SAME PATTERN AS ROOT SLIDER */}
                {/* ========================================== */}

                <img
                  src={slide.image}
                  alt={slide.title}
                  className="
                    pointer-events-none
                    absolute inset-0 z-0
                    h-full w-full
                    object-cover object-center
                  "
                />

                {/* CINEMATIC OVERLAYS — TRAVEL WITH EACH SLIDE */}
                <div className="pointer-events-none absolute inset-0 z-1 bg-black/30" />
                <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-[#170e07] via-[#0d0500]/50 to-transparent" />
                <div
                  className="
                    pointer-events-none
                    absolute inset-0 z-1
                    bg-linear-to-r
                    from-[#100b07]
                    via-[#160d07]/50
                    via-45%
                    to-transparent
                  "
                />

                {/* ========================================== */}
                {/* CONTENT CONTAINER */}
                {/* ========================================== */}

                <div
                  className="
                absolute inset-0 z-10
                flex h-full w-full
                items-center
                py-12
                px-[clamp(4rem,7.5vw,25rem)]
              "
                >
                  <Link
                    to={slide.link || slide.buttonPrimary?.href || "/performances"}
                    aria-label={`Buka detail ${slide.title}`}
                    className="
                  pointer-events-auto
                  group
                  flex w-full
                  max-w-180
                  flex-col
                  items-start
                  text-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-marigold
                  focus-visible:ring-offset-4
                  focus-visible:ring-offset-[#160d07]
                "
                  >
                    {/* ========================================== */}
                    {/* 01. CATEGORY + DURATION */}
                    {/* ========================================== */}

                    <div
                      className="
                    mb-7
                    flex w-full
                    flex-wrap
                    items-center
                    gap-x-5
                    gap-y-3
                  "
                    >
                      {/* CATEGORY BADGE */}
                      <span
                        className="
                      inline-flex
                      min-h-10
                      items-center
                      gap-2.5
                      rounded-full
                      border border-marigold/65
                      bg-marigold/6
                      px-4 py-2
                      text-[clamp(.65rem,.8vw,.8rem)]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-[#f3bd54]
                      backdrop-blur-md
                    "
                      >
                        <span
                          className="
                        size-2
                        rounded-full
                        bg-marigold
                        shadow-[0_0_10px_#e3a419]
                      "
                        />

                        {slide.subtitle}
                      </span>

                      {/* DURATION */}
                      {duration && (
                        <>
                          <span
                            className="
                          hidden sm:block
                          h-7 w-px
                          bg-white/30
                        "
                          />

                          <div
                            className="
                          inline-flex
                          items-center
                          gap-3
                          text-white/85
                        "
                          >
                            {/* CLOCK ICON */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="
                            size-7
                            shrink-0
                            text-marigold
                          "
                              aria-hidden="true"
                            >
                              <circle cx="12" cy="12" r="9" />
                              <path d="M12 7v5l3 2" />
                            </svg>

                            <div
                              className="
                            flex items-baseline
                            gap-1.5
                          "
                            >
                              <span
                                className="
                              text-[clamp(.75rem,.9vw,.95rem)]
                              text-white/60
                            "
                              >
                                Durasi:
                              </span>

                              <time
                                className="
                              text-[clamp(.9rem,1.05vw,1.1rem)]
                              font-semibold
                              tracking-[0.08em]
                              tabular-nums
                              text-[#fff8ed]
                            "
                              >
                                {duration}
                              </time>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* ========================================== */}
                    {/* 02. DECORATIVE DIVIDER */}
                    {/* ========================================== */}

                    <div
                      className="
                    relative
                    mb-7
                    flex w-full
                    max-w-107.5
                    items-center
                  "
                    >
                      <span
                        className="
                      h-0.5 w-full
                      bg-linear-to-r
                      from-marigold
                      via-marigold/70
                      to-marigold/5
                    "
                      />

                      <span
                        className="
                      absolute left-[45%]
                      size-3.5
                      rotate-45
                      border-2
                      border-marigold
                      bg-[#160d07]
                    "
                      />
                    </div>

                    {/* ========================================== */}
                    {/* 03. TITLE */}
                    {/* ========================================== */}

                    <h1
                      className="
                    max-w-[12ch]
                    wrap-break-word
                    font-serif
                    font-semibold
                    text-[clamp(3rem,7.2vw,6.8rem)]
                    leading-[0.95]
                    tracking-[-0.055em]
                    text-[#fff8ed]
                    text-balance
                    drop-shadow-[0_5px_25px_rgba(0,0,0,0.3)]
                  "
                    >
                      {slide.title}
                    </h1>

                    {/* ========================================== */}
                    {/* 04. DESCRIPTION */}
                    {/* ========================================== */}

                    <p
                      className="
                    mt-7
                    max-w-135
                    text-[clamp(.9rem,1.1vw,1.1rem)]
                    font-normal
                    leading-[1.8]
                    tracking-[0.01em]
                    text-antiquewhite/80
                    text-pretty
                  "
                    >
                      {slide.description}
                    </p>

                    {/* ========================================== */}
                    {/* 05. READ MORE BUTTON */}
                    {/* ========================================== */}

                    <div className="mt-10">
                      <span
                        className="
                      pointer-events-auto
                      group
                      relative
                      inline-flex
                      min-h-14.5
                      items-center
                      justify-center
                      gap-8
                      overflow-hidden
                      rounded-md
                      border border-marigold
                      bg-linear-to-r
                      from-[#d9942c]
                      to-[#eeb047]
                      px-6 py-4
                      text-[clamp(.8rem,.95vw,1rem)]
                      font-bold
                      uppercase
                      tracking-widest
                      text-[#201306]
                      shadow-lg
                      shadow-black/20
                      transition-all
                      duration-300
                      hover:border-[#f5cd7e]
                      hover:brightness-110
                      hover:shadow-[0_8px_35px_rgba(227,164,25,0.2)]
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-marigold
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-[#160d07]
                    "
                      >
                        <span className="relative z-10">
                          {slide.buttonPrimary?.text || "Read More"}
                        </span>

                        {/* ARROW */}
                        <span
                          className="
                        relative z-10
                        flex size-8
                        items-center justify-center
                        border border-[#201306]/25
                        bg-[#201306]/5
                        transition-all duration-300
                        group-hover:translate-x-1
                        group-hover:bg-[#201306]
                        group-hover:text-[#f5cd7e]
                      "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-4"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </span>

                        {/* HOVER OVERLAY */}
                        <span
                          className="
                        pointer-events-none
                        absolute inset-0
                        -translate-x-full
                        bg-white/15
                        transition-transform
                        duration-500
                        group-hover:translate-x-0
                      "
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* PREV BUTTON */}
        {/* ========================================== */}

        <button
          type="button"
          onClick={mainCarousel.prevSlide}
          className="
        absolute left-2 top-1/2 z-20
        flex size-9
        -translate-y-1/2
        items-center justify-center
        rounded-full
        border border-white/10
        bg-black/40
        text-white
        backdrop-blur-md
        transition-all
        hover:border-marigold/50
        hover:bg-marigold
        hover:text-[#160d07]
        sm:left-4 sm:size-12
      "
          aria-label="Previous slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-5"
            aria-hidden="true"
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* ========================================== */}
        {/* NEXT BUTTON */}
        {/* ========================================== */}

        <button
          type="button"
          onClick={mainCarousel.nextSlide}
          className="
        absolute right-2 top-1/2 z-20
        flex size-9
        -translate-y-1/2
        items-center justify-center
        rounded-full
        border border-white/10
        bg-black/40
        text-white
        backdrop-blur-md
        transition-all
        hover:border-marigold/50
        hover:bg-marigold
        hover:text-[#160d07]
        sm:right-4 sm:size-12
      "
          aria-label="Next slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-5"
            aria-hidden="true"
          >
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* ========================================== */}
        {/* DOT INDICATOR */}
        {/* ========================================== */}

        <div
          className="
        absolute bottom-2 left-1/2 z-20
        flex -translate-x-1/2
        items-center gap-2.5
        shadow-lg
        backdrop-blur-xl
        sm:bottom-4
        sm:gap-2
        sm:px-4 sm:py-2
      "
        >
          {mainSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => mainCarousel.goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                mainCarousel.activeIndex === index ? "true" : undefined
              }
              className="
            flex h-5
            items-center justify-center
            focus:outline-none
          "
            >
              <span
                className={`
              block rounded-full
              transition-all duration-300
              ${
                mainCarousel.activeIndex === index
                  ? "h-2 w-8 bg-marigold shadow-[0_0_10px_rgba(227,164,25,0.4)]"
                  : "size-2 bg-white/40 hover:bg-white/80"
              }
            `}
              />
            </button>
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
    relative isolate shrink-0
    snap-start

    w-[clamp(18.5rem,30vw,31rem)]
        aspect-4/5
    landscape:aspect-square

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
    absolute inset-x-4 bottom-42 z-20
    flex flex-col gap-2

    sm:inset-x-5 sm:bottom-43
    lg:inset-x-6 lg:bottom-48
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
      wrap-break-word

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
      wrap-break-word

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
        leading-7
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
    glow-card isolate shrink-0
    snap-start

    w-[clamp(18.5rem,30vw,31rem)]
        aspect-4/5
    landscape:aspect-square

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
    absolute inset-x-4 bottom-42 z-20
    flex flex-col gap-2

    sm:inset-x-5 sm:bottom-43
    lg:inset-x-6 lg:bottom-48
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
      wrap-break-word

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
      wrap-break-word

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
        leading-7
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
              <Link
                key={index}
                to={slide.link || slide.buttonPrimary?.href || "/performances"}
                aria-label={`Buka detail ${slide.title}`}
                className="
                  group
                  relative
                  h-full
                  min-w-full
                  shrink-0
                  overflow-hidden
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-inset
                  focus-visible:ring-marigold
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
                      <span
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
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
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
    glow-card isolate shrink-0
    snap-start

    w-[clamp(18.5rem,30vw,31rem)]
        aspect-4/5
    landscape:aspect-square

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
    absolute inset-x-4 bottom-42 z-20
    flex flex-col gap-2

    sm:inset-x-5 sm:bottom-43
    lg:inset-x-6 lg:bottom-48
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
      wrap-break-word

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
      wrap-break-word

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
        leading-7
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
