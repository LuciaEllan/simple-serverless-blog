# Simple Serverless Blog
As the project name proposes, this is a simple blog system powered entirely by Firebase, which is a serverless platform.
You may use this without adding a billing account onto Firebase.

## Why use this?
This is not a feature-rich system, but at least you could have a full control over your system and data with this. And (I think) this is fairly easy to setup. If all you want is just some markdown and a few attached files hosted for free, then this is for you. If what you want is some fully packed CMS, then you'd better to go for [Hugo](https://gohugo.io/) or Confluence.

## Why I built this?
After I quit last job at the end of 2018, I felt that I have nothing professional in my field. I wanted to have some knowledge on modern web tech like React or Angular, and finally I chose Vue.js. Coincidentally I had to build my website back which I lost previous one in 2016. So, I just built it myself.
This system powers [my personal newborn blog](https://www.luciaellan.com/) - with a bit of delicate touch.

## What you'll have with this
This system does not offer a lot of features. With this system, you'll have:
* A simple [Quasar](https://v1.quasar-framework.org/) app running on Firebase hosting that you have nothing to manage on server
* An ability to write some markdown articles (rendered via [Marked.js](https://github.com/markedjs/marked)), with tagging enabled
* An ability to upload your files to Firebase storage and link them on the articles
* You may write private articles which only can be seen by you

# Setup
It looks a bit long, but you won't find it hard. You'll setup a complete Firebase project from scratch.

## Prerequisites
* Able to use a command line ;D
* [Node.js](https://nodejs.org/) 8+ & NPM
* A Google account

## Install required tools first
* Install [Firebase CLI](https://firebase.google.com/docs/cli/) & [Quasar CLI](https://v1.quasar-framework.org/quasar-cli/installation)
```shell
npm install -g firebase-tools @quasar/cli
```

## Create and setup a Firebase project for your blog
Get to [Firebase Console](https://console.firebase.google.com/) and create a new project(or use existing one).  
Then, enable following features (you don't need to enable billing!):
* In Authentication, enable Google auth provider
* In Database, enable Firestore(NOT Realtime Database!), security rule doesn't matter.
* In Storage, enable it. Again, security rule doesn't matter.

Now, take a memo for your project ID.

## Get the engine and configure it
1. Obtain this engine, either by using `git clone`, or downloading a .zip archive.
2. Install dependencies via:
   * In `admin/`, run `npm install`
   * In `functions/`, run `npm install`
   * In `quasar/`, run `npm install`
1.Add following line in object named `map` of file `quasar/node_modules/quasar/dist/babel-transforms/imports.js`. This is used to extend builtin `QUploader` component with Firebase storage. [Quasar documentation](https://v1.quasar-framework.org/vue-components/uploader) states that it can be extended by mixing `QUploaderBase` in, but it is not exposed as of 1.0beta. So I had to expose it myself. I hope Quasar team gets a workaround on this.
```
"QUploaderBase": "src/components/uploader/uploader-base-mixin.js",
```
1. Setup your Firebase project ID by editing `.firebaserc` file.
1. In [Firebase Console](https://console.firebase.google.com/), obtain config for a web app. Enter that config in `quasar/src/configs/firebase-config.js`
   * Watch out for strict linting, all string must be quoted by **single quote**, and lines must have proper indentation. Tab size is **2**. If those linting rule is broken, the linter will complain at the build time and refuse to build.
1. Edit `quasar/package.json` for `description` and `productName` field. This will be your browser title and meta description.
1. (Optional) Set your site-specific config like contacts by editing `quasar/src/configs/blog-config.js`

## Build and deploy!
Once you finish the configuration, you can build the site by running following command in `quasar/`:
```shell
quasar build
```
This will build your site in `quasar/dist/spa/`. Now deploy the site by running following command in your project root:
```shell
firebase deploy
```

## Set the admin privilege (to you)
First, download a JSON-formed private key for a service account of your Firebase project. This can be done in your project's setting at [Firebase Console](https://console.firebase.google.com/). Name it `serviceAccountKey.json` and place it into `admin/private/serviceAccountKey.json`.  
Once you deploy the site, visit the site and log into the site using your Google account (which will be the admin) by clicking the button on bottom-left. If you successfully logged in, now you'll find your user ID in Authentication tab of [Firebase Console](https://console.firebase.google.com/). Take a memo of that ID(you can use the *Copy* button on the right).

Now you can grant the admin privilege for your site to a user by running following command in `admin/`:
```shell
node add_admin_privilege.js
```
The script will ask you for a target user ID. Provide your ID taken above and you're done.

## Great, now you have a working blog!
Log into the site again (by refreshing or logging out and back in) and now you can actually write a post. Have fun on some (serverless) blogging!

## Maintaining/Customizing the site
This blog engine is just a plain [Quasar](https://v1.quasar-framework.org/) app, which is powered by [Vue.js](https://vuejs.org/). You can make any change in any part of the site and deploy again. Note that all CSS is written in [Stylus](http://stylus-lang.com/), which just accepts plain CSS too.  
* Left bar menu and contant link at the bottom is managed by `quasar/src/configs/blog-config.js`.
* Generic color theming is done in `quasar/src/css/quasar.variables.styl`.
* Code highlight CSS is in `quasar/src/css/code_highlight.styl`. Provided style is `XCode` style included in [highlight.js](https://highlightjs.org/)
* Individual post display style is defined in `quasar/src/css/blog_post.styl`.

Once you make any change into the site, you have to build it again by using `quasar build` command in `quasar/`, and the deploy it into Firebase with `firebase deploy --only hosting` command. As long as you don't make any changed to back-end logics, you don't need to deploy other things than hosting.

# Known Issues
Some issues could be fixed in later time.
* This code includes Firebase API keys set to my test project. It may considered a leak of secret, but it's OK in this case. That keys are open to the world if it was in a client-side service anyway.
* Private articles is not visible when you load the page first time, including page refresh. This is caused because I don't wait for auth result when loading articles. Actually, I can't even determine whether the user WILL sign in.
* I used some hack to make input textarea fill full height on desktop, but it looks like it just failed in mobile browsers.
* Link copy feature is not available in mobile browsers, what a shame. I'll just have to implement some carat-related editor feature.