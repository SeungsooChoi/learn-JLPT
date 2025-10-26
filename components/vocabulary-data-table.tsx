import { Word } from "@/lib/types";

import { getCoreRowModel, getPaginationRowModel, useReactTable, type VisibilityState, type ColumnDef, flexRender } from "@tanstack/react-table"
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, EyeOff, Volume2 } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface VocabularyDataTableProps {
  data: Word[]
}

export function VocabularyDataTable({ data }: VocabularyDataTableProps) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowVisibility, setRowVisibility] = useState<Record<string, boolean>>({})

  const toggleRowVisibility = (rowId: string) => {
    setRowVisibility((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  const columns: ColumnDef<Word>[] = [
    {
      accessorKey: "word",
      header: "단어",
      cell: ({ row }) => <div className="font-medium text-lg">{row.getValue("word")}</div>,
    },
    {
      accessorKey: "reading",
      header: "후리가나",
      cell: ({ row }) => {
        const isHidden = rowVisibility[row.id]
        return (
          <div className="text-muted-foreground">
            {isHidden ? <span className="text-muted-foreground/30">•••</span> : row.getValue("reading")}
          </div>
        )
      },
    },
    {
      accessorKey: "meaning",
      header: "뜻",
      cell: ({ row }) => {
        const isHidden = rowVisibility[row.id]
        return <div>{isHidden ? <span className="text-muted-foreground/30">•••</span> : row.getValue("meaning")}</div>
      },
    },
    {
      id: "audio",
      header: () => <div className="text-center">듣기</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">표시</div>,
      cell: ({ row }) => {
        const isHidden = rowVisibility[row.id]
        return (
          <div className="text-center">
            <Button variant="ghost" size="icon" onClick={() => toggleRowVisibility(row.id)} className="h-8 w-8">
              {isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 페이징 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="text-sm text-muted-foreground">
            단어 총 {data.length}개
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 min-w-[100px] justify-center">
              <span className="text-sm font-medium">{table.getState().pagination.pageIndex + 1}</span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm text-muted-foreground">{table.getPageCount()}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}