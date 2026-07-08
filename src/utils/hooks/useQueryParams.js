import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useQueryParams = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const setQueryParams = (params) => {
        const currentParams = queryString.parse(location.search);
        const updatedParams = { ...currentParams, ...params };

        // Remove undefined or empty params
        const cleanedParams = Object.keys(updatedParams).reduce((acc, key) => {
            if (updatedParams[key] !== undefined && updatedParams[key] !== '') {
                acc[key] = updatedParams[key];
            }
            return acc;
        }, {});

        navigate({ search: queryString.stringify(cleanedParams) }, { replace: true });
    };

    const getQueryParams = () => queryString.parse(location.search);

    return { setQueryParams, getQueryParams };
};

export default useQueryParams;
