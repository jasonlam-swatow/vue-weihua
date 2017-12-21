# README.md

## Architect

![](https://github.com/jasonlam-swatow/vue-weihua/blob/master/static/architect.png)

## File structure

├---- build                     // webpack configs

├---- config                    // other configs

├---- src                       // source code

│   ├---- api                   // all request apis

│   ├---- assets                // static assets like fonts and images

│   ├---- components            // global public components

│   ├—— icons                   // all svg icons used

│   ├---- router                // router configs

│   ├---- store                 // global vuex store

│   ├---- styles                // global styles

│   ├---- utils                 // global public util functions

│   ├---- views                 // views

│   ├---- App.vue               // entry point

│   ├---- main.js               // entry script for initializing and mounting components

│   └---- permission.js         // auth management

├---- static                    // third-party assets

├---- .babelrc                  // babel-loader configs

├---- eslintrc.js               // eslint configs

├---- .gitignore

├---- favicon.ico

├---- index.html                // html template

└---- package.json

Let's focus on the `src` folder here. Notice that:

* **Always keep the file structures totally consistent between apis and views!**
* If you need new icons, download them from [Alibaba iconfont](http://iconfont.cn/) and into `src/icons`, pass the file name of the svg in `svg-icon`, and the icon shall be rendered.

## Usage

``` bash

# Install dependencies
npm install

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Mocking data

* We use [Easy Mock](https://easy-mock.com/) as mocking server platform.
* Please modify mocking apis under [This project](https://easy-mock.com/project/5a3b306e38863567823099ef). Login with **jasonlam0619** as both username and password.
* If you wanted to change the mocking source (God forbid), go to `config/dev.env.js` and `config/prod.env.js` for each environment.

