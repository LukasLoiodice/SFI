import React from "react";

type Column<T> = {
    key: keyof T | string;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
};

type TableProps<T> = {
    columns: Column<T>[];
    data: T[];
    rowKey?: (row: T) => string | number;
    onRowClick?: (row: T) => void;
};

export const TableComponent = <T extends Record<string, any>>({
    columns,
    data,
    rowKey,
    onRowClick,
}: TableProps<T>) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key.toString()}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, idx) => {
                        const rowId = rowKey ? rowKey(row) : idx
                        const isClickable = Boolean(onRowClick)

                        return (
                            <tr
                                key={rowId}
                                onClick={() => { isClickable ? onRowClick?.(row) : undefined }}
                                className={
                                    isClickable
                                        ? "hover:bg-gray-50 cursor-pointer transition-colors"
                                        : ""
                                }
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key.toString()}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                                    >
                                        {col.render
                                            ? col.render(row[col.key as keyof T], row)
                                            : row[col.key as keyof T]}
                                    </td>
                                ))}
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    )
}