import { createHash, createHmac, timingSafeEqual } from "crypto";

export const adminCookieName = "nuvyrix_admin_session";
export const adminSessionMaxAge = 8 * 60 * 60;

type AdminConfig = {
  username: string;
  password: string;
  sessionSecret: string;
};

function getAdminConfig(): AdminConfig | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (
    !username ||
    username.length < 3 ||
    username.length > 128 ||
    !password ||
    password.length < 16 ||
    password.length > 1024 ||
    !sessionSecret ||
    sessionSecret.length < 32
  ) {
    return null;
  }

  return { username, password, sessionSecret };
}

function matchesSecret(value: string, expected: string) {
  const valueHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(valueHash, expectedHash);
}

export function isAdminConfigured() {
  return getAdminConfig() !== null;
}

export function verifyAdminCredentials(username: string, password: string) {
  const config = getAdminConfig();
  if (!config) return false;

  const usernameMatches = matchesSecret(username, config.username);
  const passwordMatches = matchesSecret(password, config.password);
  return usernameMatches && passwordMatches;
}

export function createAdminSessionToken() {
  const config = getAdminConfig();
  if (!config) {
    throw new Error("Admin authentication is not configured");
  }

  const expiresAt = Date.now() + adminSessionMaxAge * 1000;
  const payload = Buffer.from(
    JSON.stringify({ username: config.username, expiresAt }),
  ).toString("base64url");
  const sessionKey = createHmac("sha256", config.sessionSecret)
    .update(config.password)
    .digest();
  const signature = createHmac("sha256", sessionKey)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifyAdminSession(token: string | undefined) {
  const config = getAdminConfig();
  if (!config || !token) return false;

  const [payload, signature, ...extra] = token.split(".");
  if (!payload || !signature || extra.length > 0) return false;

  const sessionKey = createHmac("sha256", config.sessionSecret)
    .update(config.password)
    .digest();
  const expected = createHmac("sha256", sessionKey)
    .update(payload)
    .digest();
  const received = Buffer.from(signature, "base64url");

  if (received.length !== expected.length || !timingSafeEqual(expected, received)) {
    return false;
  }

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { username?: unknown; expiresAt?: unknown };

    return (
      session.username === config.username &&
      typeof session.expiresAt === "number" &&
      Number.isSafeInteger(session.expiresAt) &&
      session.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}
