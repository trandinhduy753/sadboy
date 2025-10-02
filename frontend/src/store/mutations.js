export default {
    CHANGE_SHOW_COMP (state, newcomp){
        state.opt_show_comp=newcomp;
    },
    CHANGE_ISDARK ( state, newvalue){
        if(newvalue){
            state.isDark=newvalue;
        }
        else{
            state.isDark=!state.isDark;
        }
        //state.isDark=newvalue;
    }
}