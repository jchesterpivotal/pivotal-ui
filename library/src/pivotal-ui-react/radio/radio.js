var React = require('react');
import {mergeProps} from 'pui-react-helpers';

var Radio = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  },

  render: function() {
    const {className, style, children, ...others} = this.props;
    const props = mergeProps({className: className, style: style}, {className: 'radio'});
    return (
      <div {...props}>
        <label>
          <input type="radio" {...others}/>
          {children}
        </label>
      </div>
    );
  }
});

module.exports = {Radio};
