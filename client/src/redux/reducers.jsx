const
    reducer = (state, action) => {

        if ( action.type.charCodeAt(0) > 64 
         &&  action.type.charCodeAt(0) < 91 ) {
              state.status.stage = action.type
              state.status[action.type] = true
        }

        let
            parameter, output

        switch (action.type) {

            case 'CLEAN':
                state.status.GET_ALL = false
                return {
                    ...state
                }

            case 'GET_ALL':
                state.filter = action.payload
                return {
                    ...state,
                    data: action.payload,
                }

            case 'GET_TYPE':
                return {
                    ...state,
                    type: action.payload
                }

            case 'BY_NAME':
                return {
                    ...state,
                    byName: action.payload
                }

            case 'RESET_DETAILS':
                return {
                    ...state,
                    byName: ''
                }

            case 'CREATE':
                return {
                    ...state,
                    create: action.payload,
                    data: [],
                }

            case 'POST_EDIT':
                parameter = Object.keys(action.payload)
                output = state.post
                for (let key of parameter) {
                    output[key] = action.payload[key]
                }
                return {
                    ...state,
                    post: output
                }

            case 'FILTER_TYPE':
                if (
                    state.status['GET_ALL'] 
                 && state.status['GET_TYPE']
                ) {
                    parameter = action.payload
                    if (parameter === 'all') return {
                        ...state, filter: state.data
                    }
                    output = []
                    for (let pokemon of state.data) {
                        for (let type of pokemon.Types) {
                            if (type.name === parameter) {
                                output.push(pokemon)
                            }
                        }
                    }
                    return {
                        ...state,
                        filter: output,
                    }
                }
                break; // without break it will order the output directly

            case 'ORDER':
                output = state.filter  // output = (state.filter.length === 0) ? state.data : state.filter
                
                switch (action.payload) {
                
                    case 'nameAsc':
                        output = output.sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
                        break
                
                    case 'nameDesc':
                        output = output.sort((a, b) => { if (a.name > b.name) { return -1 } return 1 })
                        break
                
                    case 'attackAsc':
                        output = output.sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
                        output = output.sort((a, b) => { if (a.attack < b.attack) { return -1 } return 1 })
                        break
                    
                    case 'attackDesc':
                        output = output.sort((a, b) => { if (a.name < b.name) { return -1 } return 1 })
                        output = output.sort((a, b) => { if (a.attack > b.attack) { return -1 } return 1 })
                        break
                    
                    case 'none':
                    default:
                        output = output.sort((a, b) => { if (a.id < b.id) { return -1 } return 1 })
                        break
                }
                return {
                    ...state,
                    order: output
                }

                case 'FIND':
                    output = state.filter
                    parameter = output.filter(item => item.name.indexOf(action.payload) !== -1)
                    output = ( parameter.length > 0 ) ? parameter : output

                    return {
                     ...state,
                     filter: output
                    }     

            case 'BY_ID':
                output = (action.payload.length < 1) ? state.data : action.payload
                return {
                    ...state,
                    byId: output
                }

                case 'GET_NAME':
                return {
                    ...state,
                    pokeName: action.payload
                }

            default: return state
        }
    }

    export default reducer
    