import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {createGetSelector, createHasSelector} from 'reselect-immutable-helpers'
import {getUi, getProducts} from '../../store/selectors'
import * as appSelectors from '../app/selectors'

const PLACEHOLDER_BREADCRUMBS = Immutable.fromJS([
    {
        text: 'Home',
        href: '/'
    },
    {
        text: '...'
    }
])

export const getProductDetails = createSelector(getUi, ({productDetails}) => productDetails)

export const getSelectedProductDetails = createGetSelector(
    getProductDetails,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getProductDetailsContentsLoaded = createHasSelector(
    getProductDetails,
    appSelectors.getCurrentPathKey
)

export const getSelectedProduct = createGetSelector(
    getProducts,
    appSelectors.getCurrentPathKey,
    Immutable.Map()
)

export const getAddToCartInProgress = createGetSelector(getProductDetails, 'addToCartInProgress', false)
export const getAddToCartDisabled = createSelector(
    getProductDetailsContentsLoaded,
    getAddToCartInProgress,
    (contentsLoaded, addToCartInProgress) => !contentsLoaded || addToCartInProgress
)

export const getItemQuantity = createGetSelector(getSelectedProductDetails, 'itemQuantity')
export const getCTAText = createGetSelector(getSelectedProductDetails, 'ctaText', 'Add To Cart')

export const getProductDetailsBreadcrumbs = createGetSelector(
    getSelectedProductDetails,
    'breadcrumbs',
    PLACEHOLDER_BREADCRUMBS
)
export const getProductTitle = createGetSelector(getSelectedProduct, 'title')
export const getProductPrice = createGetSelector(getSelectedProduct, 'price')
export const getVariationOptions = createGetSelector(getSelectedProduct, 'variationOptions')
export const getProductVariations = createGetSelector(getSelectedProduct, 'availableVariations')
export const getProductInitialValues = createGetSelector(getSelectedProduct, 'initialValues')
export const getProductDescription = createGetSelector(getSelectedProduct, 'description')
export const getProductCarouselItems = createGetSelector(getSelectedProduct, 'carouselItems', Immutable.List())
export const getFirstProductCarouselItem = createGetSelector(
    getProductCarouselItems,
    0,
    Immutable.Map()
)
export const getFirstProductImage = createGetSelector(getFirstProductCarouselItem, 'img')

// NOTE: These get-something-ByPathKey selectors should only be used within actions/commands
// Using them within a component will break the performance optimizations selectors normally give us
export const getProductDetailsByPathKey = (pathKey) => createGetSelector(getProducts, pathKey, Immutable.Map())
export const getProductCarouselItemsByPathKey = (pathKey) => createGetSelector(getProductDetailsByPathKey(pathKey), 'carouselItems', Immutable.List())
export const getFirstProductCarouselItemByPathKey = (pathKey) => createGetSelector(getProductCarouselItemsByPathKey(pathKey), 0, Immutable.Map())
export const getFirstProductImageByPathKey = (pathKey) => createGetSelector(getFirstProductCarouselItemByPathKey(pathKey), 'img')
