/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-expressions */
import * as React from 'react';

import { FontIcon } from '@fluentui/react';
import {
  Body1Strong,
  createTableColumn,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridProps,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  TableRowId,
} from '@fluentui/react-components';

import { IItem } from './IItem';

export interface IGridProps {
  items: IItem[];
  onSelected: (items: IItem[]) => void;
  defaultSelectedItems?: IItem[];
  multiSelect?: boolean;
}

const columnSizingOptions = {
  title: {
    minWidth: 40,
    defaultWidth: 80,
  },
  description: {
    defaultWidth: 80,
    minWidth: 60,
    idealWidth: 80,
  },
};

export const Grid: React.FunctionComponent<IGridProps> = (props: React.PropsWithChildren<IGridProps>) => {
  const { items, onSelected, defaultSelectedItems, multiSelect } = props;

const selectionMode = React.useMemo(() => multiSelect ? "multiselect" : "single" ?? "single", [multiSelect]);

  const [selectedRows, setSelectedRows] = React.useState(() => {
    if (defaultSelectedItems) {
      const set = new Set<TableRowId>();
      for (const item of defaultSelectedItems) {
        const index = items.findIndex((i) => i.key === item.key);
        if (index > -1) {
          set.add(index);
        }
      }
      return set;
    }
    return new Set<TableRowId>([]);
  });

  const columns: TableColumnDefinition<IItem>[] = [
    createTableColumn<IItem>({
      columnId: "title",
      compare: (a, b) => {
        if (typeof a.title === "string" && typeof b.title === "string") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      },
      renderHeaderCell: () => {
        return <Body1Strong>Title</Body1Strong>;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout
            media={React.isValidElement(item.icon) ? item.icon : <FontIcon iconName={item.icon as string} />}
          >
            {item.title}
          </TableCellLayout>
        );
      },
    }),
    createTableColumn<IItem>({
      columnId: "description",
      compare: (a, b) => {
        if (typeof a.description === "string" && typeof b.description === "string") {
          return a.description.localeCompare(b.description);
        }
        return 0;
      },
      renderHeaderCell: () => {
        return <Body1Strong>Description</Body1Strong>;
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>
            {React.isValidElement(item.description) ? item.description : item.description}
          </TableCellLayout>
        );
      },
    }),
  ];

  const onSelectionChange: DataGridProps["onSelectionChange"] = React.useCallback(
    (e, data) => {
      const entries = data.selectedItems.entries();
      // select all entries in the map
      const itemsSelected: IItem[] = [];
      const toArray = Array.from(entries);
      for (const item of toArray) {
        const rowId = item[0];
        const itemSelected = items[rowId];
        // code to be executed for each itemSelected
        itemsSelected.push(itemSelected);
      }
      onSelected(itemsSelected);
      setSelectedRows(data.selectedItems);
    },
    [onSelected, items]
  );

  const [sortState, setSortState] = React.useState<Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]>({
    sortColumn: "title",
    sortDirection: "ascending",
  });
  const onSortChange: DataGridProps["onSortChange"] = (e, nextSortState) => {
    setSortState(nextSortState);
  };

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode={selectionMode}
      selectedItems={selectedRows}
      onSelectionChange={onSelectionChange}
      sortable
      sortState={sortState}
      onSortChange={onSortChange}
      resizableColumns
      columnSizingOptions={columnSizingOptions}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<IItem>>
        {({ item, rowId }) => (
          <DataGridRow<IItem> key={rowId} selectionCell={{ radioIndicator: { "aria-label": "Select row" } }}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
