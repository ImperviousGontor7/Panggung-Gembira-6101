import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import hero from "../../../assets/images/Jami Emas.webp";

import { mainSlides } from "../data/MainSlide";
import { firstScrollbar } from "../data/Aurora Vanguard";
import { secondScrollbar } from "../data/Nusantara Legacy";
import { rootSlides } from "../data/RootSlide";
import { thirdScrollbar } from "../data/Imperial Ascendancy";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mainSlides.length);
  };

  // Previous
  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + mainSlides.length) % mainSlides.length,
    );
  };

  // Dot Indicator
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto Slide
  useEffect(() => {
    if (!mainSlides.length) return;

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

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
      {/* MAIN SLIDER */}
      <section className="relative w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mainSlides.map((slide, index) => (
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
          onClick={prevSlide}
          aria-label="Previous slide"
          className="
            absolute left-2 top-1/2 z-20
            flex size-11 -translate-y-1/2 items-center justify-center
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
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute right-2 top-1/2 z-20
            flex size-11 -translate-y-1/2 items-center justify-center
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
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </section>

      {/* AURORA VANGUARD */}
      <div
        className="
          relative z-10 mx-auto
          mb-16 w-full max-w-[2000px]
          px-4
          sm:mb-20 sm:px-6
          lg:mb-28 lg:px-8
          2xl:px-10
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
                    glow-card isolate shrink-0
                    snap-start

                    w-[clamp(15rem,30vw,30rem)]
                    aspect-4/5

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
                      className="block h-full w-full select-none object-cover"
                    />

                    <div
                      className="
                        absolute inset-0
                        h-full w-full translate-y-px
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

                  {/* CONTENT */}
                  <div
                    className="
                      absolute inset-0 z-10
                      flex flex-col justify-end
                      p-4
                      text-white
                      sm:p-5
                      lg:p-6
                    "
                  >
                    {/* TIME */}
                    <span
                      className="
                        mb-2
                        inline-flex w-fit
                        items-center justify-center
                        rounded-xl
                        bg-honey/85
                        px-[clamp(.75rem,1vw,1.5rem)]
                        h-[clamp(2rem,2.2vw,2.5rem)]
                        text-[clamp(.75rem,.75vw,1.25rem)]
                        font-semibold
                        tracking-wide
                        text-white
                        whitespace-nowrap
                        sm:mb-3
                      "
                    >
                      {item.time}
                    </span>

                    {/* TITLE */}
                    <h2
                      className="
                        my-2
                        text-white
                        text-[clamp(1.35rem,1.75vw,2.5rem)]
                        font-bold
                        leading-tight
                        line-clamp-2
                        sm:my-3
                      "
                    >
                      {item.title}
                    </h2>

                    {/* DESCRIPTION & TIME */}
                    <p
                      className="
                        mt-1
                        text-[clamp(.85rem,.7vw,1.125rem)]
                        leading-relaxed
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

      {/* NUSANTARA LEGACY */}
      <div
        className="
          relative z-10 mx-auto
          mb-16 w-full max-w-[2000px]
          px-4
          sm:mb-20 sm:px-6
          lg:mb-28 lg:px-8
          2xl:px-10
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

                    w-[clamp(15rem,30vw,30rem)]
                    aspect-4/5

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
                      className="block h-full w-full select-none object-cover"
                    />

                    <div
                      className="
                        absolute inset-0
                        h-full w-full translate-y-px
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

                  {/* CONTENT */}
                  <div
                    className="
                      absolute inset-0 z-10
                      flex flex-col justify-end
                      p-4
                      text-white
                      sm:p-5
                      lg:p-6
                    "
                  >
                    {/* TIME */}
                    <span
                      className="
                        mb-2
                        inline-flex w-fit
                        items-center justify-center
                        rounded-xl
                        bg-honey/85
                        px-[clamp(.75rem,1vw,1.5rem)]
                        h-[clamp(2rem,2.2vw,2.5rem)]
                        text-[clamp(.75rem,.75vw,1.25rem)]
                        font-semibold
                        tracking-wide
                        text-white
                        whitespace-nowrap
                        sm:mb-3
                      "
                    >
                      {item.time}
                    </span>

                    {/* TITLE */}
                    <h2
                      className="
                        my-2
                        text-white
                        text-[clamp(1.35rem,1.75vw,2.5rem)]
                        font-bold
                        leading-tight
                        line-clamp-2
                        sm:my-3
                      "
                    >
                      {item.title}
                    </h2>

                    {/* DESCRIPTION & TIME */}
                    <p
                      className="
                        mt-1
                        text-[clamp(.85rem,.7vw,1.125rem)]
                        leading-relaxed
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

      {/* ROOT SLIDER */}
      <div
        className="
          relative z-10 mx-auto
          mb-16 w-full max-w-[2000px]
          px-4
          sm:mb-20 sm:px-6
          lg:mb-28 lg:px-8
          2xl:px-10
        "
      >
        <section
          className="
            relative w-full
            overflow-hidden
            rounded-3xl
            border
            sm:rounded-4xl
          "
        >
          {/* HERO SLIDES */}
          <div
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {rootSlides.map((slide, index) => (
              <div
                key={index}
                className="
                  relative
                  h-[clamp(22rem,55vh,46rem)]
                  min-w-full
                  overflow-hidden
                "
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
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
                    px-4 py-12
                    sm:px-8 sm:py-14
                    lg:px-12
                  "
                >
                  <div className="w-full max-w-4xl text-center text-white">
                    <p
                      className="
                        mb-3
                        text-[clamp(.75rem,1vw,.875rem)]
                        tracking-[0.2em]
                        text-white/70
                        sm:mb-4 sm:tracking-[0.35em]
                        lg:tracking-[0.5em]
                      "
                    >
                      {slide.subtitle}
                    </p>

                    <h1
                      className="
                        wrap-break-word
                        text-[clamp(2rem,7vw,6rem)]
                        font-bold
                        leading-tight
                      "
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="
                        mx-auto
                        mt-4
                        max-w-2xl
                        text-[clamp(1rem,1.2vw,1.25rem)]
                        leading-relaxed
                        text-white/75
                        sm:mt-5
                      "
                    >
                      {slide.description}
                    </p>

                    <div
                      className="
                        mt-6
                        flex flex-wrap justify-center
                        gap-3
                        sm:mt-8 sm:gap-4
                      "
                    >
                      <Link
                        to={slide.buttonPrimary.href}
                        className="
                          rounded-full
                          bg-white
                          px-[clamp(1.25rem,3vw,2.5rem)]
                          py-[clamp(.75rem,1vw,1rem)]
                          text-[clamp(.875rem,1vw,1rem)]
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
            onClick={prevSlide}
            className="
              absolute left-2 top-1/2 z-20
              flex size-10 -translate-y-1/2
              items-center justify-center
              rounded-full bg-black/40
              text-white backdrop-blur-md
              transition hover:bg-black/60
              sm:left-4 sm:size-12
            "
            aria-label="Previous slide"
          >
            ←
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={nextSlide}
            className="
              absolute right-2 top-1/2 z-20
              flex size-10 -translate-y-1/2
              items-center justify-center
              rounded-full bg-black/40
              text-white backdrop-blur-md
              transition hover:bg-black/60
              sm:right-4 sm:size-12
            "
            aria-label="Next slide"
          >
            →
          </button>

          {/* DOT INDICATOR */}
          <div
            className="
              absolute bottom-3 left-1/2 z-20
              flex -translate-x-1/2
              items-center gap-2
              sm:bottom-4
              md:bottom-5
            "
          >
            {rootSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* IMPERIAL ASCENDANCY */}
      <div
        className="
          relative z-10 mx-auto
          mb-16 w-full max-w-[2000px]
          px-4
          sm:mb-20 sm:px-6
          lg:mb-28 lg:px-8
          2xl:px-10
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

                    w-[clamp(15rem,30vw,30rem)]
                    aspect-4/5

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
                      className="block h-full w-full select-none object-cover"
                    />

                    <div
                      className="
                        absolute inset-0
                        h-full w-full translate-y-px
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

                  {/* CONTENT */}
                  <div
                    className="
                      absolute inset-0 z-10
                      flex flex-col justify-end
                      p-4
                      text-white
                      sm:p-5
                      lg:p-6
                    "
                  >
                    {/* TIME */}
                    <span
                      className="
                        mb-2
                        inline-flex w-fit
                        items-center justify-center
                        rounded-xl
                        bg-honey/85
                        px-[clamp(.75rem,1vw,1.5rem)]
                        h-[clamp(2rem,2.2vw,2.5rem)]
                        text-[clamp(.75rem,.75vw,1.25rem)]
                        font-semibold
                        tracking-wide
                        text-white
                        whitespace-nowrap
                        sm:mb-3
                      "
                    >
                      {item.time}
                    </span>

                    {/* TITLE */}
                    <h2
                      className="
                        my-2
                        text-white
                        text-[clamp(1.35rem,1.75vw,2.5rem)]
                        font-bold
                        leading-tight
                        line-clamp-2
                        sm:my-3
                      "
                    >
                      {item.title}
                    </h2>

                    {/* DESCRIPTION & TIME */}
                    <p
                      className="
                        mt-1
                        text-[clamp(.85rem,.7vw,1.125rem)]
                        leading-relaxed
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
