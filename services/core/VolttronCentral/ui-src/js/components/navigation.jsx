'use strict';

var React = require('react');
var Router = require('react-router');

var platformManagerActionCreators = require('../action-creators/platform-manager-action-creators');
var authorizationStore = require('../stores/authorization-store');

var Navigation = React.createClass({
    getInitialState: getStateFromStores,
    componentDidMount: function () {
        authorizationStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function () {
        authorizationStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function () {
        this.setState(getStateFromStores());
    },
    _onLogOutClick: function () {
        platformManagerActionCreators.clearAuthorization();
    },
    render: function () {
        var navItems;

        if (this.state.loggedIn) {
            navItems = ['Dashboard', 'Platforms'].map(function (navItem) {
                var route = navItem.toLowerCase();

                return (
                    <Router.Link
                        key={route}
                        to={route}
                        className="navigation__item"
                        activeClassName="navigation__item--active"
                    >
                        {navItem}
                    </Router.Link>
                );
            });

            navItems.push(
                <a
                    key="logout"
                    className="navigation__item"
                    tabIndex="0"
                    onClick={this._onLogOutClick}
                >
                    Log out
                </a>
            );
        }

        return (
            <nav className="navigation">
                <h1 className="logo">
                    <span className="logo__name">VOLTTRON</span>
                    <span className="logo__tm">&trade;</span>
                    <span className="logo__beta">BETA</span>
                </h1>
                {navItems}
            </nav>
        );
    }
});

function getStateFromStores() {
    return {
        loggedIn: !!authorizationStore.getAuthorization(),
    };
}

module.exports = Navigation;
