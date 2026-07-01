"use client";

import { useState } from "react";
import { ClassRole, timeline } from "@/app/lib/content";
import RoleFilter from "./RoleFilter";
import TimelineEventCard from "./TimelineEventCard";

export default function TimelineExperience() {
  const [selectedRole, setSelectedRole] = useState<ClassRole | null>(null);

  return (
    <div className="flex flex-col gap-10">
      <div className="sticky top-16 z-10 -mx-4 bg-background/90 px-4 py-3 backdrop-blur">
        <RoleFilter selected={selectedRole} onSelect={setSelectedRole} />
      </div>

      <div className="relative flex flex-col gap-16 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:-translate-x-1/2 md:before:bg-brand-red/20">
        {timeline.map((event, i) => (
          <TimelineEventCard
            key={event.id}
            event={event}
            side={i % 2 === 0 ? "left" : "right"}
            dimmed={selectedRole !== null && !event.roles.includes(selectedRole)}
          />
        ))}
      </div>
    </div>
  );
}
