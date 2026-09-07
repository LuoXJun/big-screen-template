/* eslint-disable */
// @ts-nocheck

/**
 * Element Plus 全量组件类型兜底。
 * unplugin-vue-components 按实际编译的模板生成 dts（src/types/components.d.ts），
 * 未接线的组件模板（如 baseFormItem 的 el-input/el-select）不在其覆盖范围，
 * 而 main.ts 全量注册 EP —— 这里补齐声明，保证全局类型环境完整。
 * 新增 EP 组件类型时在此追加一行即可。
 */

export {}

declare module 'vue' {
    export interface GlobalComponents {
        ElAside: typeof import('element-plus/es')['ElAside']
        ElBadge: typeof import('element-plus/es')['ElBadge']
        ElButton: typeof import('element-plus/es')['ElButton']
        ElCard: typeof import('element-plus/es')['ElCard']
        ElCheckbox: typeof import('element-plus/es')['ElCheckbox']
        ElCheckboxGroup: typeof import('element-plus/es')['ElCheckboxGroup']
        ElCol: typeof import('element-plus/es')['ElCol']
        ElContainer: typeof import('element-plus/es')['ElContainer']
        ElDatePicker: typeof import('element-plus/es')['ElDatePicker']
        ElDialog: typeof import('element-plus/es')['ElDialog']
        ElDropdown: typeof import('element-plus/es')['ElDropdown']
        ElDropdownItem: typeof import('element-plus/es')['ElDropdownItem']
        ElDropdownMenu: typeof import('element-plus/es')['ElDropdownMenu']
        ElEmpty: typeof import('element-plus/es')['ElEmpty']
        ElFooter: typeof import('element-plus/es')['ElFooter']
        ElForm: typeof import('element-plus/es')['ElForm']
        ElFormItem: typeof import('element-plus/es')['ElFormItem']
        ElHeader: typeof import('element-plus/es')['ElHeader']
        ElIcon: typeof import('element-plus/es')['ElIcon']
        ElInput: typeof import('element-plus/es')['ElInput']
        ElLink: typeof import('element-plus/es')['ElLink']
        ElMain: typeof import('element-plus/es')['ElMain']
        ElMenu: typeof import('element-plus/es')['ElMenu']
        ElMenuItem: typeof import('element-plus/es')['ElMenuItem']
        ElOption: typeof import('element-plus/es')['ElOption']
        ElPagination: typeof import('element-plus/es')['ElPagination']
        ElPopover: typeof import('element-plus/es')['ElPopover']
        ElRadio: typeof import('element-plus/es')['ElRadio']
        ElRadioButton: typeof import('element-plus/es')['ElRadioButton']
        ElRadioGroup: typeof import('element-plus/es')['ElRadioGroup']
        ElRow: typeof import('element-plus/es')['ElRow']
        ElSelect: typeof import('element-plus/es')['ElSelect']
        ElSubMenu: typeof import('element-plus/es')['ElSubMenu']
        ElTable: typeof import('element-plus/es')['ElTable']
        ElTableColumn: typeof import('element-plus/es')['ElTableColumn']
        ElTabPane: typeof import('element-plus/es')['ElTabPane']
        ElTabs: typeof import('element-plus/es')['ElTabs']
        ElTooltip: typeof import('element-plus/es')['ElTooltip']
        ElTree: typeof import('element-plus/es')['ElTree']
        ElTreeSelect: typeof import('element-plus/es')['ElTreeSelect']
    }
}
