import React from 'react';
import Loader from 'react-loader-spinner';
require('./PageLoader.css')

export default function PageLoader() {
    return (<Loader
        type="Watch"
        height={100}
        width={100}
        className="pageLoader-main"
    />)
}

