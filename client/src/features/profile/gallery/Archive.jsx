import MemoriesCard from "./MemoriesCard";

function Archive({ items, viewMode }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-14 text-center">
        <p className="font-root text-sm font-semibold text-antiquewhite">
          No memories found
        </p>
        <p className="mt-2 font-root text-xs text-white/45">
          Try choosing another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4"
          : "grid grid-cols-1 gap-3"
      }
    >
      {items.map((item) => (
        <MemoriesCard key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  );
}

export default Archive;
