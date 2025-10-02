export default {
    CHANGE_LIST_COMMENT(state, list_comment){
        var data=[];
        list_comment.forEach(comment => {
            var emp =  {
                id: comment.id, 
                code: comment.code,
                item1: comment.created_at,
                item2: comment.like,
                item3: comment.star,
                item4: comment.content,
                type: 'comment'
            }
            data.push(emp)
        });
        state.results = data;
    },
    ADD_COMMENT_TO_LIST (state, comments){
        if(comments.length == 1) {
            const data =  {
                id: comments[0].id, 
                code: comments[0].code,
                item1: comments[0].created_at,
                item2: comments[0].like,
                item3: comments[0].star,
                item4: comments[0].content,
                type: 'comment'
            }
            state.results.unshift(data)
        }
        else {
            var data=[];
            comments.forEach(comment => {
                var emp =  {
                    id: comment.id, 
                    code: comment.code,
                    item1: comment.created_at,
                    item2: comment.like,
                    item3: comment.star,
                    item4: comment.content,
                    type: 'comment'
                }
                data.push(emp)
            });
            state.results= [...state.results, ...data];
        }
        
    },
    CHANGE_SORT_BY (state, sortby) {
        state.sortby=sortby;
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    DELETE_COMMENT (state, ids){
        if((typeof ids) == 'number') {
            const index = state.results.findIndex(emp => emp.id === ids);
            if (index !== -1) {
                state.results.splice(index, 1);
            }
        }
        else {
            state.results = state.results.filter((emp, index) => {
                return !(ids.find(id => id == emp.id))
            });
            state.selected_comment_ids=[];
            state.checked=false
            
            
           
        }
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_comment_ids.includes(ids)) {
                state.selected_comment_ids = state.selected_comment_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_comment_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_comment_ids=[];
            }
            else if (ids.length>0){
                state.selected_comment_ids=[...new Set([...state.selected_comment_ids, ...ids])];
            }
        }
    },
    CHANGE_CHECKED_COMMENT(state){
        state.checked = !state.checked
    },
    CHANGE_LIST_DETAIL_COMMENT (state, {id, data}){
        state.list_detail_comment[id]=data;
    },
    ADD_COMMENT_TO_DETAIL (state, {id, data}) {
        state.list_detail_comment[id].feedbacks=[...state.list_detail_comment[id].feedbacks, ...data];
    },

    CHANGE_LIST_COMMENT_DELETE(state, data) {
        state.comments_delete = data
    },
    ADD_COMMENT_DELETE_TO_LIST(state, comments) {
        state.comments_delete= [...state.comments_delete, ...comments];
    },
    SHOW_LIST_COMMENT_DELETE(state, data) {
        state.show_list_comment_delete = data
    },
    DELETE_COMMENT_DELETE_AT(state, id) {
        const index = state.comments_delete.findIndex(pro => pro.id === id);
        if (index !== -1) {
            state.comments_delete.splice(index, 1);
        }
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    }
}