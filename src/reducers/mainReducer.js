import {combineReducers} from 'redux';
import {
    homeReducer as results,
    paginateReducer as paginate,
    pokeDetailReducer as pokeDetails,
    currentDetailReducer as currentDetail
} from '../containers/home/redux/homeReducers';

export default combineReducers({
    app: combineReducers({
        pages: combineReducers({
            homeView: combineReducers({
                results,
                paginate,
                pokeDetails,
                currentDetail,
            }),
        })
    })
});
