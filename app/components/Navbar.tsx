export default function Navbar() {
  return (
    <nav className="flex items-center justify-between h-32 px-8 bg-skin-fill">
      <div className="p-3 bg-skin-fill-inverted text-skin-inverted">logo</div>
      <div className="flex items-center justify-center gap-1">
        <div className="p-2 rounded-md bg-skin-fill-inverted text-skin-base">
          o nas
        </div>
        <div className="p-2 rounded-md bg-skin-fill-inverted text-skin-base">
          admin
        </div>
      </div>
    </nav>
  );
}
