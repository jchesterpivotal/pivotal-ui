require('../spec_helper');
import {itPropagatesAttributes} from '../support/shared_examples';

describe('Heading', function() {
  var typography, Heading;
  beforeEach(function() {
    typography = require('../../../src/pivotal-ui-react/typography/typography');
    Heading = typography.Heading;
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('when the Heading has no properties passed in', function() {
    beforeEach(function() {
      ReactDOM.render((<Heading children="Heading text here"/>), root);
    });

    it('creates a p tag', function() {
      expect('p:contains("Heading text here")').toExist();
    });

    it('sets no additional classes', function() {
      expect('p:contains("Heading text here")').toHaveAttr('class', undefined);
    });
  });

  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function(element) {
    describe('when passing in element="' + element + '"', function() {
      beforeEach(function() {
        ReactDOM.render((<Heading element={element} children="Heading text here"/>), root);
      });

      it('creates an element of the specified heading', function() {
        expect(element + ':contains("Heading text here")').toExist();
      });
    });
  });

  describe('when the Heading has attrs provided', function() {
    beforeEach(function() {
      ReactDOM.render((<Heading element="h1" allCaps={true} className="myClass" id='myId' style={{opacity: '0.5'}} children="Heading text here"/>), root);
    });

    it('has the default classes', function() {
      expect('h1:contains("Heading text here")').toHaveClass('myClass');
      expect('h1:contains("Heading text here")').toHaveClass('em-alt');
    });

    itPropagatesAttributes('h1:contains("Heading text here")', {className: 'myClass', id: 'myId', style: {opacity: '0.5'}});
  });

  describe('when the Heading has size provided', function() {
    beforeEach(function() {
      ReactDOM.render((<Heading element="h1" size="small" children="Heading text here"/>), root);
    });

    it('creates an element with the size class set', function() {
      expect('h1:contains("Heading text here")').toHaveClass('small');
    });
  });

  describe('when the Heading has allCaps set', function() {
    beforeEach(function() {
      ReactDOM.render((<Heading element="h2" allCaps={true} children="Heading text here"/>), root);
    });

    it('creates an element with the em-alt class', function() {
      expect('h2:contains("Heading text here")').toHaveClass('em-alt');
    });
  });

  describe('when the Heading has a bold set', function() {
    beforeEach(function() {
      ReactDOM.render((<Heading element="h2" bold="high" children="Heading text here"/>), root);
    });

    it('creates an element with the em-{bold} class', function() {
      expect('h2:contains("Heading text here")').toHaveClass('em-high');
    });
  });

  describe('when the Heading has color set', function() {
    beforeEach(function() {
      ReactDOM.render((<Heading element="h2" color="purple" children="Heading text here"/>), root);
    });

    it('creates an element with the color class', function() {
      expect('h2:contains("Heading text here")').toHaveClass('purple');
    });
  });

  describe('when Heading has many properties set', function() {
    beforeEach(function() {
      ReactDOM.render(
        (<Heading element="h2" size="h4" color="purple" bold="max" allCaps={true} children="Heading text here"/>),
        root);
    });

    it('creates an element all the necessary classes', function() {
      expect('h2:contains("Heading text here")').toHaveClass('purple');
      expect('h2:contains("Heading text here")').toHaveClass('em-alt');
      expect('h2:contains("Heading text here")').toHaveClass('em-max');
      expect('h2:contains("Heading text here")').toHaveClass('h4');
    });
  });
});
