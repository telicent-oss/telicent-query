# Telicent QUERY

Starter application for querying data in Telicent CORE

## Intro

## Usage

### Run locally

1. Clone and navigate to telicent-query, then install dependencies: `yarn`.
2. Create custom config (Optional) - **Default Config:** can be found in `override.env-config.js`

- Run:
  ```sh
  cd <projectRoot>
  cp ./override.env-config.js env-config.js
  ```
- Edit: `env-config.js` and `sensitive/secret-config.js`(_gitignored_)
  > **Note:** In local, these files are copied to `./public`

4. Run `yarn start` to start QUERY.

### Git workflow

When a feature branch is pushed to origin, a workflow will be triggered that will run integrated tests.
The pull request for the feature branch will only be able to be merged if these pass.

When the feature branch is merged into `main`, another workflow will be triggered that assesses the
commit history and calculates the next version number. A release PR with an automatically generated changelog will be generated.

> It is possible to merge more than one feature branch into main. The release PR will update accordingly.
> Once you are happy with the release PR, merge it into `main` and a new tag and release will be created.
