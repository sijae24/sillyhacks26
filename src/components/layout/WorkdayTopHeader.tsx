export default function WorkdayTopHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-orange-500 text-sm font-black text-white">
          W
        </div>
        <span className="text-lg font-semibold text-orange-500">workday</span>
      </div>
      <nav className="flex gap-4 text-sm text-gray-500">
        <span className="cursor-pointer hover:text-orange-500">Sign In</span>
        <span className="text-gray-300">|</span>
        <span className="cursor-pointer hover:text-orange-500">Help</span>
      </nav>
    </header>
  );
}
