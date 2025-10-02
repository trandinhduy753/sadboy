export default {
    get_list_employee(state) {
        return state.employees
    },
    get_list_employee_by_sort(state) {
        const list_employee = [...state.employees];
        const sortDirection = state.sort_opt === "ASC" ? 1 : -1;
        const sortFunctions = {
            'code': (a, b) => a.code.localeCompare(b.code) * sortDirection,
            'name': (a, b) => a.item1.localeCompare(b.item1) * sortDirection,
            'position': (a, b) => a.item4.localeCompare(b.item4) * sortDirection,
        };
        return list_employee.sort(sortFunctions[state.sortby]);
    },
    get_title_list_employee(state) {
        return state.title_table_employee
    },
    get_diplomas(state) {
        return state.diplomas;
    },
    get_status (state) {
        return state.status
    },
    get_positions (state) {
        return state.positions
    },
    get_departments (state) {
        return state.departments
    },
    get_contrasts (state) {
        return state.contrasts
    },
    get_work_shifts (state) {
        return state.work_shifts;
    },
    get_grants (state) {
        return state.grants;
    },
    get_list_detail_employee(state) {
        return state.list_detail_employee;
    }
}