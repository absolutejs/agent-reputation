import { defineManifest } from "@absolutejs/manifest";
import { Type } from "@sinclair/typebox";

export const manifest = defineManifest<Record<string, never>>()({
  contract: 2,
  discovery: {
    audiences: ["agent-hosts", "trust-registries"],
    intents: [
      "assess agent reputation",
      "issue agent reputation evidence",
      "verify reputation credentials",
    ],
    keywords: [
      "agents",
      "reputation",
      "evidence",
      "credentials",
      "revocation",
      "trust",
    ],
    protocols: ["W3C Verifiable Credentials 2.0"],
  },
  identity: {
    accent: "#eab308",
    category: "ai",
    description:
      "Evidence-based scoped agent reputation with verified issuers, expiration, revocation, time decay, issuer caps, confidence, PostgreSQL durability, and W3C Verifiable Credentials 2.0 adapters.",
    docsUrl: "https://github.com/absolutejs/agent-reputation",
    name: "@absolutejs/agent-reputation",
    tagline: "Trust portable evidence, not a gameable global score.",
  },
  settings: Type.Object({}),
  wiring: [],
});
