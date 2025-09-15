import { DataTable } from "@/features/words/ui/data-table"
import { SAMPLE_WORDS } from "../data/data"
import { columns, Payment } from "@/features/words/ui/columns"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return SAMPLE_WORDS;
}

export default async function Words() {
  const data = await getData()
  return (
    <div className="bg-card rounded">
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}