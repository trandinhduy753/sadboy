export default {
    add_opt: {
        title: "",
        description: "Danh sách bình luận",
        router: '',
        type: 'comment',
        delete_sort: 'Danh sách bình luận đã xoá'
    }, 
    title_manages: [
        {
            title: "",
            col: "",
            sort: ""
        },
        {
            title: "ID comment",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Ngày tạo",
            col: "col-span-3",
            sort: ""
        },
        {
            title:"Số like",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Số sao",
            col: "col-span-2",
            sort: ""
        },
        {
            title: "Nội dung",
            col: "col-span-5",
            sort: ""
        },
        {
            title: "Chức năng",
            col: "col-span-3",
    
        }
    ],
    detail_comment: {

    },
    checked: false,
    selected_comment_ids: [],
    sortby: '',
    sort_opt: '', 
    list_detail_comment: {

    },
    results: [
        
    ],
    show_list_comment_delete: false,
    comments_delete: [],
    start_find: 0,
    end_find: 0,
}