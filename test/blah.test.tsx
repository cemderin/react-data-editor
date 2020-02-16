import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DataEditor from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataEditor data={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
