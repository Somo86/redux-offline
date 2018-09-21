import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { offline } from '@redux-offline/redux-offline';
import { createOfflineMiddleware } from '@redux-offline/redux-offline/lib/middleware';
import offlineActionTracker from "@redux-offline/redux-offline/lib/offlineActionTracker";
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from './reducers/mainReducer';
import mainSaga from './reducers/mainSaga';
import initialState from './reducers/state';
import createSagaMiddleware from 'redux-saga';

const offlineConfig = {
    ...defaultConfig,
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    thunk,
    sagaMiddleware,
    createOfflineMiddleware({
        ...offlineConfig,
        offlineActionTracker: offlineActionTracker.withoutPromises
    }),
];

const createOfflineStore = offline(offlineConfig)(createStore);

const store = createOfflineStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
);

sagaMiddleware.run(mainSaga);

export default store;
