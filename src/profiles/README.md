# Profiles

One JSON file per person. The file name must be your GitHub username in lowercase, e.g. `octocat.json`.

```bash
cp src/profiles/_template.json src/profiles/<your-username>.json
npm run validate:profiles
```

Fields:

| Field      | Required | Notes                                          |
| ---------- | -------- | ---------------------------------------------- |
| `name`     | yes      | Display name, up to 60 characters              |
| `github`   | yes      | Your GitHub username. Your avatar comes from it |
| `bio`      | yes      | Up to 200 characters                           |
| `role`     | no       | e.g. "Student · UH Mānoa", up to 60 characters |
| `favorite` | no       | Favorite language or tool, up to 40 characters |
| `building` | no       | What you want to build next, up to 140 chars   |
| `emoji`    | no       | One emoji for your card                        |
| `links`    | no       | `website`, `linkedin`, `twitter`, https only   |

Do not edit anyone else's file. Do not edit `_template.json`.
