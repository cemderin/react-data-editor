import React from 'react';
import { DataEditorModelField } from '../index';

const DataEditorList: React.FC = (props: any) => {
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
                  return <td key={modelIndex}>{record[modelField.key]}</td>;
                }
              )}
              <td>
                <button
                  onClick={() => {
                    if (props.editCallback) props.editCallback(recordIndex);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (props.deleteCallback) props.deleteCallback(recordIndex);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataEditorList;
