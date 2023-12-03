const
initialState = {
  status : {} ,
  post   : {
    speed   :  60,
    hp      : 500,
    attack  : 500,
    defense : 500,
    height  : 500,
    weight  : 500,
    name    :  '',
    sprite  :  '',
    types   : [{name: 'normal'}]
  } ,
  data   : [] ,
  type   : [] ,
  filter : [] ,
  order  : [] ,
  search : [] ,
  byId   : '',
  byName : '' ,
  create : []
}

import reducer from '%reducers%'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
export default configureStore (
  {
    reducer: reducer, 
    middleware: [thunk],
    preloadedState: initialState
  }
)
