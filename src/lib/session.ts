"server-only";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, defaultSession, sessionOptions } from "./definitions";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.authtoken = defaultSession.authtoken;
    session.isadmin = defaultSession.isadmin;

    return session;
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/auth/checkauth",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.authtoken}`,
      },
    }
  );

  const user = (await res.json()) as { isadmin: boolean };

  if (user.isadmin) {
    session.isadmin = user.isadmin;
  }

  return session;
};

export const getCookie = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (session.authtoken) return session.authtoken;
  return "";
};
