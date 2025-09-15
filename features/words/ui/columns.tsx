"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  word: string
  reading: string
  meaning: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "word",
    header: "단어",
  },
  {
    accessorKey: "reading",
    header: "발음",
  },
  {
    accessorKey: "meaning",
    header: "뜻",
  },
  {
    id: "actions",
    header: "표시",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <Button
          size="sm"
          onClick={() => {
            console.log("Clicked:", payment.id)
          }}
        >
          선택
        </Button>
      )
    }
  },
]