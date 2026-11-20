import MemoriesCard from "./MemoriesCard";

function Archive({ items, viewMode }) {
  if (!items.length) {
    return (
      <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.025] px-6 py-16 text-center">
        <p className="text-[1.8rem] font-semibold text-antiquewhite">No memories found</p>
        <p className="mt-2 text-[1.3rem] text-antiquewhite/50">
          There are no photos in this collection yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
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
