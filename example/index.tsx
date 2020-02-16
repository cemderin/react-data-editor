import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DataEditor from '../.';

let data = [
  {id: 1, title: "Name #1", children: [{test: "lol"}]},  
  {id: 2, title: "Name #2"},
  {id: 3, title: "Name #3"},
  {id: 4, title: "Name #4"},
  {id: 5, title: "Name #5"},
  {id: 6, title: "Name #6"}
]

const App = () => {
  const [theData, setTheData] = React.useState(data);

  return (
    <div>
      <DataEditor />
    </div> 
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
