# Emoji fallback configuration

The [`emoji-fallback.json`](./emoji-fallback.json) file defines fallback Discord emoji
mentions for every command group. Each leaf entry **must** follow the structured
format below so the runtime can derive metadata and optional variants:

```json
{
  "key": "emoji_key_used_in_discord",
  "fallback": "<:emoji_name:emoji_id>",
  "variants": {
    "variantName": {
      "key": "optional_override_key",
      "fallback": "<:variant_name:variant_id>"
    }
  }
}
```

* `key` – Discord emoji key to resolve against the server snapshot. When omitted,
  it is derived from the fallback mention or, as a last resort, from the property
  name in the JSON file.
* `fallback` – The literal emoji mention string that should be used when no
  server snapshot entry exists.
* `variants` – Optional map of named variants (e.g. gendered class icons or UI
  alternates). Variant values may be objects (as above) or raw mention strings;
  strings are automatically normalized into `{ "key", "fallback" }` objects.

During startup, [`emojis.js`](./emojis.js) processes this configuration and
exposes three helper objects:

* `EMOJI_LIST` – The legacy flattened structure that maps to the resolved mention
  for each default entry. Existing consumers can continue to read emoji strings
  from this object.
* `EMOJI_KEYS` – Mirrors the JSON layout but stores metadata objects with the
  registered `key` plus nested `variants`. This is useful when installers need
  the emoji identifiers instead of their mentions.
* `EMOJI_DETAILS` – Provides the resolved mention, fallback mention, and any
  declared variants for each leaf. Consumers that need richer data (e.g. UI
  exporters) should prefer this structure.

The `classes` section demonstrates how to capture gendered icons by declaring
female and male variants. Use the same pattern when introducing alternate
artwork or dungeon monster lists so downstream tooling can access every variant
in a predictable way.