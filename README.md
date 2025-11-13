# Bot of Twelve

Bot of Twelve is a Discord bot built for Dofus-Touch-inspired communities that want to run competitive and cooperative events directly from their server. It automates tournament logistics, keeps long-running PvM leagues on track, and provides localized slash commands so moderators can focus on the fun parts of hosting events.

## Key Features
- **Tournament orchestration for multiple formats.** The bot registers players, forms balanced teams, shuffles qualification matches, manages Top/Low group stages, and supports knockout brackets for popular PvP modes such as 1v1, 2v2, 3v3, and 4v4.
- **Persistent state with PostgreSQL.** Guild tournaments, Hall of Fame entries, language settings, and player jobs are stored in PostgreSQL so data survives bot restarts and can be shared across shards or deployments.
- **Dofus-themed content helpers.** Rich datasets for arenas, bosses, dungeons, classes, spells, and achievements power context-aware slash commands and embeds tailored to the Twelve.
- **Localization-ready UX.** Message bundles and locale helpers dynamically translate prompts, error messages, and menu labels so communities can run events in multiple languages.

## Tech Stack
- [Node.js](https://nodejs.org/) (>= 18) with CommonJS modules and native test runner.
- [discord.js v14](https://discord.js.org/) for gateway events and interaction handling.
- [PostgreSQL](https://www.postgresql.org/) via `pg` for persistent storage.

## Slash Command Highlights
- `/boss`, `/dungeon` – let users display bosses and their stats or the whole dungeon with their room line-up.
- `/register` – let players pick their class and join the open tournament queue.
- `/pvp_start`, `/pvp_next`, `/pvp_info`, `/pvp_stop` – manage PvP rounds, scheduling, and match info for ongoing tournaments.
- `/pvm_start` & `/pvm_stop` – coordinate cooperative PvM dungeon runs with the same tooling.
- `/hall_of_fame` & `/delet_hof` – celebrate past champions or prune outdated entries.
- `/language` & `/guild_name` – customize guild-specific presentation in just a few clicks.
