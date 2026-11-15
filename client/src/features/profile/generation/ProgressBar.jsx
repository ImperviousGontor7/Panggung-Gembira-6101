function ProgressBar({ value }) {
  const blocks = 10;
  const activeBlocks = Math.round((value / 100) * blocks);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 grid grid-cols-10 gap-1.5">
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            className={`h-4 rounded-sm transition-all duration-500 ${
              i < activeBlocks
                ? "bg-linear-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.35)]"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <span className="w-12 text-right text-sm sm:text-base text-white/85">
        {value}%
      </span>
    </div>
  );
}

export default ProgressBar;