import React, { useState } from 'react';
import DataEditor, {
  DataEditorModelField,
  DataEditorModelFieldType,
} from '../index';

type DataEditorMaskProps = {
  record: object;
  model: Array<DataEditorModelField>;
  saveCallback?: Function;
  cancelCallback?: Function;
  buttonComponent: React.FC;
};

const DataEditorMask: React.FC<DataEditorMaskProps> = (props: any) => {
  const [workingCopy, setWorkingCopy] = useState(props.record);
  const ButtonComponent: React.FC<any> = props.buttonComponent;
  const [innerEditors, setInnerEditors] = useState<any>([]);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.saveCallback) props.saveCallback(workingCopy);
      }}
    >
      {props.model.map((modelField: DataEditorModelField, index: number) => {
        const fieldValue = workingCopy[modelField.key];
        return (
          <div key={index}>
            {modelField.label ? modelField.label : modelField.key}
            {modelField.type === DataEditorModelFieldType.String && (
              <input
                type="text"
                defaultValue={fieldValue}
                onChange={(e: any) => {
                  const value = e.target.value;
                  const wc = { ...workingCopy };
                  wc[modelField.key] = value;
                  setWorkingCopy(wc);
                }}
              />
            )}

            {modelField.type === DataEditorModelFieldType.Array && (
              <div>
                <DataEditor
                  data={fieldValue || []}
                  model={modelField.model || []}
                  editCallback={(editIndex: number) => {
                    const newInnerEditors: any = [...innerEditors];
                    if (!newInnerEditors[index]) newInnerEditors[index] = {};
                    newInnerEditors[index].editRecordIndex = editIndex;
                    setInnerEditors(newInnerEditors);
                  }}
                  editRecordIndex={
                    innerEditors &&
                    innerEditors[index] &&
                    innerEditors[index].editRecordIndex &&
                    innerEditors[index].editRecordIndex
                  }
                  addCallback={() => {
                    const newInnerEditors: any = [...innerEditors];
                    if (!newInnerEditors[index]) newInnerEditors[index] = {};
                    newInnerEditors[index].addNewRecord = true;
                    setInnerEditors(newInnerEditors);
                  }}
                  addNewRecord={
                    innerEditors &&
                    innerEditors[index] &&
                    innerEditors[index].addNewRecord &&
                    innerEditors[index].addNewRecord
                  }
                  cancelCallback={() => {
                    const newInnerEditors: any = [...innerEditors];
                    if (!newInnerEditors[index]) newInnerEditors[index] = {};
                    newInnerEditors[index].addNewRecord = false;
                    newInnerEditors[index].editRecordIndex = null;
                    setInnerEditors(newInnerEditors);
                  }}
                  deleteCallback={(deleteIndex: number) => {
                    const newData = [...fieldValue].filter(
                      (item: any, newDataIndex: number) => {
                        if (!item) return false;
                        if (newDataIndex === deleteIndex) return false;
                        return true;
                      }
                    );

                    const wc = { ...workingCopy };
                    wc[modelField.key] = newData;
                    setWorkingCopy(wc);
                  }}
                  saveCallback={(saveItem: any, saveIndex: number) => {
                    const newData = Array.isArray(fieldValue)
                      ? [...fieldValue]
                      : [];
                    if (saveIndex === null) {
                      newData.push(saveItem);
                    } else {
                      newData[saveIndex] = saveItem;
                    }

                    const wc = { ...workingCopy };
                    wc[modelField.key] = newData;
                    setWorkingCopy(wc);

                    const newInnerEditors: any = [...innerEditors];
                    if (!newInnerEditors[index]) newInnerEditors[index] = {};
                    newInnerEditors[index].addNewRecord = false;
                    newInnerEditors[index].editRecordIndex = null;
                    setInnerEditors(newInnerEditors);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <ButtonComponent
        onClick={(e: any) => {
          e.preventDefault();
          if (props.cancelCallback) props.cancelCallback();
        }}
      >
        cancel
      </ButtonComponent>
      <ButtonComponent type="submit">save</ButtonComponent>
    </form>
  );
};

export default DataEditorMask;
