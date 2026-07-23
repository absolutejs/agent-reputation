import { defineImplementation, defineManifest } from "@absolutejs/manifest";
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
  implements: [
    defineImplementation<never>()({
      contract: "agent-reputation/store",
      factory: "createMemoryAgentReputationStore",
      from: "@absolutejs/agent-reputation",
      title: "In memory (development only)",
      wiring: {
        code: "createMemoryAgentReputationStore()",
        imports: [
          {
            from: "@absolutejs/agent-reputation",
            names: ["createMemoryAgentReputationStore"],
          },
        ],
      },
    }),
    defineImplementation<never>()({
      contract: "agent-reputation/store",
      factory: "createDrizzleAgentReputationStore",
      from: "@absolutejs/agent-reputation/drizzle",
      requires: {
        peers: [
          {
            name: "drizzle-orm",
            range: ">=1.0.0-rc.4 <2",
            reason: "Typed Postgres reputation evidence persistence",
          },
        ],
        services: [
          {
            description: "Scoped agent reputation evidence ledger",
            id: "postgres",
          },
        ],
      },
      title: "Drizzle Postgres (production, including Neon)",
      wiring: {
        code: "createDrizzleAgentReputationStore({ db })",
        imports: [
          {
            from: "@absolutejs/agent-reputation/drizzle",
            names: ["createDrizzleAgentReputationStore"],
          },
        ],
      },
    }),
  ],
  settings: Type.Object({}),
  slots: {
    store: {
      configPath: "$self",
      contract: "agent-reputation/store",
      description:
        "Where verified, expiring, and revocable reputation evidence lives",
      known: [
        "@absolutejs/agent-reputation#createMemoryAgentReputationStore",
        "@absolutejs/agent-reputation#drizzle",
      ],
      required: true,
    },
  },
  wiring: [
    {
      description:
        "Create the scoped evidence store used by the reputation service.",
      id: "default",
      server: {
        code: "const agentReputationStore = ${slot.store};",
        imports: [],
        placement: "module-scope",
      },
      title: "Create the reputation evidence store",
    },
  ],
});
