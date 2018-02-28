# 资质管理系统—前端文档

## 文件结构

```

├---- build                     // webpack 配置
├---- config                    // 其余配置
├---- src                       // 源代码
│   ├---- api                   // 所需 APIs
│   ├---- assets                // 静态资源如字体、图片
│   ├---- components            // 全局公用组件
│   ├—— icons                   // SVG 图标
│   ├---- router                // 前端路由配置
│   ├---- store                 // 全局 vuex store
│   ├---- styles                // 全局样式
│   ├---- utils                 // 全局公用工具函数
│   ├---- views                 // 视图文件
│   ├---- App.vue               // 入口组件
│   ├---- main.js               // 入口脚本
│   └---- permission.js         // 权限管理
├---- static                    // 第三方资源
├---- .babelrc                  // babel-loader 配置
├---- eslintrc.js               // eslint 配置
├---- .gitignore
├---- favicon.ico
├---- index.html                // HTML 模板
└---- package.json
```

## 布局

本项目大部分页面遵循 header、sidebar、app-main 布局，除了个别页面如 `login`、`404` 等。若想在一个项目中有多种不同的 layout 也不难，只须在一级路由处选择不同的 layout 组件就行。

    // no layout
    {
      path: '/401',
      component: _import('errorPage/401')
    }
    
    // has layout
    {
      path: '/documentation',
      // 可选择不同的 layout 组件
      component: Layout,
    
      // 这里开始对应的路由都会显示在 app-main 中
      children: [{
        path: 'index',
        component: _import('documentation/index'),
        name: 'documentation'
      }]
    }
    
