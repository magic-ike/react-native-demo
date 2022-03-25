# React Native Demo

A demo app built with React Native and Firebase. This project can serve as a great foundational codebase for an app startup to quickly build a functional, cross-platform MVP.

<img src="./assets/preview.gif" width="300px">

## Features

- Navigation flow ([React Navigation 5](https://reactnavigation.org/docs/5.x/getting-started/))

- State management ([Redux](https://redux.js.org/introduction/getting-started))

- Authentication ([Firebase Auth](https://firebase.google.com/docs/auth))

- Persistent storage
  - Database ([Firebase Realtime DB](https://firebase.google.com/docs/database))
  - Image storage ([Firebase Storage](https://firebase.google.com/docs/storage))

## Running Locally

- Clone the repo:

```shell
git clone https://github.com/magic-ike/react-native-demo.git
cd react-native-demo
```

- Go to the [Firebase Console](https://console.firebase.google.com/u/0/) and sign up for an account if necessary.

- Create a new project.

- Select the "Web" option under "Get started by adding Firebase to your app."

- Name the app, check the box to also set up Firebase Hosting (this can also be done later), and click **Register app**.

- Copy the `firebaseConfig` variable (this can also be accessed later in "Project settings") and save it for later. It should look like this:

```shell
const firebaseConfig = {
  ...
};
```

- Then, select the **Authentication** tab in the sidebar menu.

- Click **Set up sign-in method**.

- Select **Email/Password**, toggle **Enable**, then click **Save**.

- Finally, select the **Database** tab in the sidebar menu, select **Start in test mode**, then click **Enable**.

- Open your project and create a new folder called `config`.

- Inside that folder, create a new file called `config.js`.

- In that file, paste in the `firebaseConfig` variable you copied earlier, then export it. The file should look like this:

```shell
export const firebaseConfig = {
  ...
};
```

- Save the file.

- In your terminal, install the dependencies and serve the app:

npm

```shell
npm install
npm run start
```

yarn

```shell
yarn
yarn start
```
