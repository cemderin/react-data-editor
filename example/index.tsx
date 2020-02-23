import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DataEditor, { DataEditorModelFieldType } from '../.';

let data = [
  { id: 1, title: "Name #1", children: [{ test: "lol" }, { test: "lol2" }] },
]

let model = [
  { key: "title", label: "Title", type: DataEditorModelFieldType.String },
  { key: "name", label: "Name", type: DataEditorModelFieldType.String },
  { key: "children", label: "Children", type: DataEditorModelFieldType.Array, model: [{key: "test", type: DataEditorModelFieldType.String}]}
];

const Button: React.FC = (props: any) => {
return <button {...props}>{props.children}</button>
}

const App = () => {
  const [theData, setTheData] = React.useState(data);
  const [editRecordIndex, setEditRecordIndex] = React.useState(null);
  const [addNewRecord, setAddNewRecord] = React.useState(false);

  return (
    <div>
      <DataEditor
        data={theData}
        model={model}

        editRecordIndex={editRecordIndex}
        addNewRecord={addNewRecord}

        editCallback={(recordIndex: number) => {
          setEditRecordIndex(recordIndex);
        }}  

        addCallback={() => {
          setEditRecordIndex(null);
          setAddNewRecord(true);
        }}

        cancelCallback={() => {
          setEditRecordIndex(null);
          setAddNewRecord(false);
        }}

        saveCallback={(record: any, index: number | null) => {
          const wc = [...theData];

          if (index === null) {
            wc.push(record);
          } else {
            wc[index] = record;
          }

          setTheData(wc);
          setEditRecordIndex(null);
          setAddNewRecord(false);
        }}

        deleteCallback={(index: number) => {
          const wc = [...theData];
          const item = wc[index];
          
          setTheData(wc.filter((_item: any) => {
            if(item === _item) return false;
            return true;
          }));
          
          setEditRecordIndex(null);
          setAddNewRecord(false);
        }}

        buttonComponent={Button}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
