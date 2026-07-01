"use client";

import { ClassRole, roles } from "@/app/lib/content";

export default function RoleFilter({
  selected,
  onSelect,
}: {
  selected: ClassRole | null;
  onSelect: (role: ClassRole | null) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-stone-500">
        Chế độ khám phá theo giai cấp:
      </span>
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full border px-3 py-1 text-sm transition-colors ${
          selected === null
            ? "border-brand-red bg-brand-red text-white"
            : "border-stone-300 text-stone-600 hover:border-stone-400"
        }`}
      >
        Tất cả
      </button>
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(selected === role.id ? null : role.id)}
          className="rounded-full border px-3 py-1 text-sm transition-colors"
          style={
            selected === role.id
              ? { backgroundColor: role.color, borderColor: role.color, color: "white" }
              : { borderColor: `${role.color}55`, color: role.color }
          }
        >
          {role.label}
        </button>
      ))}
    </div>
  );
}
