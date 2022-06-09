import Auth from './Auth/reducer'
import Event from './Event/reducer'
import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.

const config = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1,
  whitelist: [],
}

const rootReducer = persistCombineReducers(config, {
  AuthReducer: Auth,
  EventReducer: Event,
})

export default rootReducer;