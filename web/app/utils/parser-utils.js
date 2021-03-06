import Immutable from 'immutable'

export const getTextFrom = ($element, selector) => (
    $element
        .find(selector)
        .text()
        .trim()
)

export const TextLink = Immutable.Record({
    href: '',
    text: '',
    title: ''
})

export const parseTextLink = ($link) => {
    return TextLink({
        href: $link.attr('href'),
        text: $link.text().trim(),
        title: $link.attr('title')
    })
}

export const parseButton = ($button) => {
    return {
        // An interim solution since I don't know what we'll need from here a priori
        children: $button.html(),
        type: $button.attr('type'),
        name: $button.attr('name'),
        value: $button.attr('value'),
        disabled: !!$button.attr('disabled')
    }
}

export const parseImage = ($img) => {
    return {
        title: $img.attr('title'),
        alt: $img.attr('alt'),
        src: $img.attr('x-src') ? $img.attr('x-src') : $img.attr('src')
    }
}

export const parseOption = ($option) => {
    const value = $option.attr('value')
    return {
        key: value,
        value,
        selected: !!$option.attr('selected'),
        text: $option.text().trim()
    }
}

export const parseSelect = ($, $select) => {
    return {
        name: $select.attr('name'),
        options: $.makeArray($select.children()).map((item) => parseOption($(item)))
    }
}
