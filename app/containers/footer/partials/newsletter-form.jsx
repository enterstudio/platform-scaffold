import React from 'react'
import * as ReduxForm from 'redux-form'

import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'

const NewsletterForm = (props) => {
    const {handleSubmit, submitting} = props
    return (
        <form onSubmit={handleSubmit} noValidate>
            <FieldRow>
                <ReduxForm.Field component={Field} name="email">
                    <input type="email" placeholder="Enter your email..." noValidate />
                </ReduxForm.Field>
            </FieldRow>

            <FieldRow>
                <Button type="submit"
                    className="c--secondary u-width-full u-text-uppercase"
                    disabled={submitting}>
                    Submit
                </Button>
            </FieldRow>
        </form>
    )
}

NewsletterForm.propTypes = {
    /**
     * Redux-form internal
     */
    handleSubmit: React.PropTypes.func,
    /**
     * Redux-form internal
     */
    submitting: React.PropTypes.bool
}

const validate = (values) => {
    const errors = {}
    if (values.email && !values.email.match('@')) {  // Obviously not for real
        errors.email = 'Enter a valid email address'
    }
    return errors
}

const NewsletterReduxForm = ReduxForm.reduxForm({
    form: 'newsletterForm',
    validate,
})(NewsletterForm)

export default NewsletterReduxForm