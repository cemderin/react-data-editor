import React from 'react';
import DataEditorList from './List/index';
import DataEditorMask from './Mask/index';

type DataEditorModelField = {
  key: string;
  label?: string;
};

type DataEditorProps = {
  data: Array<object>;
  model: Array<DataEditorModelField>;

  editCallback?: Function;
  editRecordIndex?: number | null;

  addCallback?: Function;
  addNewRecord?: boolean;

  cancelCallback?: Function;

  saveCallback?: Function;

  deleteCallback?: Function;
};

const generateEmptyRecordFromModel = (model: Array<DataEditorModelField>) => {
  const emptyRecord: any = {};
  for (let i = 0; i < model.length; i++) {
    emptyRecord[model[i].key] = '';
  }
  return emptyRecord;
};

const DataEditor: React.FC<DataEditorProps> = (props: any) => {
  // add new
  if (props.addNewRecord)
    return (
      <DataEditorMask
        record={generateEmptyRecordFromModel(props.model)}
        model={props.model}
        cancelCallback={props.cancelCallback}
        saveCallback={(record: object) => {
          props.saveCallback(record, null);
        }}
      />
    );

  // edit record
  if (props.editRecordIndex !== null)
    return (
      <DataEditorMask
        record={props.data[props.editRecordIndex]}
        model={props.model}
        cancelCallback={props.cancelCallback}
        saveCallback={(record: object) => {
          props.saveCallback(record, props.editRecordIndex);
        }}
      />
    );

  // default: list
  return (
    <section>
      <button
        onClick={() => {
          if (props.addCallback) props.addCallback();
        }}
      >
        Add Item
      </button>

      <DataEditorList {...props} />
    </section>
  );
};

DataEditor.defaultProps = {
  editRecordIndex: null,
  addNewRecord: false,
};

export { DataEditor as default, DataEditorModelField };
