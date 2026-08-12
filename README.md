# base-screen-template

Vue 3 + TypeScript + Vite 基础大屏项目模板

## 包管理器（仅允许 pnpm）

本项目通过四重机制约束包管理器与运行环境：

1. **Corepack 版本校验**：`package.json` 中的 `"packageManager": "pnpm@11.21.0"` 字段，Corepack 会校验 pnpm 版本是否一致
2. **依赖安装拦截**：`preinstall` 钩子调用 `node scripts/check-package-manager.cjs`，使用 npm / yarn / bun 执行依赖安装时直接报错退出（不依赖网络）
3. **pnpm 自身版本校验**：`.npmrc` 中的 `package-manager-strict=true`，pnpm 运行时校验 `packageManager` 字段，版本不匹配则拒绝执行
4. **Node 版本约束**：`engines.node`（`^20.19.0 || >=22.12.0`，vite 8 的最低要求）+ `.npmrc` 中的 `engine-strict=true`，Node 版本不满足时拒绝安装

> 注：`npm install --ignore-scripts` 可跳过 preinstall 钩子（包管理器设计如此，仓库侧无法阻止），如需彻底防止，请在 CI 中统一使用 pnpm 执行安装。

### 为什么不要用 npm i？（npm ≤ 11）

npm ≤ 11 不检查 `packageManager` 字段，且执行顺序为「先联网解析依赖树 → 再执行 preinstall 拦截」，因此 `npm i` 会先长时间联网转圈（看起来像卡死），之后才被拦截报错；若本地 `node_modules` 由 pnpm 安装（`.pnpm/` 结构），npm 的 arborist 读不懂该布局，还会直接崩溃（`Cannot read properties of null`）。**请使用 `pnpm install` / `pnpm add`。**

在 **npm 12+** 中，root `preinstall` 已提前到依赖安装之前执行，`npm i` 会在联网解析前被拦截脚本直接报错退出（实测约 2 秒）。环境要求：Node `^22.22.2 || ^24.15.0 || >=26.0.0` + `npm install -g npm@12`（nvm-windows 下每个 Node 版本的全局 npm / pnpm 相互独立，切换 Node 后需重新安装：`npm install -g npm@12 pnpm@11.21.0`）。

> 注：`.npmrc` 中的 `package-manager-strict` 为 pnpm 专属配置（校验 `packageManager` 版本），npm 会提示 unknown config 警告，不影响使用。

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
