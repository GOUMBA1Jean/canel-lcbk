export function SkeletonCard() {
  return (
    <div className="bg-[#FAFAF8] p-6 animate-pulse">
      <div className="w-11 h-11 rounded-full bg-[#D5C9B8] mb-4" />
      <div className="h-4 bg-[#D5C9B8] rounded w-2/3 mb-2" />
      <div className="h-3 bg-[#E8E0D0] rounded w-1/2 mb-3" />
      <div className="flex gap-2">
        <div className="h-5 bg-[#E8E0D0] rounded w-16" />
        <div className="h-5 bg-[#E8E0D0] rounded w-20" />
      </div>
    </div>
  );
}

export function SkeletonLigne() {
  return (
    <div className="bg-[#FAFAF8] p-6 animate-pulse flex justify-between items-center">
      <div className="flex-1">
        <div className="h-4 bg-[#D5C9B8] rounded w-3/4 mb-2" />
        <div className="h-3 bg-[#E8E0D0] rounded w-1/2" />
      </div>
      <div className="h-6 bg-[#D5C9B8] rounded w-16 ml-4" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="animate-pulse space-y-3 max-w-xl">
      <div className="h-3 bg-white/20 rounded w-1/3" />
      <div className="h-10 bg-white/20 rounded w-full" />
      <div className="h-10 bg-white/20 rounded w-4/5" />
      <div className="h-4 bg-white/15 rounded w-2/3" />
    </div>
  );
}