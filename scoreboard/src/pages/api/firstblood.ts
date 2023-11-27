import { NextApiRequest, NextApiResponse } from "next";

import { fetchFirstBlood } from "@/server/firstblood";

const firstBloodHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.send(await fetchFirstBlood());
};

export default firstBloodHandler;
