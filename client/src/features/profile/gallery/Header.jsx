function Header({ eyebrow = "THE IMPERVIOUS ARCHIVE", title, subtitle, children }) {
  return (
    <header className="flex flex-col gap-6 border-b border-white/10 pb-7 sm:pb-9 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="mb-3 text-[1.05rem] font-semibold tracking-[0.24em] text-marigold/90">
          {eyebrow}
        </p>
        <h1 className="font-root text-[3.6rem] font-semibold leading-[1.04] tracking-[-0.045em] text-antiquewhite sm:text-[4.8rem] lg:text-[5.6rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-[1.45rem] leading-7 text-antiquewhite/65 sm:text-[1.6rem] sm:leading-8">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </header>
  );
}

export default Header;
