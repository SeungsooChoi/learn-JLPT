import { Button } from "@/app/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/table"

export default function Words() {
  return (
    <Card className="mt-4">
      <CardContent>
        <CardHeader className="flex items-center gap-5">
          <CardTitle>레벨 선택</CardTitle>
          {/* <select id="level-select" className="border rounded px-2 py-1">
            <option value="N5">N5</option>
            <option value="N4">N4</option>
            <option value="N3">N3</option>
            <option value="N2">N2</option>
            <option value="N1">N1</option>
          </select> */}
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <caption className="sr-only">단어 목록 테이블</caption>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">단어</TableHead>
                <TableHead scope="col">히라가나</TableHead>
                <TableHead scope="col">뜻</TableHead>
                <TableHead scope="col">보기 설정</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">단어 </TableCell>
                <TableCell>
                  dd
                </TableCell>
                <TableCell>
                  dd
                </TableCell>
                <TableCell>
                  <Button size="sm">표시</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}