import {SUGGESTION_URL} from '../constants'
import {buildQueryString} from '../../../utils/utils'

const parseSearchSuggestions = (json) => {
    if (!json.length) {
        return null
    }

    const suggestions = json.map((data) => {
        const searchTerm = data.title
        const numResults = data.num_results
        return {
            href: `${SUGGESTION_URL}${buildQueryString(searchTerm)}`,
            children: searchTerm,
            endAction: `${numResults} result${numResults > 1 ? 's' : ''}`
        }
    })

    return suggestions
}

export default parseSearchSuggestions
