/**
 * @example
 * */
const labels = [
    { label: '用户名', props: 'userName' },
    { label: '姓名', props: 'realName' },
    { label: '创建时间', props: 'createTime' },
    { label: '电话号码', props: 'phone' },
    { label: '操作', props: 'operation' }
];

export const tableColumnConfig = reactive(
    labels.map((item) => {
        const obj: ITableColumn = {
            filed: item.props,
            label: item.label,
            options: {
                align: 'center',
                showOverflowTooltip: true
            }
        };

        if (item.label === '操作') {
            obj.options!.fixed = 'right';
            obj.operations = [
                {
                    label: '编辑',
                    type: 'edit',
                    btnType: 'info',
                    link: true
                },
                {
                    label: '删除',
                    type: 'remove',
                    link: true,
                    btnType: 'danger',
                    confirm: {
                        mode: 'popover',
                        content: '您确认要删除此用户吗？一旦删除将无法恢复。'
                    }
                }
            ];
        }
        return obj;
    })
);
