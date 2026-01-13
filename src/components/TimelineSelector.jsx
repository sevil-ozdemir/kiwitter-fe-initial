export default function TimelineSelector({ setMode, mode}) {

  return <nav className="w-[40vw]">
    <ul className="flex flex-row gap-4 text-white mt-4 px-2 text-sm">
      <li>
        <a className={mode === "normal" ? "border-b-2 pb-1 border-white font-bold" : "font-bold"} href="#" onClick={() => setMode("normal")}>Normal</a>
      </li>
      <li>
        <a className={mode === "most_liked" ? "border-b-2 pb-1 border-white font-bold" : "font-bold"} href="#" onClick={() => setMode("most_liked")}>En Beğenilenler</a>
      </li>
    </ul>
  </nav>
}