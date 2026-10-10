# Provider-access checklist

All implementation and end-to-end installation tests remain pending.

- **CurseForge:** official application form located; not submitted or approved. Clarify author consent, key distribution, caching/storage, rates and any costs. No borrowed keys.
- **Modrinth:** public catalog read smoke test succeeded during research. Server-compatible artifacts and complete manifests still need verification.
- **Mojang:** version-manifest read succeeded during research. Exact server artifact and Java requirements still need verification.
- **Fabric:** game metadata read succeeded during research. Exact loader/installer resolution still needs verification.
- **Forge/NeoForge and Paper:** intended sources; exact integration and runtime requirements unverified.
- **FTB, Technic and other providers:** not committed release scope; access and terms require research before inclusion.

A successful metadata request is not proof that a complete pack can be installed. Restricted or unavailable files must produce a clear unsupported result, not a bypass.

## Official references
- [CurseForge application guidance](https://support.curseforge.com/en/support/solutions/articles/9000208346-about-the-curseforge-api)
- [CurseForge third-party terms](https://support.curseforge.com/en/support/solutions/articles/9000207405-curse-forge-3rd-party-api-terms-and-conditions)
- [Modrinth API](https://docs.modrinth.com/api/)
- [Paper downloads service](https://docs.papermc.io/misc/downloads-api/)
