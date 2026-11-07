import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE = "yz_admin_session";
const SESSION_LIFETIME_SECONDS = 60 * 60 * 8;

type Session = {
  username: string;
  expiresAt: number;
};

function config() {
  return {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    secret: process.env.ADMIN_SESSION_SECRET,
  };
}

function secureEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function signature(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

export function isAdminConfigured() {
  const { username, password, secret } = config();
  return Boolean(username && password && secret);
}

export function hasValidAdminCredentials(username: string, password: string) {
  const configured = config();

  if (!configured.username || !configured.password || !configured.secret) {
    return false;
  }

  return (
    secureEqual(username, configured.username) &&
    secureEqual(password, configured.password)
  );
}

export function createAdminSession(username: string) {
  const { secret } = config();

  if (!secret) {
    throw new Error("Admin login has not been configured.");
  }

  const session: Session = {
    username,
    expiresAt: Date.now() + SESSION_LIFETIME_SECONDS * 1_000,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");

  return `${payload}.${signature(payload, secret)}`;
}

export function getAdminSession(sessionValue?: string): Session | null {
  const { username, secret } = config();

  if (!sessionValue || !username || !secret) {
    return null;
  }

  const [payload, sessionSignature] = sessionValue.split(".");

  if (!payload || !sessionSignature || !secureEqual(signature(payload, secret), sessionSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session;

    if (
      typeof session.username !== "string" ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now() ||
      !secureEqual(session.username, username)
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export const adminSessionCookie = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_LIFETIME_SECONDS,
};
