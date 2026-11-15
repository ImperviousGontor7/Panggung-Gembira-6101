function CarouselButton({ direction, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        grid place-items-center
        h-12 w-12 sm:h-14 sm:w-14
        rounded-full
        border border-violet-300/60
        bg-white/5
        text-violet-200
        backdrop-blur-md
        shadow-[0_0_0_1px_rgba(167,139,250,0.08),0_0_30px_rgba(168,85,247,0.12)]
        transition
        hover:scale-105 hover:bg-white/10 hover:border-violet-200
        active:scale-95
      "
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
    >
      <span className="text-2xl leading-none">
        {direction === "left" ? "‹" : "›"}
      </span>
    </button>
  );
}

export default CarouselButton;