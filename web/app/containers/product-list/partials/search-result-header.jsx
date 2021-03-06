import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as selectors from '../selectors'

import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs'
import SkeletonText from 'progressive-web-sdk/dist/components/skeleton-text'

const items = [
    {
        text: 'Home',
        href: '/'
    }
]

const SearchResultHeader = ({searchTerm}) => (
    <div className="u-flexbox u-align-bottom">
        <div className="u-flex u-padding-top-lg u-padding-bottom-lg u-padding-start-md">
            <Breadcrumbs items={items} />
            <div className="u-margin-top-md">
                {searchTerm ?
                    <h1 className="u-text-uppercase">
                        <span>Results For </span>
                        <span className="u-text-lighter">'{searchTerm}'</span>
                    </h1>
                :
                    <SkeletonText lines={1} type="h1" width="100px" />
                }
            </div>
        </div>
    </div>
)

SearchResultHeader.propTypes = {
    searchTerm: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    searchTerm: selectors.getSearchResultTerm
})

export default connect(mapStateToProps)(SearchResultHeader)
