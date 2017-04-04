/* eslint-disable newline-per-chained-call */
import {getTextFrom} from '../../../../utils/parser-utils'
import {parseFields} from './common'

const parseForm = ($, $form) => {
    return {
        href: $form.attr('action'),
        forgotPassword: {
            href: $form.find('.action.remind').attr('href'),
            title: getTextFrom($form, '.action.remind')
        },
        fields: $.makeArray(parseFields($, $form.find('.field:not(.note)'))),
        submitText: getTextFrom($form, 'button[type="submit"]')
    }
}

const signinParser = ($, $html) => {
    return {
        form: parseForm($, $html.find('form.form-login'))
    }
}

export default signinParser
