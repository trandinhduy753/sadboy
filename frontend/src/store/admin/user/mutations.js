export default {
    CHANGE_LIST_USER(state, list_user) {
        var data=[];
        list_user.forEach(user => {
            var exp =  {
                id: user.id, 
                code: user.code,
                item1: user.name,
                item2: user.img,
                item3: user.email,
                item4: user.type,
                type: 'user'
            }
            data.push(exp)
        });
        state.users=list_user;
        state.results=data;
    },
    CHANGE_DETAIL_USER(state, detail_user){
        state.detail_user=detail_user;
    },
    CHANGE_LIST_DETAIL_USER (state, {id, data}){
        state.list_detail_user[id]=data;
    },
    CHANGE_SORT_BY (state, sortby) {
        state.sortby=sortby;
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },
    ADD_USER_TO_LIST (state, users){
        if(users.length === 1) {
            const data =  {
                id: users[0].id, 
                code: users[0].code,
                item1: users[0].name,
                item2: users[0].img,
                item3: users[0].email,
                item4: users[0].type,
                type: 'user'
            }
            state.results.unshift(data)
        }
        else {
            var data=[];
            users.forEach(user => {
                var exp =  {
                    id: user.id, 
                    code: user.code,
                    item1: user.name,
                    item2: user.img,
                    item3: user.email,
                    item4: user.type,
                    type: 'user'
                }
                data.push(exp)
            })
            state.results= [...state.results, ...data];
        }
        
    },
    CHANGE_CHECKED_USER(state){
        state.checked = !state.checked
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_user_ids.includes(ids)) {
                state.selected_user_ids = state.selected_user_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_user_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_user_ids=[];
            }
            else if (ids.length>0){
                state.selected_user_ids=[...new Set([...state.selected_user_ids, ...ids])];
            }
        }
    },
    DELETE_USER (state, ids){
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
            state.selected_user_ids=[];
            state.checked=false
           
        }
        
    },
    CHANGE_LIST_USER_DELETE(state, data) {
        state.users_delete = data
    },
    ADD_USER_DELETE_TO_LIST(state, users) {
        if(users.length == 1){
            state.users_delete.unshift(users)
        }
        else {
            state.users_delete= [...state.users_delete, ...users];
        }
    },
    SHOW_LIST_USER_DELETE(state, data) {
        state.show_list_user_delete = data
    },
    DELETE_USER_DELETE_AT(state, id) {
        const index = state.users_delete.findIndex(emp => emp.id === id);
        if (index !== -1) {
            state.users_delete.splice(index, 1);
        }
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    }
}