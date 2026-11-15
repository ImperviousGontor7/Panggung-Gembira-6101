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
      (prev) => (prev - 1 + mainSlides.length) % mainSlides.length
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
      <section className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mainSlides.map((slide, index) => (
            <article
              key={index}
              className="
    relative
    min-w-full
    overflow-hidden
    aspect-video
      min-h-[clamp(22rem,65vh,40rem)]
  max-h-[clamp(40rem,75vh,70rem)]
  "
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />


              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 bg-linear-to-t from-bg-main via-transparent to-transparent" />

              <div className="relative z-10 flex h-full items-center justify-center px-[clamp(1rem,3vw,3rem)] pb-[clamp(1.5rem,5vw,5rem)] pt-[clamp(2rem,6vw,6rem)]">
                <div className="max-w-[clamp(20rem,80vw,68rem)] text-center text-white">
                  <p className="mb-[clamp(.5rem,1vw,1rem)] text-[clamp(.7rem,.9vw,.95rem)] font-medium uppercase tracking-[0.35em] text-white/70">
                    {slide.subtitle}
                  </p>

                  <h1 className="mx-auto max-w-[clamp(18rem,78vw,58rem)] text-[clamp(2rem,7vw,6rem)] font-bold leading-[1.05]">
                    {slide.title}
                  </h1>

                  <p className="mx-auto mt-[clamp(.9rem,1.5vw,1.4rem)] max-w-[clamp(18rem,56vw,42rem)] text-[clamp(.95rem,1.2vw,1.25rem)] leading-relaxed text-white/75">
                    {slide.description}
                  </p>

                  <div className="mt-[clamp(1.25rem,2vw,2rem)] flex flex-wrap justify-center gap-[clamp(.75rem,1.5vw,1rem)]">
                    <Link
                      to={slide.buttonPrimary.href}
                      className="
                        inline-flex items-center justify-center
                        rounded-full bg-white
                        px-[clamp(1.25rem,3vw,2.5rem)]
                        py-[clamp(.7rem,1vw,1rem)]
                        text-[clamp(.875rem,1vw,1rem)]
                        font-semibold text-black
                        transition duration-300
                        hover:scale-105 hover:bg-white/90
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
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

        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="
            absolute left-3 top-1/2 z-20 -translate-y-1/2
            rounded-full bg-black/40 px-3 py-3 text-white
            backdrop-blur-md transition
            hover:bg-black/60
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
            sm:left-4 sm:px-4
          "
        >
          <span className="block text-lg leading-none sm:text-xl">←</span>
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="
            absolute right-3 top-1/2 z-20 -translate-y-1/2
            rounded-full bg-black/40 px-3 py-3 text-white
            backdrop-blur-md transition
            hover:bg-black/60
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
            sm:right-4 sm:px-4
          "
        >
          <span className="block text-lg leading-none sm:text-xl">→</span>
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
          {mainSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>
      </section>
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 mb-50 relative z-10">
        <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
          <h3 className="text-[clamp(1.25rem,2vw,2.5rem)] mb-5">
            Aurora Vanguard
          </h3>

          <div className="scrollbar-hidden overflow-x-auto py-5">
            <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
              {firstScrollbar.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full object-cover selected-none"
                    />

                    <div className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25" />
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                  />

                  {/* CONTENT */}
                  <div className="absolute inset-0 z-10 px-10 top-60 bottom-0 text-white p-5">
                    {/* time */}
                    <span className="inline-flex 
                    items-center
                    justify-center
                    px-[clamp(1rem,1vw,1.5rem)]
                    h-[clamp(2rem,2.2vw,2.5rem)]
                    bg-honey/85 rounded-xl
                    text-[clamp(0.75rem,0.75vw,1.25rem)]
                        font-semibold
                        tracking-wide
                        text-white
                        whitespace-nowrap mb-3">
                      {item.time}
                    </span>

                    {/* TITLE */}
                    <h2
                      className="
                    text-white
                    font-bold my-4

                    text-[clamp(1.5rem,1.75vw,2.5rem)]
                    leading-tight

                    line-clamp-2
                  ">
                      {item.title}
                    </h2>

                    {/* description & TIME */}
                    <p className="
                    text-[clamp(0.85rem,0.7vw,1.5rem)] 
                    text-white/60 absolute bottom-7
                    ">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 mb-50 relative z-10">
        <div className="max-h-[clamp(50rem,45vw,75rem)] mx-auto my-25">
          <h3 className="text-[clamp(1.25rem,2vw,2.5rem)] mb-5">
            Nusantara Legacy
          </h3>
          <div className="overflow-x-auto scrollbar-hidden">

            <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
              {secondScrollbar.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 h-[70%] w-full">
                    <img
                      src={hero}
                      alt={item.title}
                      className="block h-full w-full object-cover selected-none"
                    />

                    <div className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25" />
                  </div>

                  {/* OVERLAY */}

                  <div
                    className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                  />

                  {/* CONTENT */}
                  <div className="absolute inset-0 z-10 px-10 top-60 bottom-0 text-white p-5">
                    {/* time */}
                    <span className="inline-flex 
                    items-center
                    justify-center
                    px-[clamp(1rem,1vw,1.5rem)]
                    h-[clamp(2rem,2.2vw,2.5rem)]
                    bg-honey/85 rounded-xl
                    text-[clamp(0.75rem,0.75vw,1.25rem)]
                        font-semibold
                        tracking-wide
                        text-white
                        whitespace-nowrap mb-3">
                      {item.time}
                    </span>

                    {/* TITLE */}
                    <h2
                      className="
                    text-white
                    font-bold my-4

                    text-[clamp(1.5rem,1.75vw,2.5rem)]
                    leading-tight

                    line-clamp-2
                  ">
                      {item.title}
                    </h2>

                    {/* description & TIME */}
                    <p className="
                    text-[clamp(0.85rem,0.7vw,1.5rem)] 
                    text-white/60 absolute bottom-7
                    ">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 mb-40 relative z-10">
        <section className="relative w-full overflow-hidden rounded-4xl border">
          {/* heroSlides */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {rootSlides.map((slide, index) => (
              <div
                key={index}
                className="relative min-w-full h-[clamp(20rem,50vh,60rem)] overflow-hidden"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 bg-linear-to-r from-bg-main via-[#0d0500]/75 to-transparent" />

                <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center px-4">
                  <div className="max-w-4xl text-center text-white">
                    <p className="mb-4 text-sm tracking-[0.5em] text-white/70">
                      {slide.subtitle}
                    </p>

                    <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.2vw,1.25rem)] leading-relaxed text-white/75">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                      <Link
                        to={slide.buttonPrimary.href}
                        className="
rounded-full
bg-white
px-[clamp(1.5rem,3vw,2.5rem)]
py-[clamp(0.75rem,1vw,1rem)]
text-[clamp(0.875rem,1vw,1rem)]
font-semibold
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
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label="Previous slide"
          >
            ←
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 px-4 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label="Next slide"
          >
            →
          </button>

          {/* DOT INDICATOR */}
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {rootSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </section>
        <div className="w-full max-w-500 mx-auto px-5 sm:px-8 mb-50 relative z-10">
          <div className="max-h-[clamp(50rem,45vw,75rem)] my-25 mx-auto">
            <h3 className="text-[clamp(1.25rem,2vw,2.5rem)] mb-5">
              Imperial Ascendancy
            </h3>

            <div className="scrollbar-hidden overflow-x-auto py-5">
              <div className="flex h-full gap-7.5 mx-0 w-full scroll-smooth snap-x snap-mandatory">
                {thirdScrollbar.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="
  glow-card
  shrink-0
  snap-start

  w-[clamp(18rem,22vw,30rem)]
  aspect-4/5

  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-choco

  transition-all
  duration-300

  hover:z-10
  hover:-translate-y-4
  hover:shadow-2xl
"
                  >
                    {/* IMAGE */}
                    <div className="absolute inset-0 h-[70%] w-full">
                      <img
                        src={hero}
                        alt={item.title}
                        className="block h-full w-full object-cover selected-none"
                      />

                      <div className="absolute inset-0 translate-y-px h-full 
                    w-full bg-linear-to-t from-choco to-choco/25" />
                    </div>

                    {/* OVERLAY */}

                    <div
                      className="
                  absolute
                  inset-0

                  bg-linear-to-t
                  from-choco
                  via-choco/35
                  to-transparent
                "
                    />

                    {/* CONTENT */}
                    <div className="absolute inset-0 z-10 px-10 top-60 bottom-0 text-white p-5">
                      {/* time */}
                      <span className="inline-flex 
                    items-center
                    justify-center
                    px-[clamp(1rem,1vw,1.5rem)]
                    h-[clamp(2rem,2.2vw,2.5rem)]
                    bg-honey/85 rounded-xl
                    text-[clamp(0.75rem,0.75vw,1.25rem)]
                        font-semibold
                        tracking-wide
                        text-white
                        whitespace-nowrap mb-3">
                        {item.time}
                      </span>

                      {/* TITLE */}
                      <h2
                        className="
                    text-white
                    font-bold my-4

                    text-[clamp(1.5rem,1.75vw,2.5rem)]
                    leading-tight

                    line-clamp-2
                  ">
                        {item.title}
                      </h2>

                      {/* description & TIME */}
                      <p className="
                    text-[clamp(0.85rem,0.7vw,1.5rem)] 
                    text-white/60 absolute bottom-7
                    ">
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
    </div>
  )
}

export default Home;