function ScrollRow({ children, containerRef }) {
  return (
    <div
      ref={containerRef}
      className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}

export default ScrollRow;