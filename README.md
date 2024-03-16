# AppDev Announcements

## Backend Setup

1. Navigate to the `/backend` folder.
2. Create a copy of `.envtemplate` and rename it to `.env`. This should be inside of the `/backend` folder.
   1. `NODE_ENV` should be `"prod"` or `"dev"`.
   2. You can find the `.env` file in the `#annnouncements-dev` Slack channel.
3. Install dependencies using Yarn and/or Node.
   1. If you don’t have Yarn installed, run `brew install yarn`. Alternatively, if you already have Node, you can run `sudo npm i -g yarn`.
   2. Install dependencies using `yarn install`.
4. Use `yarn dev` to run the dev server locally, or `yarn build` to create a production build that can be run using `yarn start`.
5. Use `yarn test` to run the Jest test suite.
