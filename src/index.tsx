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

  buttonComponent?: React.FC | React.Component | null;
};

const generateEmptyRecordFromModel = (model: Array<DataEditorModelField>) => {
  const emptyRecord: any = {};
  for (let i = 0; i < model.length; i++) {
    emptyRecord[model[i].key] = '';
  }
  return emptyRecord;
};

const Button: React.FC = (props: any) => {
  return <button {...props} />;
};

const DataEditor: React.FC<DataEditorProps> = (props: any) => {
  const ButtonComponent: React.FC<any> = (addProps: any) => {
    if (props.buttonComponent) return <props.buttonComponent {...addProps} />;
    return <Button {...addProps} />;
  };

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
        buttonComponent={ButtonComponent}
      />
    );

  // edit record
  if (props.editRecordIndex !== null) {
    console.group('Init record with index from data');
    console.log('Record', props.data[props.editRecordIndex]);
    console.log('Index', props.editRecordIndex);
    console.log('Data', props.data);
    console.groupEnd();

    return (
      <DataEditorMask
        record={props.data[props.editRecordIndex]}
        model={props.model}
        cancelCallback={props.cancelCallback}
        saveCallback={(record: object) => {
          props.saveCallback(record, props.editRecordIndex);
        }}
        buttonComponent={ButtonComponent}
      />
    );
  }

  // default: list
  return (
    <section>
      <ButtonComponent
        onClick={() => {
          if (props.addCallback) props.addCallback();
        }}
      >
        Add Item
      </ButtonComponent>

      <DataEditorList {...props} buttonComponent={ButtonComponent} />
    </section>
  );
};

DataEditor.defaultProps = {
  editRecordIndex: null,
  addNewRecord: false,
};

export { DataEditor as default, DataEditorModelField };
