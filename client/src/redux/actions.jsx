import
axios from 'axios'
axios.defaults.baseURL =  import.meta.env['REACT_APP_API'] 
                      || 'http://127.0.0.1:3001'

export const 

getAll = () => async (dispatch) => {
    axios.get('/pokemons')
    .then( response => {
        dispatch (
            { type: 'GET_ALL', 
              payload: response.data
            }
        )
    }).catch((error)=> {        
        let 
        message =  (error.response) 
                 ?  error.response 
                 : (error.request) 
                 ?  error.request 
                 : 'Error '+ error.message
        console.log(message)
    })
},

getType = () => async (dispatch) => {
    axios.get('/types')
    .then( (response) => {
            dispatch(
                { type: 'GET_TYPE', 
                  payload: response.data
                }
            )
    }).catch((error)=> {        
        let 
        message =  (error.response) 
                 ?  error.response 
                 : (error.request) 
                 ?  error.request 
                 : 'Error '+ error.message
        console.log(message)
    })
},

getByName = (str) => async (dispatch) => {
    axios.get(`/pokemons?name=${str}`)
    .then( (response) => {
        let data
            data = (response.status===200) ? response.data : []
            return dispatch(
                { type: 'BY_NAME', 
                  payload: data, 
                  requested: str
                }
            )
    }).catch((error)=>{
        let 
        message =  (error.response) 
                 ?  error.response 
                 : (error.request) 
                 ?  error.request 
                 : 'Error '+ error.message
        console.log(message)
    })
},

getName = (name) => async (dispatch) => {
    axios.get('/pokemons')
    .then( (response) => {
        dispatch(
            { type: 'GET_NAME', 
              payload: response.data
            }
        )
    }).catch((error)=>{
        let 
        message =  (error.response) 
                 ?  error.response 
                 : (error.request) 
                 ?  error.request 
                 : 'Error '+ error.message
        console.log(message)
    })
},

getById = (id) => async (dispatch) => {
    axios.get(`/pokemons/${id}`)
    .then( (response) => {
        dispatch(
            { type: 'BY_ID', 
              payload: response.data[0]
            }
        )
    }).catch((error)=>{
        let 
        message =  (error.response) 
                 ?  error.response 
                 : (error.request) 
                 ?  error.request 
                 : 'Error '+ error.message
        console.log(message)
    })
},

create = (e) => async (dispatch) => {
    let
    post  = e
    post.name = post.name.toLowerCase()
    post.createdInDb = true
    await axios.post('/pokemons', post)
    .then((response) => {
        const
        {data,status} = response
          if (status === 200) {
            dispatch({ type: 'CREATE', payload: {data: data , name: post.name } })
        } else {
            dispatch({ type: 'CREATE', payload: {data: data , error: status } })
        }
    }).catch((error)=>{
        let 
        message =  (error.response) 
                 ?  error.response 
                 : (error.request) 
                 ?  error.request 
                 : 'Error '+ error.message
        console.log(message)
    })
},

clean = () => (
    { type: 'CLEAN'
    }
),

find = (str) => (
    {    type: 'FIND', 
      payload: str
    }
),

resetDetails = () => (
    { type: 'RESET_DETAILS'
    }
),

filterType = (payload='all') => (
    {   type: 'FILTER_TYPE',
     payload: payload.toLowerCase()
    }
),

setOrder = (payload='none') => ( 
    { type : 'ORDER', 
      payload
    }
),

postEdit = (payload='') => (
    { type: 'POST_EDIT', 
      payload: payload
    }
)
