import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = (process.env.SESSION_SECRET as string) || "super secret";
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  username: string;
  token: string;
  expiresAt: Date;
};

export const createSession = async (username: string, token: string) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 100);
  const session = await encrypt({ username, token, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
};

export const deleteSession = async () => {
  cookies().delete("session");
};

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session", error);
  }
};

export const getServerSession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  return session as SessionPayload | undefined;
};
