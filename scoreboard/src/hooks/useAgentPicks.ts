import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { playSound } from "@/core/SoundDispatcher";

import { useTaskQueue } from "@/contexts/TaskQueueContext";

export function useAgentPicks({
  initialAgentPicks,
}: {
  initialAgentPicks: Record<string, string>;
}) {
  const [agentPicks, setAgentPicks] = useState(initialAgentPicks);

  const taskQueue = useTaskQueue();
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL as string);
    socket.on("agent-selected", async (data) => {
      taskQueue.push(async () => {
        setAgentPicks((picks) => ({ ...picks, [data.team]: data.agent }));
      });
      taskQueue.push(async () => await playSound(`${data.agent}/pick`));
    });
    return () => {
      socket.close();
    };
  }, [taskQueue]);

  return { agentPicks };
}
