# Telicent QUERY

Starter application for querying data in Telicent CORE

## Intro

## Usage

### Run locally

Export the required env vars (see
<https://telicent.atlassian.net/wiki/x/BICSNw>), then:

```sh
git clone <repo>
cd telicent-query
yarn install
yarn dev
```

The app boots at <http://localhost:3001/query/>.

### Configuration

Runtime config lives in `env-config.js` (gitignored), served at `/env-config.js`
via a `<script>` tag in `index.html`. The committed `env-config.default.js`
is an `envsubst` template holding `${VAR}` placeholders. On the first
`yarn dev` or `yarn build`, `scripts/cp-config.js.sh` runs the template
through `envsubst` into `env-config.js`, then copies it into `./public/`.
The script fails fast if any required host env var is unset.

To reset, delete `env-config.js` and re-run `yarn dev`. You can also edit
the generated `env-config.js` directly — your edits won't be tracked, and
bootstrap only runs when the file is missing.

`envsubst` is required (`brew install gettext` on macOS).

#### Architecture: runtime config

Config is served as a separate `<script>` file rather than baked in via
Vite's `import.meta.env.VITE_*` mechanism. This lets the same built bundle
target dev / staging / prod by swapping the file at runtime — in production
a Helm configmap mounts the prod values over `env-config.js` (see
`charts/query-ui/templates/configmap-envjs.yaml`). Don't migrate this to
`VITE_*` env vars; doing so would bake config at build time and break the
configmap pattern.

### Common commands

| Command       | What it does                                                    |
|---------------|-----------------------------------------------------------------|
| `yarn dev`    | Run the app on <http://localhost:3001/query/>                   |
| `yarn build`  | Production build into `./build/`                                |
| `yarn test`   | Run jest tests                                                  |
| `yarn lint`   | Run eslint                                                      |
| `yarn format` | Run prettier in check mode (`yarn format:fix` to apply changes) |

### Git workflow

When a feature branch is pushed to origin, a workflow will be triggered that will run integrated tests.
The pull request for the feature branch will only be able to be merged if these pass.

When the feature branch is merged into `main`, another workflow will be triggered that assesses the
commit history and calculates the next version number. A release PR with an automatically generated changelog will be generated.

> It is possible to merge more than one feature branch into main. The release PR will update accordingly.
> Once you are happy with the release PR, merge it into `main` and a new tag and release will be created.
