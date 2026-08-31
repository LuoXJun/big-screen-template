export interface SearchParams {
    id: string;
    warnType: string;
    warnLv: string;
    status: string;
    time: string;
    area: string;
}

export const formConfig = ref<IformItem<{ filed: keyof SearchParams }>[]>([
    {
        filed: 'id',
        label: '',
        type: 'input',
        placeholder: '请输入告警编号/设备名称'
    },
    {
        filed: 'warnType',
        label: '',
        type: 'select',
        placeholder: '告警类型',
        select: {
            options: [
                { label: '下拉选项1', value: '1' },
                { label: '下拉选项2', value: '2' }
            ]
        }
    },
    {
        filed: 'warnLv',
        label: '',
        type: 'select',
        placeholder: '告警等级',
        select: {
            options: [
                { label: '下拉选项1', value: '1' },
                { label: '下拉选项2', value: '2' }
            ]
        }
    },
    {
        filed: 'status',
        label: '',
        type: 'select',
        placeholder: '处理状态',
        select: {
            options: [
                { label: '下拉选项1', value: '1' },
                { label: '下拉选项2', value: '2' }
            ]
        }
    },
    {
        filed: 'area',
        label: '',
        type: 'select',
        placeholder: '告警区域',
        select: {
            options: [
                { label: '下拉选项1', value: '1' },
                { label: '下拉选项2', value: '2' }
            ]
        }
    },
    {
        filed: 'time',
        label: '',
        type: 'daterange',
        placeholder: '数据时间'
    }
]);


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