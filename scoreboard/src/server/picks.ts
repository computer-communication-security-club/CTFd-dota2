import { APIResponse } from "./types";

export type AgentChoice = {
  id: number;
  agent_name: string;
  team_id: number;
  team_name: string;
};

export async function fetchAgentPicks(): Promise<Record<string, string>> {
  try {
    const result: APIResponse<AgentChoice[]> = await fetch(
      `${process.env.CTFD_API_URL}/valorant/picks`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CTFD_API_KEY}`,
        },
      }
    ).then((res) => res.json());

    if (result.data) {
      return Object.fromEntries(
        result.data.map(({ team_name, agent_name }) => [team_name, agent_name])
      );
    } else {
      throw new Error("Response data is missing.");
    }
  } catch (error) {
    console.error("Error fetching agent picks:", error);
    throw error;
  }
}
