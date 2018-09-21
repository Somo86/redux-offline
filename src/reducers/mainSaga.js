import {all, fork} from 'redux-saga/effects';
import homeSaga from '../containers/home/sagas/homeSagas'

export default function* mainSaga() {
    yield all([
        fork(homeSaga),
    ]);
}