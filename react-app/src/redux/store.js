import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import persistedReducer from './RootReducer'

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(thunk)),
)
const persistor = persistStore(store)

export { store, persistor }