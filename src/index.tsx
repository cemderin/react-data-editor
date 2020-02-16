import React from 'react';

type DataEditorProps = {
  data: Array<object>;
  editItemAtIndeex?: null | number;
  addNewItem?: null | object;
};

const DataEditor: React.FC<DataEditorProps> = (props: any) => {
  return <section>{props.children}</section>;
};

DataEditor.defaultProps = {
  editItemAtIndeex: null,
  addNewItem: null,
};

export { DataEditor as default };
