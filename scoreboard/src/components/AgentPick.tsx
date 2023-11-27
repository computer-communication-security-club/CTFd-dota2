import Image from "next/image";
import classNames from "classnames";

import { Team } from "@/server/teams";

import agents from "@/data/agents.json";

export function AgentPick({
  agent,
  team,
  color,
}: {
  team: Team;
  agent: string | null;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1 w-[118px]">
      <div
        className={classNames(
          "shadow-[#000_0_0_10px_1px]",
          agent ? "border-t-4" : "border-b-4"
        )}
        style={{ borderColor: color }}
      >
        <div className="w-full h-[66px] bg-[#3d4857] relative">
          {agent && (
            <Image
              width={118}
              height={66}
              style={{ height: "100%", width: "100%" }}
              src={`/assets/agents/${agent}/icon.png`}
              alt={agent}
            />
          )}
          <span className="w-full text-sm leading-3 text-center absolute bottom-0 left-0 p-[2px] text-[#a68888] bg-gradient-to-r from-transparent via-[#452020] to-transparent">
            {agent ? agents[agent as keyof typeof agents].name : "Picking..."}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center text-white">
        <h2
          style={{ textShadow: `0 0 5px ${color}` }}
          className="text-xl font-bold leading-6 text-center"
        >
          {team.name}
        </h2>
      </div>
    </div>
  );
}
