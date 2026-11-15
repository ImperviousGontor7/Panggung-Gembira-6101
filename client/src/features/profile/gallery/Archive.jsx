import MemoriesCard from "./MemoriesCard";

function Archive({ items, viewMode }) {
  if (!items.length) {
    return (
      <div className="rounded-4xl border border-white/10 bg-white/3 p-10 text-center text-white/70">
        Tidak ada memory untuk filter ini.
      </div>
    );
  }

  return (
    <div
      className={[
        "grid gap-5",
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          : "grid-cols-1",
      ].join(" ")}
    >
      {items.map((item) => (
        <MemoriesCard key={item.id} item={item} viewMode={viewMode} />
      ))}
    </div>
  );
}

export default Archive;