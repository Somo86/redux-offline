import urlsConfig, {BASE_API_URL} from '../../../config/config_api_url';
import {buildURL} from '../../../utils/functionalUtils';

export const FETCH_POKEMON_DATA = 'FETCH_POKEMON_DATA';
export const FETCH_POKEMON_DATA_SUCCESS = 'FETCH_POKEMON_DATA_SUCCESS';
export const FETCH_POKEMON_DATA_ROLLBACK = 'FETCH_POKEMON_DATA_ROLLBACK';
export const CALL_POKEMON_DETAIL = 'CALL_POKEMON_DETAIL';
export const FETCH_POKEMON_DETAIL = 'FETCH_POKEMON_DETAIL';
export const FETCH_POKEMON_DETAIL_SUCCESS = 'FETCH_POKEMON_DETAIL_SUCCESS';
export const FETCH_POKEMON_DETAIL_ROLLBACK = 'FETCH_POKEMON_DETAIL_ROLLBACK';
export const CHANGE_VIEW = 'CHANGE_VIEW';
export const LOAD_MORE_DATA = 'LOAD_MORE_DATA';

const baseUrl = BASE_API_URL + urlsConfig.POKEMON_LIST;

export const fetchListDataDispatcher = (requestData) => {
    return {
        type: FETCH_POKEMON_DATA,
        meta: {
            offline: {
                // the network action to execute:
                effect: {
                    url: buildURL({baseUrl, ...requestData}),
                    method: 'GET'
                },
                // action to dispatch when effect succeeds:
                commit: { type: FETCH_POKEMON_DATA_SUCCESS, meta: {limit: requestData.includes.limit} },
                // action to dispatch if network action fails permanently:
                rollback: { type: FETCH_POKEMON_DATA_ROLLBACK }
            }
        }
    };
};

export const fetchPokeDetail = (pokemon) => {
    return {
        type: FETCH_POKEMON_DETAIL,
        meta: {
            offline: {
                // the network action to execute:
                effect: {
                    url: pokemon.url,
                    method: 'GET'
                },
                // action to dispatch when effect succeeds:
                commit: { type: FETCH_POKEMON_DETAIL_SUCCESS },
                // action to dispatch if network action fails permanently:
                rollback: { type: FETCH_POKEMON_DETAIL_ROLLBACK, meta: pokemon }
            }
        }
    };
};

export const getPokemonDetail = (pokemon) => ({
    type: CALL_POKEMON_DETAIL,
    payload: pokemon,
});
