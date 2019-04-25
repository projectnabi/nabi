import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import logger from 'redux-logger'
 
import baseReducer from './reducers'
 
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
 
const persistedReducer = persistReducer(persistConfig, baseReducer)
 
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(logger))
  let persistor = persistStore(store)
  //persistor.purge()
  return { store, persistor }
}