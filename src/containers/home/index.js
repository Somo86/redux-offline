import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as R from 'ramda';
import {fetchListDataDispatcher, getPokemonDetail} from './redux/homeActions';
import {isBottom} from '../../utils/functionalUtils';
import DetailView from '../detail/index';
import chroma from 'chroma-js';

const limitPokemonList = 20;

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    getParams() {
       return {
           includes: {
               limit: limitPokemonList,
               offset: R.pathOr(0, ['length'], this.props.pokemonList),
           }
       };
    }

    onScroll(ev) {
        isBottom('wrapper') ? this.loadItems(ev) : null;
    }

    componentDidMount() {
        !this.props.pokemonList.length ? this.props.getAppData(this.getParams()) : null;
        window.addEventListener('scroll', this.onScroll.bind(this), false);
    }

    loadItems() {
        this.props.getAppData(this.getParams());
    }

    getBackgroundColor (index, totalList){
        const scale = chroma.scale('Spectral');
        return scale((index + 1) / totalList);
    }

    render() {
        return (
            <div>
                <div className="box_wrapper">
                    {
                        this.props.pokemonList.map((pokemon, i) =>
                            <div key={`box_${i}`}
                                 className="item animated fadeInUp"
                                 onClick={() => this.props.getDetail(pokemon)}
                                 style={{backgroundColor: this.getBackgroundColor(i, this.props.pokemonList.length)}}
                            >
                                { pokemon.name }
                            </div>
                        )
                    }
                </div>
                <DetailView data={this.props.currentDetail} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        pokemonList: state.app.pages.homeView.results,
        currentDetail: state.app.pages.homeView.currentDetail,
        // paginate: state.app.pages.homeView.paginate,
        //currentPage: state.app.pages.homeView.currentPage,
    };
};

const mapDispatchToProps = dispatch => ({
    getAppData: (paramsReq) => dispatch(fetchListDataDispatcher(paramsReq)),
    getDetail: (pokemon) => dispatch(getPokemonDetail(pokemon)),
    // loadMoreData: (paramsReq) => dispatch(loadMoreDataDispatcher(paramsReq)),
    //changePageDispatcher: (page) => dispatch(currentViewSectionAction(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent)
