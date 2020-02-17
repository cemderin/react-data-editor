import React, { useState } from 'react';
import { DataEditorModelField } from '../index';

type DataEditorMaskProps = {
  record: object;
  model: Array<DataEditorModelField>;
  saveCallback?: Function;
  cancelCallback?: Function;
};

const DataEditorMask: React.FC<DataEditorMaskProps> = (props: any) => {
  const [workingCopy, setWorkingCopy] = useState(props.record);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        if (props.saveCallback) props.saveCallback(workingCopy);
      }}
    >
      {props.model.map((modelField: DataEditorModelField, index: number) => {
        return (
          <div key={index}>
            {modelField.label ? modelField.label : modelField.key}
            <input
              type="text"
              defaultValue={workingCopy[modelField.key]}
              onChange={(e: any) => {
                const value = e.target.value;
                const wc = { ...workingCopy };
                wc[modelField.key] = value;
                setWorkingCopy(wc);
              }}
            />
          </div>
        );
      })}

      <button
        onClick={() => {
          if (props.cancelCallback) props.cancelCallback();
        }}
      >
        cancel
      </button>
      <button type="submit">save</button>
    </form>
  );
};

export default DataEditorMask;
