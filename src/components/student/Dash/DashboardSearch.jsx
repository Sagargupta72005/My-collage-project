import { Search } from "lucide-react";

export default function DashboardSearch({
  value,
  onChange,
}) {
  return (
    <div className="relative shadow-2xl rounded-3xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search..."
        className="w-full bg-white/10 border border-white/10 rounded-2xl py-3 pl-11 pr-4"
      />
    </div>
  );
}