var React = require('react');
var types = React.PropTypes;
var BsAlert = require('react-bootstrap/lib/Alert');
var {Media} = require('pui-react-media');

var Alert = React.createClass({
  propTypes: {
    bsStyle: types.string,
    dismissable: types.oneOfType([types.bool, types.func]),
    withIcon: types.bool,
    alertIcon: types.string
  },

  getDefaultProps() {
    return {
      dismissable: false,
      withIcon: false
    };
  },

  getInitialState() {
    return {
      alertVisible: true
    };
  },

  render() {
    var {dismissable, withIcon, alertIcon, children, ...others} = this.props;

    if (this.state.alertVisible) {
      var onDismiss = dismissable ? this.handleAlertDismiss : null;

      if (withIcon) {
        var icon = <i className={`fa ${alertIcon}`}></i>;
        children = <Media className={'mtn'} image={icon}>{children}</Media>;
      }
      return <BsAlert {...others} onDismiss={onDismiss}>{children}</BsAlert>;
    }

    return <span/>;
  },

  handleAlertDismiss: function() {
    var {dismissable} = this.props;
    if (typeof dismissable === 'function') dismissable();
    this.setState({alertVisible: false});
  }
});

function defAlert(props) {
  return React.createClass({
    propTypes: {
      dismissable: types.oneOfType([types.bool, types.func]),
      withIcon: types.bool
    },
    render() {
      const {children, ...others} = this.props;
      return (
        <Alert {...props} {...others}>
          <span className="sr-only">
            {(props.bsStyle === 'danger' ? 'error' : props.bsStyle) + ' alert message,'}
          </span>
          {children}
        </Alert>
      );
    }
  });
}

module.exports = {
  SuccessAlert: defAlert({bsStyle: 'success', alertIcon: 'fa-check-circle'}),
  InfoAlert: defAlert({bsStyle: 'info', alertIcon: 'fa-info-circle'}),
  WarningAlert: defAlert({bsStyle: 'warning', alertIcon: 'fa-exclamation-triangle'}),
  ErrorAlert: defAlert({bsStyle: 'danger', alertIcon: 'fa-exclamation-triangle'})
};
