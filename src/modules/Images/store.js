//import { firebase, auth } from '@/fire'
//import { get, pick } from 'lodash'

const state = {
    pending: {
        images: [],
    }
}

const getters = {}

const mutations = {
    ADD_PENDING_IMAGE(state, { image }) {
        state.pending.images = [...state.pending.images, image];
    },
    REMOVE_PENDING_IMAGE(state, { index }) {
        state.pending.images.splice(index, 1);
    },
}

const actions = {
    readImages({ commit, dispatch }, files) {
        files.forEach(async file => {
            const path = await dispatch('readFile', file);
            commit({
                type: 'ADD_PENDING_IMAGE',
                image: path,
            })
        })
    },
    readFile(context, file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject(new Error('Unable to read..'));
            reader.readAsDataURL(file);
        });
    },
    removeImage({ commit }, index) {
        commit({
            type: 'REMOVE_PENDING_IMAGE',
            index: index,
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}