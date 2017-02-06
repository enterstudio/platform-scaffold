import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {withRouter} from 'react-router'

import SignInPanel from './partials/signin-panel'
import RegisterPanel from './partials/register-panel'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'
import {Tabs, TabsPanel} from 'progressive-web-sdk/dist/components/tabs'

import * as actions from './actions'
import * as selectors from './selectors'
import {SIGN_IN_SECTION, REGISTER_SECTION, SECTION_NAMES, INDEX_FOR_SECTION, SECTION_FOR_INDEX} from './constants'

const LoginTitle = ({title}) => {
    if (title) {
        return (
            <h1 className="u-text-uppercase u-text-normal">
                {title}
            </h1>
        )
    } else {
        return (
            <div className="u-padding-md">
                <SkeletonBlock height="32px" width="50%" />
            </div>
        )
    }
}

LoginTitle.propTypes = {
    title: PropTypes.string
}

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.navigateToSection = this.navigateToSection.bind(this)
    }

    navigateToSection(index) {
        this.props.navigateToSection(
            this.props.router,
            this.props.routes,
            SECTION_FOR_INDEX[index]
        )
    }

    render() {
        const {
            title,
            signinSection,
            registerSection,
            submitSignInForm,
            submitRegisterForm,
            openInfoModal,
            closeInfoModal,
            navigateToSection,
            route: {routeName},
            router,
            routes,
            isRunningInAstro
        } = this.props

        const openSignInModal = () => openInfoModal(Login.SIGN_IN_SECTION)
        const closeSignInModal = () => closeInfoModal(Login.SIGN_IN_SECTION)

        const openRegisterModal = () => openInfoModal(Login.REGISTER_SECTION)
        const closeRegisterModal = () => closeInfoModal(Login.REGISTER_SECTION)

        if (!isRunningInAstro) {
            return (
                <div className="t-login">
                    <div className="u-bg-color-neutral-20 u-padding-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                        {title ?
                            <h1 className="u-text-uppercase u-text-normal">
                                {title}
                            </h1>
                        :
                            <div className="u-padding-md">
                                <SkeletonBlock height="32px" width="50%" />
                            </div>
                        }
                    </div>

                    <Tabs activeIndex={this.indexForSection(routeName)} className="t-login__navigation" onChange={(index) => navigateToSection(router, routes, this.sectionForIndex(index))}>
                        <TabsPanel title={Login.SECTION_NAMES[Login.SIGN_IN_SECTION]}>
                            <LoginSection signinSection={signinSection} submitSignInForm={submitSignInForm} openSignInModal={openSignInModal} closeSignInModal={closeSignInModal} />
                        </TabsPanel>

                        <TabsPanel title={Login.SECTION_NAMES[Login.REGISTER_SECTION]}>
                            <RegisterSection registerSection={registerSection} submitRegisterForm={submitRegisterForm} openRegisterModal={openRegisterModal} closeRegisterModal={closeRegisterModal} />
                        </TabsPanel>
                    </Tabs>
                </div>
            )
        } else if (routeName === Login.SIGN_IN_SECTION) {
            return (
                <div className="t-login">
                    <LoginSection signinSection={signinSection} submitSignInForm={submitSignInForm} openSignInModal={openSignInModal} closeSignInModal={closeSignInModal} />
                </div>
            )
        } else {
            return (
                <div className="t-login">
                    <RegisterSection registerSection={registerSection} submitRegisterForm={submitRegisterForm} openRegisterModal={openRegisterModal} closeRegisterModal={closeRegisterModal} />
                </div>
            )
        }
    }
}

const mapStateToProps = createStructuredSelector({
    title: selectors.getLoginTitle
})

const RegisterSection = (props) => {
    const item = (
        <div>
            <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                {props.registerSection.heading ?
                    <h3 className="u-margin-bottom u-color-brand u-text-font-family u-text-normal">
                        {props.registerSection.heading}
                    </h3>
                :
                    <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
                }

                {props.registerSection.description ?
                    <p>{props.registerSection.description}</p>
                :
                    <SkeletonText lines={3} size="14px" width="100%" />
                }

                <div className="u-margin-top">
                    {props.registerSection.requiredText ?
                        props.registerSection.requiredText
                    :
                        <SkeletonText lines={1} size="14px" width="33%" />
                    }
                </div>
            </div>

            <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                <RegisterForm {...props.registerSection.form}
                    disabled={!props.registerSection.form.href}
                    submitForm={props.submitRegisterForm}
                    openModal={props.openRegisterModal}
                    closeModal={props.closeRegisterModal}
                    modalOpen={props.registerSection.infoModalOpen}
                />
            </div>
        </div>
    )
    return item
}

const LoginSection = (props) => {
    const item = (
        <div>
            <div className="u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow">
                <div className="u-margin-bottom">
                    {props.signinSection.heading ?
                        <h2 className="u-h3 u-color-brand u-text-font-family u-text-normal">
                            {props.signinSection.heading}
                        </h2>
                    :
                        <SkeletonBlock height="24px" width="50%" className="u-margin-bottom" />
                    }
                </div>

                {props.signinSection.description ?
                    <p>{props.signinSection.description}</p>
                :
                    <SkeletonText lines={2} size="14px" width="100%" />
                }

                <div className="u-margin-top">
                    {props.signinSection.requiredText ?
                        props.signinSection.requiredText
                    :
                        <SkeletonText lines={1} size="14px" width="33%" />
                    }
                </div>
            </div>

            <div className="u-bg-color-neutral-20 u-padding-start-md u-padding-end-md u-padding-top-lg u-padding-bottom-lg u-box-shadow-inset">
                <SignInForm {...props.signinSection.form}
                    disabled={!props.signinSection.form.href}
                    submitForm={props.submitSignInForm}
                    openModal={props.openSignInModal}
                    closeModal={props.closeSignInModal}
                    modalOpen={props.signinSection.infoModalOpen}
                />
            </div>
        </div>
    )
    return item
}

const mapDispatchToProps = {
    navigateToSection: actions.navigateToSection
}

Login.propTypes = {
    closeInfoModal: PropTypes.func,
    isRunningInAstro: PropTypes.bool,
    navigateToSection: PropTypes.func,
    route: PropTypes.object,
    router: PropTypes.object,
    routes: PropTypes.array,
    title: PropTypes.string
}

export {Login as RawLogin}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Login))
