//import { firebase } from '@/fire'
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
        console.log(state.pending)
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
                image: {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    path: path,
                },
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