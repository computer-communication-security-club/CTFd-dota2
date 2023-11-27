import { Team } from "@/server/teams";

import { AgentPick } from "@/components/AgentPick";
import { useAgentPicks } from "@/hooks/useAgentPicks";
import { useState } from "react";

export type PickStageInitialData = {
  teams: Team[];
  agentPicks: Record<string, string>;
};

const colors = [
  "#3273fd",
  "#65febf",
  "#be02bc",
  "#f2f00d",
  "#ff6903",
  "#f784bb",
  "#a0b444",
  "#64d4f1",
  "#028121",
  "#a26805",
];

export function PickStageWidget({
  initialData: { teams, agentPicks: initialAgentPicks },
}: {
  initialData: PickStageInitialData;
}) {
  const { agentPicks } = useAgentPicks({ initialAgentPicks });
  const [audioStarted, setAudioStarted] = useState(false);

  const startAudio = () => {
    setAudioStarted(true);
    const audioHeroPick = new Audio("/assets/sounds/heropick.mp3");
    audioHeroPick.autoplay = true;
    audioHeroPick.loop = true;
    audioHeroPick.volume = 0.1;

    return new Promise((resolve, reject) => {
      audioHeroPick.onended = resolve as () => void;
      audioHeroPick.play().catch(reject);
    });
  };

  return (
    <div className="w-screen h-screen bg-heropick bg-cover backdrop-blur-xl">
      <div className="w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
        {audioStarted ? (
          <div className="p-5 grid grid-cols-10 gap-6">
            {teams.map((team, index) => (
              <AgentPick
                key={team.name}
                team={team}
                color={colors[index]}
                agent={agentPicks[team.name] ?? null}
              />
            ))}
          </div>
        ) : (
          <button
            style={{
              height: "42px",
              width: "240px",
              background: "none",
              border: "0.5px solid #7e9f85",
              backgroundImage: "linear-gradient(#598957, #3c634d)",
              color: "#fff",
              fontFamily: "radiance-regular",
              fontSize: "18px",
            }}
            onClick={startAudio}
          >
            START
          </button>
        )}
      </div>
    </div>
  );
}
