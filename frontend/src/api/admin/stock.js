export const list_stock = async (start=0, end=20) => {
    console.log('Lấy danh sách các kho hàng', start, end)
    return {
        data: [
            {
                id: 1,
                code: 'STOCK001',
                name: 'Kho hàng thứ 1',
                address: 'Hoàng mai',
                phone: '098870434',
                email: 'nguyentrancuong58@gmail.com'

            },
            {
                id: 2,
                code: 'STOCK002',
                name: 'Kho hàng thứ 2',
                address: 'Hoàng mai',
                phone: '098870434',
                email: 'nguyentrancuong58@gmail.com'
            },
            {
                id: 3,
                code: 'STOCK003',
                name: 'Kho hàng thứ 3',
                address: 'Hoàng mai',
                phone: '098870434',
                email: 'nguyentrancuong58@gmail.com'
            },
            {
                id: 4,
                code: 'STOCK004',
                name: 'Kho hàng thứ 4',
                address: 'Hoàng mai',
                phone: '098870434',
                email: 'nguyentrancuong58@gmail.com'
            },
            {
                id: 5,
                code: 'STOCK005',
                name: 'Kho hàng thứ 5',
                address: 'Hoàng mai',
                phone: '098870434',
                email: 'nguyentrancuong58@gmail.com'
            }
        ]
    }
}