'use server'

import { getCookie } from "@/lib/session"

export async function getAuthtoken() {
  const authtoken = await getCookie()
  return authtoken;
}