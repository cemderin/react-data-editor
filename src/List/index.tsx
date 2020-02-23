import React from 'react';
import { DataEditorModelField, DataEditorModelFieldType } from '../index';

const DataEditorList: React.FC = (props: any) => {
  const ButtonComponent: React.FC<any> = props.buttonComponent;

  return (
    <table>
      <thead>
        <tr>
          {props.model.map(
            (modelField: DataEditorModelField, modelIndex: number) => {
              return (
                <th key={modelIndex}>
                  {modelField.label ? modelField.label : modelField.key}
                </th>
              );
            }
          )}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((record: any, recordIndex: number) => {
          return (
            <tr key={recordIndex}>
              {props.model.map(
                (modelField: DataEditorModelField, modelIndex: number) => {
                  const displayValue = record[modelField.key];
                  return (
                    <td key={modelIndex}>
                      {(modelField.type === DataEditorModelFieldType.String &&
                        displayValue) ||
                        (modelField.type === DataEditorModelFieldType.Array && (
                          <React.Fragment>
                            {displayValue.length} Items
                          </React.Fragment>
                        ))}
                    </td>
                  );
                }
              )}
              <td>
                <ButtonComponent
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (props.editCallback) props.editCallback(recordIndex);
                  }}
                >
                  Edit
                </ButtonComponent>
                <ButtonComponent
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (props.deleteCallback) props.deleteCallback(recordIndex);
                  }}
                >
                  Delete
                </ButtonComponent>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataEditorList;
