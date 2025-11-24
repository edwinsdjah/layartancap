export default function FormatBadges({ formats = [] }) {
  if (!formats.length) return null;

  return (
    <div className='flex items-center gap-2'>
      {formats.map((fmt, i) => (
        <span
          key={i}
          className='
            px-[6px] py-[2px]
            text-xs font-bold
            rounded-sm
            border border-white/40
            text-white/90
            uppercase
            tracking-wider
            bg-white/10
          '
        >
          {fmt}
        </span>
      ))}
    </div>
  );
}
