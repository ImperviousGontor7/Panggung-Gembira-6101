function SectionTitle({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <h2 className="text-[clamp(1.4rem,2vw,2.4rem)] font-bold uppercase tracking-[0.22em] text-violet-300">
        {title}
      </h2>
      <div className="h-px w-16 bg-violet-400/60" />
      {subtitle ? (
        <p className="max-w-2xl text-sm sm:text-base text-white/65">{subtitle}</p>
      ) : null}
    </div>
  );
}

export default SectionTitle;