因为使用了 vue-router 的 [路由嵌套](https://router.vuejs.org/zh-cn/essentials/nested-routes.html)，增加或者修改页面只会影响 app-main 这个主体区域，其它如侧边栏或导航栏都不会生变。

## 接口联调

为了方便管理维护，统一的请求处理都放在 `@/api` 目录下，并且一般按照 model 维度拆分文件，如：

    api/
      login.js
      article.js
      remoteSearch.js
      ...

在视图文件（或其他任何文件）中，导入所需的接口方法以进行调用。

在 `@/utils/request.js` 里，基于 [axios](https://github.com/axios/axios) 库封装并配置了全局的 Ajax 请求方法。对网络请求的统一甄别和拦截、对请求参数和请求头，都可在此完成。

## 登录及权限验证

登录视图（`login/index.vue`）中 dispatch `Login` action 后（详见代码及 [Vuex 文档](https://vuex.vuejs.org/)），`@/store/modules` 下的 `Login` action 定义进行处理——用接收到的 `username` 和 `password` 请求登录接口，获得 token 后即 commit 一个 `SET_TOKEN` mutation，该 mutation 定义中将 token 写入 state。（上述为本项目典型的 Vuex 工作流程，可作其他类似逻辑参考）。

现在路由层面权限的控制代码都在 `@/permission.js` 中，如果想修改逻辑，直接在适当的判断逻辑中 `next()` 释放钩子即可。

`@/permission.js` 会在登录页面以外的所有页面中，拦截路由跳转并检查权限。当 store 中没有角色信息，首先 dispatch `GetInfo` 来获取用户信息，再根据其所属角色 dispatch `GenerateRoutes` 以生成对应的可访问路由。同时也会执行一系列对全局字典数据的请求，以供取用。

## 路由及菜单

`@/router.js` 下分为 `constantRouterMap` 及 `asyncRouterMap`，前者代表那些不需要动态判断权限的路由（如登录页、404 等通用页面），后者代表需要动态判断权限而有所不同的路由表。

上述 `GenerateRoutes` dispatch 后，`@/store/modules/permission.js` 会 commit `SET_ROUTES` action，根据 `/mine` 接口返回的菜单信息，为 `asyncRouterMap` 里没对应上的路由加上 `hidden: true` 的属性，使其从侧边栏菜单中隐藏；再通过 `router.addRoutes` 动态挂载到 router 上。

本项目侧边栏和路由是绑定的，只须在 `@/router/index.js` 下面配置对应的路由，侧边栏就能动态生成。

本项目配置路由时所提供的配置项：

    //当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
    hidden: true
    
    //当设置 noredirect 的时候该路由不会在面包屑导航中出现
    redirect: noredirect
    
    //当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
    //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
    alwaysShow: true
    
    name:'router-name'            //设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
    meta : {
      roles: ['admin','editor']   //设置该路由进入的权限，支持多个权限叠加
      title: 'title'              //设置该路由在侧边栏和面包屑中展示的名字
      icon: 'svg-name'            //设置该路由的图标
      noCache: true               //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
    }
    
### 路由懒加载

本项目结合 Vue 的 [异步组件](https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6) 和 Webpack 的 [代码分割](https://doc.webpack-china.org/guides/code-splitting) 功能，实现路由组件的懒加载：

    const Foo = () => import('./Foo.vue')
    
为免开发过程中每次更改代码触发热更新，使页面刷新滞后，只在生成环境之中才使用路由懒加载。

开发环境：

    module.exports = file => require('@/views/' + file + '.vue').default

生产环境：

    module.exports = file => () => import('@/views/' + file + '.vue')

## 样式

本项目使用了 Less 作为样式预编译语言。

    ├── styles
    │   ├── element-ui.scss          # 全局自定义 element-ui 样式
    │   ├── index.scss               # 全局通用样式
    │   ├── mixin.scss               # 全局mixin
    │   ├── transition.scss          # vue transition 动画
    │   └── variables.scss           # 全局变量

常见的工作流程是，全局样式都写在 `@/styles` 目录下，每个页面自己对应的样式都写在各自的 `.vue` 文件中。

### 图标

在 [iconfont.cn](http://iconfont.cn/) 上（或随便哪里）寻找 SVG 图标，放入 `@/icons/svg`，便会自动导入。使用方式：

    <svg-icon icon-class="password" /> // icon-class 为 icon 的名字
    
## ESLint

[ESLint](https://eslint.org/docs/rules/) 这个工具是为了代码规范，不仅可以很大程度地避免基本语法错误，也保证了代码的可读性。所有的配置文件都在 `.eslintrc.js` 中。 本项目基本规范是依托于 Vue 官方的 eslint 规则 [eslint-config-vue](https://github.com/vuejs/eslint-config-vue) 加以少许修改。尽可按照需求另作定制化配置。

如果实在不想使用 ESLint 校验，只须在 `config/index.js` 中 `useEslint: true` 设为 `false` 即可。
    
## 跨域问题

在 dev 开发模式下可以下使用 Webpack 的 `proxy` 来进行跨域（[文档](https://doc.webpack-china.org/configuration/dev-server/#devserver-proxy)。在生产环境下则需要使用 nginx 反向代理。不管是 proxy 和 nginx 的原理都是一样的，通过搭建一个中转服务器来转发请求规避跨域的问题。

## 构建和发布

## 构建

`npm run build` 即可构建应用。

如果构建文件很大，可通过 `webpack-bundle-analyzer` 命令构建并分析依赖模块的体积分布，从而优化代码。

执行 `npm run build:prod --report` 命令之后，在 http://127.0.0.1:8888 页面看到具体的体积分布：

![](media/15197846113085/15197878079643.jpg)

## 发布

对于发布来讲，只须将最终生成的静态文件即通常情况下 `/dist` 目录的静态文件发布到 CDN 或静态服务器即可。需要注意的是其中的 `index.html` 通常会是你后台服务的入口页面，在确定了 JS 和 CSS 的静态之后可能需要改变页面的引入路径。部署时可能会发现资源路径不对，只需修改 `config/index.js` 文件资源路径即可。

    assetsPublicPath: '/'   // 请根据自己路径来配置更改

Peace out.

