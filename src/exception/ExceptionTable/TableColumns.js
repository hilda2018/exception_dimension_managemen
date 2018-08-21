
export const getTableData = () => {
    const data = [];
    const dataIndex = ['orign','product','time'];
    const name = ['产地','商品','时间'];
    for (let i = 0; i < 6; i++) {
        data.push({
            rowid: 'row' + i,
            rowKey: i,
            origin: '全部',
            originOperator: '等于',
            product: '全部',
            productOperator: '等于',
            time: '预计发货时间',
            timeOperator: '等于',
            rowStatus: '-1',//-1 normal ,0 新增 1，编辑 2，删除
            name: name[i % 3],
            dataIndex: dataIndex[i % 3]
        });
    }

    return data;
};
