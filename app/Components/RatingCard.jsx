export default function AgeRatingBadge({ rating }) {
  if (!rating) return null;

  return (
    <span
      className='
        inline-block
        px-[6px] py-[2px]
        text-xs font-bold
        rounded
        border border-white/40
        bg-white/10
        backdrop-blur-sm
        uppercase tracking-wide
        text-white
      '
    >
      {rating}
    </span>
  );
}
