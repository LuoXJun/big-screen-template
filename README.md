# base-screen-template

Vue 3 + TypeScript + Vite 基础大屏项目模板

## 包管理器（仅允许 pnpm）

本项目通过三重机制约束包管理器与运行环境：

1. **Corepack 版本校验**：`package.json` 中的 `"packageManager": "pnpm@11.21.0"` 字段，Corepack 会校验 pnpm 版本是否一致
2. **依赖安装拦截**：`preinstall` 钩子中的 `only-allow pnpm`，使用 npm / yarn 执行依赖安装时直接报错退出
3. **Node 版本约束**：`engines.node`（`^20.19.0 || >=22.12.0`，vite 8 的最低要求）+ `.npmrc` 中的 `engine-strict=true`，Node 版本不满足时拒绝安装

## 迁移的外部代码一律不计入检查范围

### 代码格式检查

- 使用prettier进行代码格式约束，本地需要安装Prettier 扩展,并设置prettier为默认格式化工具（在页面中点击鼠标右键，选择...格式化，选中prettier）
- 约束文件为.prettierrc
- 忽略文件文件为 .prettierignore
- 使用npm run formatSrc格式化src下的所有文件
- 使用npm run format格式化全局

### 代码书写规范约束

- 使用eslint进行代码约束
- 约束规则和忽略规则见eslint.config.ts
- 使用npm run lint进行全局检查

### 代码自检

- 使用vue-mess-detector进行代码自检，可根据提示进行相应的代码调整
- 配置文件为.config/vue-mess-detector.json
- 目前已忽略else的条件审查
- 关闭script代码行数检查，使用eslint进行单页面的总代码行数检查

### 类型文件相关

- 组件、工具函数等专用的类型文件可和文件放在同一文件夹下，其余放在types文件夹下
- 后台数据相关的类型文件按照接口文档模块进行分类放在types/service文件夹下，以接口前缀为文件夹名
- 全局类型写在window.global.d.ts中
- 对elementplus类型的扩写写在elementplusType.type.d.ts中

### vue常见问题

- .vue页面中使用router时，通过useRouter()获取而不是从router文件中导入，因为可能会导致使用了新旧的不同router实例。eg：当前文件同过引入的方式使用router，热更新后当前页面触发的路由跳转会失效，因为此时的router实例发生了变化，但是这个变化是局部的，useRouter没有这个问题，因为useRouter始终会返回当前vue实例中正在使用的router实例。

### 持续更新中
