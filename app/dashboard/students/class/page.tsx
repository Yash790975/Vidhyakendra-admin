'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { StatsCard } from '@/components/stats-card'

const classes = [
  { class: '1', sections: ['A', 'B'], students: 45, avgAttendance: 92 },
  { class: '2', sections: ['A', 'B'], students: 48, avgAttendance: 94 },
  { class: '3', sections: ['A', 'B', 'C'], students: 63, avgAttendance: 91 },
  { class: '4', sections: ['A', 'B', 'C'], students: 66, avgAttendance: 93 },
  { class: '5', sections: ['A', 'B', 'C'], students: 69, avgAttendance: 95 },
  { class: '6', sections: ['A', 'B', 'C'], students: 72, avgAttendance: 94 },
  { class: '7', sections: ['A', 'B', 'C'], students: 75, avgAttendance: 92 },
  { class: '8', sections: ['A', 'B', 'C', 'D'], students: 88, avgAttendance: 93 },
  { class: '9', sections: ['A', 'B', 'C', 'D'], students: 92, avgAttendance: 91 },
  { class: '10', sections: ['A', 'B', 'C', 'D'], students: 96, avgAttendance: 94 },
  { class: '11', sections: ['Science', 'Commerce', 'Arts'], students: 84, avgAttendance: 90 },
  { class: '12', sections: ['Science', 'Commerce', 'Arts'], students: 78, avgAttendance: 89 },
]

export default function ClassWiseStudentsPage() {
  const [selectedClass, setSelectedClass] = useState('all')
  const [selectedSection, setSelectedSection] = useState('all')

  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0)
  const totalClasses = classes.length
  const totalSections = classes.reduce((sum, c) => sum + c.sections.length, 0)
  const avgAttendance = (classes.reduce((sum, c) => sum + c.avgAttendance, 0) / classes.length).toFixed(1)

  const filteredClasses = classes.filter(c => 
    selectedClass === 'all' || c.class === selectedClass
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class-wise Students</h1>
          <p className="text-muted-foreground">View and manage students by class and section</p>
        </div>
        <Link href="/dashboard/students/add">
          <Button className="gap-2 bg-primary">
            Add New Student
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Students" value={totalStudents} icon={Users} color="primary" trend={{ value: 6.5, isPositive: true }} />
        <StatsCard title="Total Classes" value={totalClasses} icon={BookOpen} color="secondary" />
        <StatsCard title="Total Sections" value={totalSections} icon={Award} color="accent" />
        <StatsCard title="Avg Attendance" value={`${avgAttendance}%`} icon={TrendingUp} color="success" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Classes</CardTitle>
              <CardDescription>Select a class to view section-wise breakdown</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(c => (
                    <SelectItem key={c.class} value={c.class}>Class {c.class}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((classData) => (
              <Card key={classData.class} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Class {classData.class}</CardTitle>
                    <Badge variant="secondary">{classData.students} Students</Badge>
                  </div>
                  <CardDescription>
                    {classData.sections.length} Section{classData.sections.length > 1 ? 's' : ''} • {classData.avgAttendance}% Attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {classData.sections.map((section) => (
                        <Link key={section} href={`/dashboard/students/all?class=${classData.class}&section=${section}`}>
                          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                            Section {section}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                    <Link href={`/dashboard/students/all?class=${classData.class}`}>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        View All Students
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
