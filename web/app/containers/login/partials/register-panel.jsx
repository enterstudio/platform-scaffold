import React from 'react'
import RegisterForm from './register-form'

const RegisterPanel = () => (
    <div className="t-login__register-panel">
        <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
            <p>
                {'Creating an account has many benefits: check out faster, keep more than one address, track orders, and more'}
            </p>
        </div>

        <div className="u-bg-color-neutral-10 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
            <RegisterForm />
        </div>
    </div>
)

export default RegisterPanel
