import { z } from "zod";

export const USERNAME_RE = /^[a-z0-9_]{3,20}$/;

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(USERNAME_RE, "Use 3 to 20 lowercase letters, numbers or underscores.");

export const RESERVED_USERNAMES = new Set([
  "admin", "administrator", "novyx", "support", "help", "settings", "login", "register",
  "home", "explore", "movies", "anime", "tv", "search", "premium", "messages", "notifications",
  "friends", "watchlist", "collections", "communities", "themes", "studio", "api", "auth",
  "moderator", "staff", "official", "root", "system",
]);

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be 72 characters or fewer.");

export const emailSchema = z.string().trim().email("Enter a valid email address.");
