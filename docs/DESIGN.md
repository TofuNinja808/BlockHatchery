# Proposed design

A narrowly scoped, private backend will resolve provider metadata and permitted server artifacts. A Pterodactyl integration will enforce native per-server authorization and explicit installation confirmation.

The backend must not have access to the Docker socket, production worlds or the panel database. Provider credentials stay server-side. Exact network, runtime and storage choices remain undecided pending provider requirements.

Installation should resolve the exact pack release, Minecraft version, loader and Java requirements before staging files. Validate hashes where available, reject archive path traversal and unsafe download destinations, prevent concurrent installations, and fail without deleting existing data when downloads fail. Arbitrary pack changes are not automatically world-compatible.

Tests will run on isolated panel/node instances and disposable worlds, never existing player servers. No installation safety or runtime compatibility is proven yet.

Public self-hosting does not imply a shared public API credential. Ask each provider how independent operators are authorized. In particular, resolve CurseForge key-sharing, temporary storage and API-data caching restrictions before implementation.
