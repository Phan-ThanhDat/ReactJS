import * as React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('Button', () => {
  it('Should render button', () => {
    const component = renderer.create(
      <Button>Children of Button component</Button>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should pass props', () => {
    const component = renderer.create(
      <Button type='button' aria-busy={true} onClick={() => {}}>
        Hello
      </Button>
    );

    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should onClick as function', () => {
    const component = renderer.create(
      <Button onClick={() => {}}>children</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(tree!.props.onClick.toString()).toEqual('() => {}');
  });

  it('Should onClick is called 1 time when triggered', () => {
    const component = renderer.create(
      <Button onClick={() => {}}>children</Button>
    );
    let tree = component.toJSON();
    const spy = jest.spyOn(tree!.props, 'onClick');
    tree!.props.onClick();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
