import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';

const state = {
    pageData: [
        {
            id: 1,
            name: 'DText',
            propVal: '文本', // 初始化的值
            style: {
                width: 100,
                height: 30,
                left: 100, // x轴位置
                top: 100, // y轴位置
                zIndex: 1, // 层级
            },
        },
    ],
    steps: [], // 保存步骤
    active_item: null,
};

const mutations = {
    ADD_COMP: (state, comp) => {
        // 保存历史
        state.steps.push(cloneDeep(state.pageData));
        state.pageData.push(comp);
    },
    RESET: (state) => {
        state.pageData = [];
    },
    CHANGE: (state, item) => {
        // 保存历史
        state.steps.push(cloneDeep(state.pageData));
        // 保存现在
        let arr = [];
        state.pageData.map((child) => {
            if (child.id === item.id) {
                arr.push(item);
            } else {
                arr.push(child);
            }
        });
        state.pageData = arr;
    },
    REDO: (state) => {
        if (state.steps.length === 0) return;
        let obj = state.steps.pop();
        state.pageData = obj;
    },
    ACTIVE_ITEM: (state, index) => {
        state.active_item = index;
    },
};
const actions = {
    // eslint-disable-next-line no-unused-vars
    add({ commit }, component) {
        let obj = Object.assign({}, cloneDeep(component.init));
        obj.id = uniqueId('comp_');
        obj.name = component.component;
        commit('ADD_COMP', obj);
    },
    reset({ commit }) {
        commit('RESET');
    },
    change({ commit }, item) {
        commit('CHANGE', item);
    },
    redo({ commit }) {
        commit('REDO');
    },
    active_item({ commit }, index) {
        commit('ACTIVE_ITEM', index);
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
