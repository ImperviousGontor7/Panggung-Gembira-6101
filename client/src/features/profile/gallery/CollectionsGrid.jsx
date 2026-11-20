import { Link } from "react-router-dom";

function CollectionCard({ collection, count, coverItem, index }) {
  const imagePosition = [
    "50% 50%",
    "48% 50%",
    "54% 50%",
    "50% 46%",
    "50% 54%",
    "46% 50%",
  ][index % 6];

  return (
    <Link
      to={`/memories/${collection.value}`}
      aria-label={`Open ${collection.label} collection, ${count} memories`}
      className="group min-w-0 overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-marigold/30 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/70"
    >
      <div className="relative aspect-[1.55/1] overflow-hidden bg-[#24170e]">
        {coverItem?.image ? (
          <img
            src={coverItem.image}
            alt={coverItem.title}
            loading="lazy"
            style={{ objectPosition: imagePosition }}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-antiquewhite/30">
            <span className="text-[3rem]">✳</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#100802]/85 via-[#100802]/10 to-[#100802]/10" />

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[0.9rem] font-medium tracking-[0.12em] text-white/85 backdrop-blur-md">
          {collection.eyebrow}
        </span>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[1.15rem] text-white/65">{count} {count === 1 ? "memory" : "memories"}</p>
            <h2 className="mt-1 text-[2.1rem] font-semibold leading-tight tracking-[-0.025em] text-white sm:text-[2.4rem]">
              {collection.label}
            </h2>
          </div>
          <span className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/10 text-[1.9rem] text-white transition duration-300 group-hover:translate-x-1 group-hover:border-marigold/70 group-hover:bg-marigold group-hover:text-[#241306]">
            ↗
          </span>
        </div>
      </div>
      <div className="flex min-h-[5.8rem] items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
        <p className="text-[1.25rem] leading-6 text-antiquewhite/55">
          {collection.description}
        </p>
        <span className="shrink-0 text-[1rem] font-medium tracking-[0.08em] text-marigold/80">
          OPEN
        </span>
      </div>
    </Link>
  );
}

function CollectionsGrid({ collections, memories }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
      {collections.map((collection, index) => {
        const matchingMemories = memories.filter((item) => {
          if (collection.type === "year") {
            return new Date(item.date).getFullYear().toString() === collection.value;
          }
          return item.categoryKey === collection.value;
        });

        const coverItem = [...matchingMemories].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )[0];

        return (
          <CollectionCard
            key={collection.value}
            collection={collection}
            count={matchingMemories.length}
            coverItem={coverItem}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default CollectionsGrid;
