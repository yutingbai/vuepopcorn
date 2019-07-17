const state = {
    name : window.localStorage.getItem('name') || 'null',
    userHead : ''
};

const actions = {

};

const mutations = {
    USER_NAME(state , payload){
        state.name = payload.name;
        state.userHead = payload.userHead;
    }
};

export default {
    namespaced : true,
    state,
    actions,
    mutations
}