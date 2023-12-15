import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthOption } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, AuthOption);
  res.send(JSON.stringify(session, null, 2));
}
