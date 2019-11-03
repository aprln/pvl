import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store(
    {
        state: {
            /*
            deals example:
                    [
                      {
                        "id": "123",
                        "name": "Atlantis The Palm",
                        "image": "https:\\/\\/via.placeholder.com\\/250x250",
                        "discount_percentage": "25"
                      }
                    ]
             */
            deals: [],
            venueNames: [''],
            selectedVenue: '',
            selectedDiscount: 0
        },
        getters: {
            deals: (state) => {
                return state.deals
            },
            selectedVenue: (state) => {
                return state.selectedVenue
            },
            selectedDiscount: (state) => {
                return state.selectedDiscount
            },
            venueNames: (state) => {
                return state.venueNames

            }
        },
        mutations: {
            SET_DEALS: (state, data) => {
                for (let i = 0; i < data.length; i += 1) {
                    // In case the id is duplicated.
                    // This is a very simple solution due to time restriction. Need to think of a better one.
                    data[i].uniqueId = data[i].id + Math.random()
                    console.log(data[i].uniqueId)
                }
                state.deals = data
            },
            SET_SELECTED_VENUE: (state, name) => {
                state.selectedVenue = name
            },
            SET_SELECTED_DISCOUNT: (state, discount) => {
                state.selectedDiscount = discount
            },
            REFRESH_VENUE_NAMES: (state) => {
                if (state.deals.length === 0) {
                    return []
                }
                // Refresh venue names whenever no filters applied
                let names = state.deals.map(o => o['name'])
                // Get unique values
                state.venueNames = [''].concat(names.filter((x, i, a) => a.indexOf(x) === i))
            },
            SLIDE: (state, isLeft) => {

                let w = window.innerWidth
                let numToSlide = Math.floor(w / 250)

                if (state.deals.length <= numToSlide) {
                    return
                }

                if (isLeft) {
                    // Good old for loop, easy to understand :)
                    for (let i = 0; i < numToSlide; i += 1) {
                        state.deals.push(state.deals.shift())
                    }
                }
                else {
                    for (let i = 0; i < numToSlide; i += 1) {
                        state.deals.unshift(state.deals.pop())
                    }
                }
            }
        },
        actions: {
            getDeals: ({ commit }, { name, discount }) => {
                commit('SET_SELECTED_VENUE', name)
                commit('SET_SELECTED_DISCOUNT', discount)

                let api = 'deals?venue-name=' + name + '&discount-percentage=' + discount
                return Vue.axios.create({
                                            baseURL: 'http://localhost:8000/',
                                            timeout: 30000
                                        })
                          .get(api)
                          .then((response) => {
                              console.log(response.data)
                              commit('SET_DEALS', response.data)

                              // Set venue names
                              // NOTE: Could improve the way checking for empty string here
                              if (name.trim() === '' && discount === 0) {
                                  commit('REFRESH_VENUE_NAMES')

                              }
                          })
                          .catch((error) => {
                              console.log(error)
                              alert('Error. Please make sure the API server has been started at localhost:8000.')
                          })
            },
            slide: ({ commit }, isLeft) => {
                commit('SLIDE', isLeft)

            }
        },
        modules: {}
    }
)
