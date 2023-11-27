import { PaginatedData } from "./types";

export type Team = { name: string };

export async function fetchTeams(): Promise<Team[]> {
  try {
    const result: PaginatedData<Team> = await fetch(
      `${process.env.CTFD_API_URL}/teams`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CTFD_API_KEY}`,
        },
      }
    ).then((res) => res.json());

    if (result.data) {
      return result.data;
    } else {
      throw new Error("Response data is missing.");
    }
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}
