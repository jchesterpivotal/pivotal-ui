require('../spec_helper');
import {Dropdown, DropdownItem} from '../../../src/pivotal-ui-react/dropdowns/dropdowns';

describe('Dropdowns', function() {
  function dropdownTestFor(dropdownComponentName, dropdownClassName) {
    describe(dropdownComponentName, function() {
      beforeEach(function() {
        var DropdownClass = require('../../../src/pivotal-ui-react/dropdowns/dropdowns')[dropdownComponentName];
        ReactDOM.render(<DropdownClass title="Dropping" buttonClassName="test-btn-class"/>, root);
      });

      afterEach(function() {
        ReactDOM.unmountComponentAtNode(root);
      });

      it('creates a dropdown', function() {
        expect('button.dropdown-toggle').toContainText('Dropping');
      });

      it('adds the appropriate button classes (merging in buttonClassName) to the dropdown toggle', () => {
        expect('button.dropdown-toggle').toHaveClass(dropdownClassName);
        expect('button.dropdown-toggle').not.toHaveClass('btn-default');
        expect('.dropdown-toggle').toHaveClass('test-btn-class');
      });
    });
  }

  describe('Dropdown', function() {
    var props = {
      className: 'test-class',
      id: 'test-id',
      style: {
        opacity: '0.5'
      }
    };

    beforeEach(function() {
      ReactDOM.render(
        <Dropdown title="Dropping" {...props} buttonClassName="test-btn-class">
          <DropdownItem href="test">Item #1</DropdownItem>
        </Dropdown>, root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('passes through className to the btn-group ', function() {
      expect('#root .btn-group').toHaveClass(props.className);
    });

    it('passes through style to the button', function() {
      expect('#root .btn').toHaveCss(props.style);
    });

    it('passes through id to the button', function() {
      expect('#root .btn#test-id').toExist();
    });

    it('creates a dropdown-toggle', () => {
      expect('.dropdown-toggle').toContainText('Dropping');
      expect('.dropdown-toggle').toHaveClass('btn-default');
      expect('.dropdown-toggle').toHaveClass('test-btn-class');
    });

    it('renders all children DropdownItems', function() {
      expect('#root .dropdown-menu li').toHaveLength(1);
      expect('#root .dropdown-menu li').toHaveText('Item #1');
    });
  });

  describe('DropdownItem', function() {
    var props = {
      className: 'test-item-class',
      id: 'test-item-id',
      style: {
        opacity: '1'
      }
    };
    beforeEach(function() {
      ReactDOM.render(
        <DropdownItem href='test' {...props}>Item</DropdownItem>,
        root);
    });

    afterEach(function() {
      ReactDOM.unmountComponentAtNode(root);
    });

    it('passes through className to the li ', function() {
      expect('#root li').toHaveClass(props.className);
    });

    it('passes through style to the li', function() {
      expect('#root li').toHaveCss(props.style);
    });

    it('passes through id to the anchor', function() {
      expect('#root li a#test-item-id').toExist();
    });
  });

  dropdownTestFor('LinkDropdown', 'btn-link');

  dropdownTestFor('DefaultAltDropdown', 'btn-default-alt');

  dropdownTestFor('LowlightDropdown', 'btn-lowlight');

  dropdownTestFor('DangerDropdown', 'btn-danger');

  dropdownTestFor('HighlightDropdown', 'btn-highlight');

  dropdownTestFor('HighlightAltDropdown', 'btn-highlight-alt');
});
