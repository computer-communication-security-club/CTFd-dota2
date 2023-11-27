import Image from "next/image";
import classNames from "classnames";
import { MouseEvent, useEffect, useState } from "react";

import { ScoreboardItem } from "@/server/scoreboard";
import { SoundsManifest } from "@/server/sounds";

import agentData from "@/data/agents.json";
import { useAgentPicks } from "@/hooks/useAgentPicks";
import { useScoreboard } from "@/hooks/useScoreboard";

export type ScoreboardInitialData = {
  agentPicks: Record<string, string>;
  scoreboard: ScoreboardItem[];
  sounds: SoundsManifest;
};

const teams: Record<string, string> = {
  rebels: "muis",
  Juno3: "shutis",
  "Tsuivan enjoyers": "shutis",
  sanrio: "muis",
  "🤡🤡🤡": "shutis",
  "road to say togrog": "shutis",
  ChatGPT: "shutis",
  "0day!": "shutis",
  "hackstreet.b0ys": "muis",
  "3ula bag": "muis",
};

export function ScoreboardWidget({
  endAt,
  initialData: {
    sounds,
    scoreboard: initialScoreboard,
    agentPicks: initialAgentPicks,
  },
}: {
  endAt: number;
  initialData: ScoreboardInitialData;
}) {
  const { agentPicks } = useAgentPicks({ initialAgentPicks });
  const { scoreboard } = useScoreboard({
    endAt,
    sounds,
    agentPicks,
    initialScoreboard,
  });

  const requestFullscreen = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      document.body.requestFullscreen().catch(() => {});
    }
  };
  const [audioStarted, setAudioStarted] = useState(false);

  const startAudio = () => {
    const audioMainMenu = new Audio("/assets/sounds/mainmenu.mp3");
    setAudioStarted(true);
    audioMainMenu.autoplay = true;
    audioMainMenu.loop = true;
    audioMainMenu.volume = 0.05;

    return new Promise((resolve, reject) => {
      audioMainMenu.onended = resolve as () => void;
      audioMainMenu.play().catch(reject);
    });
  };

  return (
    <div className="w-screen h-screen bg-icebox bg-cover backdrop-blur-xl">
      {audioStarted ? (
        <div className="w-full h-full bg-white/5 backdrop-blur-sm">
          <div
            className="w-full h-full flex justify-center overflow-scroll"
            onClick={requestFullscreen}
          >
            <div className="w-3/4 bg-gradient-to-b from-[#4a4e59cc] to-[#121920cc]">
              <div className="w-full h-8 grid grid-flow-row-dense grid-cols-5">
                <div className="h-full col-span-2 text-slate-200 flex justify-center items-center">
                  <p>TEAMS</p>
                </div>
                <div className="h-full text-yellow-600 flex justify-center items-center">
                  <div style={{ width: "16px", height: "16px" }}>
                    <Image
                      width={16}
                      height={16}
                      alt={"gold-icon"}
                      src={"/assets/gold-icon.png"}
                    />
                  </div>
                  <p style={{ marginLeft: "4px" }}>GOLD</p>
                </div>
                <div className="h-full text-gray-300 flex justify-center items-center">
                  <p>KILLS</p>
                </div>
                <div className="h-full text-red-400 flex justify-center items-center">
                  <p>DEATHS</p>
                </div>
              </div>
              {scoreboard.map((team, index) => {
                const textColor = "text-gray-200";
                const universityOfTeam = teams[team.name];
                return (
                  <div
                    key={team.name}
                    className={classNames(
                      "w-full h-16 mt-[2px] bg-opacity-90 grid grid-flow-row-dense grid-cols-5 items-center",
                      "bg-[#21262f]"
                    )}
                  >
                    <div className="h-full flex flex-row items-center col-span-2">
                      <div className="h-full flex justify-center items-center ml-5">
                        {universityOfTeam ? (
                          <Image
                            width={36}
                            height={36}
                            className="opacity-100"
                            src={
                              universityOfTeam === "shutis"
                                ? "/assets/mongolian-university-of-science-and-technology.png"
                                : "/assets/national-university-of-mongolia.png"
                            }
                            alt={
                              universityOfTeam === "shutis"
                                ? "mongolian-university-of-science-and-technology"
                                : "national-university-of-mongolia"
                            }
                            style={{ height: "100%" }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="h-[55px] w-[97px] border border-black ml-4">
                        {agentPicks[team.name] && (
                          <Image
                            width={118}
                            height={66}
                            className="opacity-100"
                            src={`/assets/agents/${
                              agentPicks[team.name]
                            }/icon.png`}
                            alt={`${agentPicks[team.name]} icon`}
                            style={{ height: "100%" }}
                          />
                        )}
                      </div>
                      <div className="flex flex-col ml-2">
                        <p className={"text-lg text-[#fff] leading-5"}>
                          {team.name}
                        </p>
                        <p className="text-[#535755] text-sm leading-4">
                          {agentPicks[team.name] &&
                            agentData[
                              agentPicks[team.name] as keyof typeof agentData
                            ].name.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <p
                      className={classNames(
                        "opacity-100 text-center font-medium text-lg text-[#fdca33]",
                        textColor
                      )}
                    >
                      {scoreboard.find((listing) => listing.name === team.name)
                        ?.score ?? 0}
                    </p>
                    <div
                      className={
                        "opacity-100 h-full flex items-center justify-center font-medium text-lg text-gray-300"
                      }
                    >
                      <p className="h-full w-[32px] bg-[#1e222a] flex items-center justify-center">
                        {team.solves.toString()}
                      </p>
                    </div>
                    <p
                      className={classNames(
                        "opacity-100 text-center font-medium text-lg",
                        textColor
                      )}
                      style={{ color: "#F87171" }}
                    >
                      {team.fails.toString()}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
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
        </div>
      )}
    </div>
  );
}
