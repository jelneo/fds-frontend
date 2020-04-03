function getEventName(start, end) {
    let temp1 = start.split(" ")[1]
    let temp2 = end.split(" ")[1]
    return temp1 + " - " + temp2;
}
const axios = require('axios')

const getDefaultState = () => {
    return {
        timeSlots: [],
        riderType: null
    }
}

export default {
    namespaced: true,
    state: getDefaultState(),
    getters: {
        timeSlots(state) {
            return state.timeSlots
        },
        riderType(state) {
            return state.riderType
        }
    },
    mutations: {
        setTimeSlots(state, timeSlots) {
            state.timeSlots = timeSlots
        },
        setRiderType(state, riderType) {
            state.riderType = riderType
        },
        resetState(state) {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        async fetchTimeSlots({ commit }, { year, month }) {
            let timeSlots = (await axios.get(`rider/schedule/${year}/${month}`)).data
            timeSlots = timeSlots.map(x => ({ ...x, name: getEventName(x.start, x.end), color: "orange" }))
            commit('setTimeSlots', timeSlots)
        },
        async fetchRiderType({ commit }) {
            let riderType = (await axios.get(`rider/rider-type`)).data
            commit('setRiderType', riderType)
        }
    }
}