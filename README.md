# BlockHatchery

Free, open-source, self-hosted Minecraft server provisioning for Pterodactyl.

**Status: planning and API-access validation. There is no installable application yet. CurseForge API approval has not been obtained or applied for.**

BlockHatchery aims to let authorized panel users discover modpacks, choose exact Minecraft and loader versions, and select compatible Java runtimes without depending on an abandoned third-party intermediary.

## Planned scope
- Minecraft version and loader selection.
- Modpack discovery and permitted server-file installation.
- Compatible Java runtime selection, including legacy packs.
- Validate downloads before changing server files; preserve worlds and player data.
- Start with Pterodactyl v1 integration; v2 support is not currently implemented or promised.

## Provider access first
CurseForge support is conditional on approval and verified access. No provider integration is implemented. Other intended sources include Mojang, Modrinth, Fabric, Forge/NeoForge and Paper; each requires separate compatibility and terms review.

The project is not a mod marketplace, public file mirror, player launcher or authentication bypass. Author distribution restrictions must be respected. No API key will be committed or bundled. The authorized credential model for independent self-hosting operators remains to be confirmed with providers. We will not assume provider data may be cached without permission.

## Project intent
Free and open source, with no planned sales, subscriptions, advertising or other project monetization. Existing Pterodactyl accounts and permissions will be used; no separate billing, customer-account, mailing or domain-management platform is planned.

See [design](docs/DESIGN.md), [roadmap](docs/ROADMAP.md), [provider-access checklist](docs/PROVIDER-ACCESS.md) and [security policy](SECURITY.md).

## Development
Documentation only. Do not deploy this repository to a production panel. Development will proceed only after required provider access is verified or scope is explicitly revised. Builds, installation tests and compatibility claims are all pending.

This is an independent project, not affiliated with or endorsed by Mojang, Microsoft, CurseForge, Overwolf or Pterodactyl. No legacy vendor code is included. A source-code license will be selected before implementation is published; this repository does not yet grant a blanket license to future code.
