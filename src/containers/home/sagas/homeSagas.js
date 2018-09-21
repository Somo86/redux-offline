import { call, takeLatest, takeEvery, put, select } from 'redux-saga/effects'
import {
    LOAD_MORE_DATA, FETCH_POKEMON_DATA, fetchListDataDispatcher, fetchPokeDetail,
    CALL_POKEMON_DETAIL
} from '../redux/homeActions';
import {selectCurrentDetail} from '../redux/homeReducers'

function* watchForDispatchers() {
    yield takeLatest(LOAD_MORE_DATA, fetchPokemonData);
    yield takeLatest(CALL_POKEMON_DETAIL, dispatchFetchPokemonDetail)
}

function* fetchPokemonData(action) {
    yield put(fetchListDataDispatcher(action.payload.paramsReq));
}

function* dispatchFetchPokemonDetail(action) {
    yield put(fetchPokeDetail(action.payload));
    const currentDetail = yield select(selectCurrentDetail);
    console.log(currentDetail);
}

export default watchForDispatchers;