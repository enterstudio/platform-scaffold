import {getTextFrom} from '../../../utils/parser-utils'
import {urlToPathKey} from 'progressive-web-sdk/dist/utils/utils'

/* eslint-disable newline-per-chained-call */

export const parseCategoryId = ($, $html) => {
    const className = $html.find('li[class*="category"]').attr('class')
    const classMatch = /category(\d+)/.exec(className)
    return classMatch[1]
}

export const parseCategoryTitle = ($, $html) => getTextFrom($html, '.page-title')

const categoryProductsParser = ($, $html) => {
    const $numItems = $html.find('#toolbar-amount .toolbar-number').first()

    const products = $
          .makeArray($html.find('.item.product-item'))
          .map((product) => $(product).find('.product-item-link').attr('href'))
          .map(urlToPathKey)

    return {
        itemCount: $numItems.length > 0 ? parseInt($numItems.text(), 10) : 0,
        products
    }
}

export default categoryProductsParser
