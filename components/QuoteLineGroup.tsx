import { useState } from 'react'
import QuoteLine from './QuoteLine'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function QuoteLineGroup({ group, updateGroup, removeGroup }) {
  const [lines, setLines] = useState(group.lines)

  const addLine = () => {
    const newLine = { id: Date.now(), description: '', quantity: 1, price: 0 }
    const newLines = [...lines, newLine]
    setLines(newLines)
    updateGroup(group.id, newLines)
  }

  const updateLine = (lineId, field, value) => {
    const newLines = lines.map(line =>
      line.id === lineId ? { ...line, [field]: value } : line
    )
    setLines(newLines)
    updateGroup(group.id, newLines)
  }

  const removeLine = (lineId) => {
    const newLines = lines.filter(line => line.id !== lineId)
    setLines(newLines)
    updateGroup(group.id, newLines)
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Quote Group</span>
          <Button variant="destructive" onClick={() => removeGroup(group.id)}>Remove Group</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lines.map((line) => (
          <QuoteLine
            key={line.id}
            line={line}
            updateLine={updateLine}
            removeLine={removeLine}
          />
        ))}
        <Button onClick={addLine} className="mt-2">Add Line</Button>
      </CardContent>
    </Card>
  )
}

