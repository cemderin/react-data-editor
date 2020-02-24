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
                      {(modelField.type === DataEditorModelFieldType.Object && (
                        <dl>
                          {modelField.model?.map(
                            (
                              childModelField: DataEditorModelField,
                              childIndex: number
                            ) => {
                              return (
                                <React.Fragment key={childIndex}>
                                  <dt>
                                    {childModelField.label
                                      ? childModelField.label
                                      : childModelField.key}
                                  </dt>
                                  <dd>
                                    {displayValue &&
                                      displayValue[childModelField.key]}
                                  </dd>
                                </React.Fragment>
                              );
                            }
                          )}
                        </dl>
                      )) ||
                        (modelField.type === DataEditorModelFieldType.String &&
                          displayValue) ||
                        (modelField.type === DataEditorModelFieldType.Array && (
                          <React.Fragment>
                            {(Array.isArray(displayValue) &&
                              displayValue.length) ||
                              0}{' '}
                            Items
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
                    if (
                      props.deleteCallback &&
                      window.confirm('Do you want to delete this record?')
                    )
                      props.deleteCallback(recordIndex);
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
