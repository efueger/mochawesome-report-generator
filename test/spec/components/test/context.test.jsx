import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import { TestContext, CodeSnippet } from 'components/test';

chai.use(chaiEnzyme());

describe('<TestContext />', () => {
  const getInstance = instanceProps => {
    const wrapper = shallow(<TestContext { ...instanceProps } />);
    return {
      wrapper,
      ctx: wrapper.find(TestContext),
      ctxItems: wrapper.find('.context-item'),
      img: wrapper.find('img'),
      snippet: wrapper.find(CodeSnippet)
    };
  };

  it('renders no context', () => {
    const context = {
      title: 'sample context'
    };
    const { wrapper, ctxItems } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.be.blank;
    expect(ctxItems).to.have.lengthOf(0);
  });

  it('renders context with string', () => {
    const context = 'sample context';
    const { wrapper, snippet } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.have.className('test');
    expect(snippet).to.have.lengthOf(1);
  });

  it('renders context with string, image url', () => {
    const context = 'http://test.url.com/testimage.png';
    const { wrapper, snippet, img } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.have.className('test');
    expect(snippet).to.have.lengthOf(0);
    expect(img).to.have.lengthOf(1);
  });

  it('renders context with object, string value', () => {
    const context = {
      title: 'sample context',
      value: 'context string'
    };
    const { wrapper, snippet } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.have.className('test');
    expect(snippet).to.have.lengthOf(1);
  });

  it('renders context with object, image url value', () => {
    const context = {
      title: 'sample context',
      value: 'http://test.url.com/testimage.png'
    };
    const { wrapper, snippet, img } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.have.className('test');
    expect(snippet).to.have.lengthOf(0);
    expect(img).to.have.lengthOf(1);
  });

  it('renders context with object, object value', () => {
    const context = {
      title: 'sample context',
      value: { testing: true }
    };
    const { wrapper, snippet } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.have.className('test');
    expect(snippet).to.have.lengthOf(1);
  });

  it('renders context with array', () => {
    const context = [
      {
        title: 'sample context a',
        value: 'http://test.url.com/testimage.png'
      },
      {
        title: 'sample context b',
        value: { testing: true }
      }
    ];
    const { wrapper, snippet, img } = getInstance({
      context: JSON.stringify(context),
      className: 'test'
    });
    expect(wrapper).to.have.className('test');
    expect(snippet).to.have.lengthOf(1);
    expect(img).to.have.lengthOf(1);
  });
});
