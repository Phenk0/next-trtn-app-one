"use server";

import { cookies } from "next/headers";

const getCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value ?? null;
};

const setCookieByKey = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

const deleteCookieByKey = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(key);
};

export { deleteCookieByKey, getCookieByKey, setCookieByKey };
