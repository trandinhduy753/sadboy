export default {
    DELETE_EMPLOYEE (state, ids){
        if((typeof ids) == 'number') {
            const index = state.employees.findIndex(emp => emp.id === ids);
            if (index !== -1) {
                state.employees.splice(index, 1);
            }
        }
        else {
            state.employees = state.employees.filter((emp, index) => {
                return !(ids.find(id => id == emp.id))
            });
            state.selected_employee_ids=[];
            state.checked=false
        }
        
    },
    CHANGE_LIST_EMPLOYEE (state, list_employee) {
        var data=[];
        list_employee.forEach(employee => {
            var emp =  {
                id: employee.id, 
                code: employee.code,
                item1: employee.name,
                item2: employee.img,
                item3: employee.phone,
                item4: employee.position,
                type: 'employee'
            }
            data.push(emp)
        });
        state.employees = data;
    },
    ADD_EMPLOYEE_TO_LIST (state, employees){
        if(employees.length == 1){
            const data =  {
                id: employees[0].id, 
                code: employees[0].code,
                item1: employees[0].name,
                item2: employees[0].img,
                item3: employees[0].phone,
                item4: employees[0].position,
                type: 'employee'
            }
            state.employees.unshift(data)
        }
        else {
            var data=[];
            employees.forEach(employee => {
                var emp =  {
                    id: employee.id, 
                    code: employee.code,
                    item1: employee.name,
                    item2: employee.img,
                    item3: employee.phone,
                    item4: employee.position,
                    type: 'employee'
                }
                data.push(emp)
            });
        
            state.employees= [...state.employees, ...data];
        }
    },
    CHANGE_CHECKED_EMPLOYEE(state){
        state.checked = !state.checked
    },
    TOGGLE_SELECTED(state, ids) {
        if((typeof ids)=='number'){
            if (state.selected_employee_ids.includes(ids)) {
                state.selected_employee_ids = state.selected_employee_ids.filter(empId => empId !== ids);
            } 
            else {
                state.selected_employee_ids.push(ids);
            }
        }
        else {
            if(ids.length==0){
                state.selected_employee_ids=[];
            }
            else if (ids.length>0){
                state.selected_employee_ids=[...new Set([...state.selected_employee_ids, ...ids])];
            }
        }
    },
    CHANGE_LIST_DETAIL_EMPLOYEE (state, {id, data}){
        state.list_detail_employee[id]=data;
    },
    CHANGE_POSITIONS (state, positions) {
        state.positions = positions;
    },
    CHANGE_CONTRASTS (state, contrasts) {
        state.contrasts=contrasts;
    },
    CHANGE_GRANTS (state, grants){
        state.grants=grants;
    },
    CHANGE_DEPARTMENTS (state, departments) {
        state.departments=departments
    },
    CHANGE_WORK_SHIFTS (state, work_shifts) {
        state.work_shifts=work_shifts
    },
    CHANGE_SORT_BY (state, sortby) {
        state.sortby=sortby;
        state.sort_opt= state.sort_opt == "ASC" ? "DESC" : "ASC"; 
    },

    
    DELETE_EMPLOYEE_DELETE_AT(state, id) {
        const index = state.employees_delete.findIndex(emp => emp.id === id);
        if (index !== -1) {
            state.employees_delete.splice(index, 1);
        }
    },
    SHOW_LIST_EMPLOYEE_DELETE(state, data) {
        state.show_list_employee_delete = data
    },
    ADD_EMPLOYEE_DELETE_TO_LIST(state, employees) {
        if(employees.length == 1){
            state.employees_delete.unshift(employees)
        }
        else {
            state.employees_delete= [...state.employees_delete, ...employees];
        }
    },
    CHANGE_LIST_EMPLOYEE_DELETE(state, list_employee) {
        state.employees_delete = list_employee;
    },
    CHANGE_POSITION_FIND(state, {start, end}){
        state.start_find = start
        state.end_find = end;
    }
}