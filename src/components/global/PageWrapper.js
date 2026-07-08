import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const PageWrapper = ({ title , description , keywords , children }) => {
    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description || ''} />
                <meta name="keywords" content={keywords || ''}></meta>
            </Helmet>
            {children}
        </div>
    )
}

PageWrapper.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords : PropTypes.string ,
    children: PropTypes.node,
};

export default PageWrapper;
