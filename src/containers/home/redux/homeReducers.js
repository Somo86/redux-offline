import initialState from '../../../reducers/state';
import {
    FETCH_POKEMON_DATA,
    FETCH_POKEMON_DATA_SUCCESS,
    FETCH_POKEMON_DATA_ROLLBACK, CHANGE_VIEW,
    FETCH_POKEMON_DETAIL_SUCCESS,
    FETCH_POKEMON_DETAIL_ROLLBACK,
} from './homeActions';
import {getFromLocalStorage} from '../../../utils/functionalUtils';
import  * as R from 'ramda';

const isNotSameResut = (resultsInState, fetchResults, limit) => {
    const comparator = (x, y) => x.name === y.name;

    return R.length(
        R.differenceWith(
            comparator,
            R.takeLast(limit, resultsInState),
            fetchResults
        )
    ) >= 1;
};

export const homeReducer = (state = initialState.app.pages.homeView.results, action) => {
    switch(action.type) {
        case FETCH_POKEMON_DATA_SUCCESS:
            return R.length(state) === 0 || isNotSameResut(state, action.payload.results, action.meta.limit)
                ? [...state, ...action.payload.results]
                : state;
        case FETCH_POKEMON_DATA_ROLLBACK:
            return state;
        default:
            return state;
    }
};

export const pokeDetailReducer = (state = initialState.app.pages.homeView.pokeDetails, action) => {
    switch(action.type) {
        case FETCH_POKEMON_DETAIL_SUCCESS:
            const response = action.payload;
            return R.has(response.name)(state)
                ? state
                : {...state, [response.name]: response};
        default:
            return state;
    }
};

export const currentDetailReducer = (state = initialState.app.pages.homeView.currentDetail, action) => {
    switch(action.type) {
        case FETCH_POKEMON_DETAIL_SUCCESS:
            return action.payload;
        case FETCH_POKEMON_DETAIL_ROLLBACK:
            const getFromStorage = getFromLocalStorage(['pages','homeView','pokeDetails', action.meta.name]);
            return !R.isNil(getFromStorage) ? getFromStorage : false;
        default:
            return state;
    }
};

export const paginateReducer = (state = initialState.app.pages.homeView.paginate, action) => {
    switch(action.type) {
        case FETCH_POKEMON_DATA_SUCCESS:
            return action.payload.results.length + state;
        default:
            return state;
    }
};

export const selectCurrentDetail = (state) => state.app.pages.homeView.currentDetail;
