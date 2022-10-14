module.exports = {
    printWidth: 120, // 每行最大宽度，超过就换行
    trailingComma: 'es5',
    tabWidth: 4, // 缩进使用4个字节
    semi: false, // 句尾是否添加分号
    singleQuote: true, // 单引号替代双引号
    arrowParens: 'avoid', // 箭头函数只有一个参数时，去掉括号; 如果是"always"，则始终添加括号
    bracketSpacing: true, // 属性的冒号后面加空格
    eslintIntegration: false, // 不让 prettier 使用 eslint 格式校验
    //多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）
    bracketSameLine: true,

    // 是否缩进 Vue 文件中的代码<script>和<style>标签。有些人（比如Vue 的创建者）不会缩进来保存缩进级别，但这可能会破坏编辑器中的代码折叠。
    // false - 不要在 Vue 文件中缩进脚本和样式标签。
    // true - 在 Vue 文件中缩进脚本和样式标签。
    vueIndentScriptAndStyle: false,

    // 每行单个属性
    // 在 HTML、Vue 和 JSX 中每行强制执行单个属性。
    // false- 不要每行强制执行单个属性。
    // true- 每行强制执行单个属性。
    singleAttributePerLine: false,
}
