import * as R from 'ramda';

export const isBottom = (container) => {
    const wrappedElement = document.getElementById(container);
    return wrappedElement.getBoundingClientRect().bottom <= window.innerHeight;
};

const buildUrlParams = (url, params) => {
    const addParam = (acc, current) => acc.replace(`{${current[0]}}`, current[1]);
    return R.reduce(addParam, url, R.toPairs(params));
};

const buildUrlIncludes = (url, includes) => {
    const addInclude = (acc, current, i, fullEl) => {
        const addSymbol = fullEl.length > i + 1 ? '&' : '';
        return `${acc}${i === 0 ? '?' : ''}${current[0]}=${current[1]}${addSymbol}`;
    };
    return R.toPairs(includes).reduce(addInclude, url);
};

export const buildURL = ({baseUrl, params, includes}) => {
    const urlWithParams = params ? buildUrlParams(baseUrl, params) : baseUrl;
    return includes ? buildUrlIncludes(urlWithParams, includes) : urlWithParams;
};

export const getFromLocalStorage = (path) => {
    const reduxPersistData = JSON.parse(localStorage.getItem('reduxPersist:app'));
    return R.path(path, reduxPersistData);
};
