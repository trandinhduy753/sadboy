export default {
    change_show_comp ({commit}, newcomp)
    {
        console.log(newcomp)
        commit('CHANGE_SHOW_COMP', newcomp)
    },
    change_isDark ( {commit}, newValue)
    {
        commit('CHANGE_ISDARK', newValue)
    }
}