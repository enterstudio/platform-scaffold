const selectors = {
    wrapper: '.t-home__container',
    skipLinks: '.pw-skip-links',
    skipToMain: '.pw-skip-links__anchor:first-of-type',
    skipToNav: '.pw-skip-links__anchor:nth-child(2n)',
    skipToFooter: '.pw-skip-links__anchor:last-of-type',
    plpItem(index) {
        return `.t-home__category .t-home__category-section:nth-child(${index}) .pw--is-loaded`
    }
}

const Home = function(browser) {
    this.browser = browser
    this.selectors = selectors
}

Home.prototype.navigateToPLP = function(PLP_INDEX) {
    // Navigate from Home to PLP
    this.browser
        .log('Navigating to PLP')
        .waitForAjaxCompleted()
        .waitForElementVisible(selectors.plpItem(PLP_INDEX))
        .click(selectors.plpItem(PLP_INDEX))
        .waitUntilMobified()
    return this
}

export default Home
