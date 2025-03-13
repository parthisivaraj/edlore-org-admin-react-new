import { createStore, applyMiddleware, compose } from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga/index';

const sagaMiddleware = createSagaMiddleware();
const store = compose(
    applyMiddleware(sagaMiddleware, logger),
    // window.devToolsExtension && window.devToolsExtension(),
)(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store)

export { store, persistor };