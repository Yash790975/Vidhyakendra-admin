'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Calendar,
  Download,
  UserCheck,
  UserX,
  Clock,
  TrendingUp,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

// Mock teacher data
const mockTeachers = [
  { id: '1', name: 'Dr. Rajesh Kumar', subject: 'Mathematics', employeeId: 'EMP001', avatar: '' },
  { id: '2', name: 'Prof. Priya Singh', subject: 'Science', employeeId: 'EMP002', avatar: '' },
  { id: '3', name: 'Mr. Amit Kumar', subject: 'English', employeeId: 'EMP003', avatar: '' },
  { id: '4', name: 'Mrs. Sneha Gupta', subject: 'Hindi', employeeId: 'EMP004', avatar: '' },
  { id: '5', name: 'Dr. Rohan Verma', subject: 'Social Studies', employeeId: 'EMP005', avatar: '' },
  { id: '6', name: 'Ms. Anjali Patel', subject: 'Computer Science', employeeId: 'EMP006', avatar: '' },
  { id: '7', name: 'Mr. Vikram Singh', subject: 'Physical Education', employeeId: 'EMP007', avatar: '' },
  { id: '8', name: 'Mrs. Neha Reddy', subject: 'Art', employeeId: 'EMP008', avatar: '' },
]

// Mock monthly attendance data
const mockMonthlyAttendance = [
  { id: '1', name: 'Dr. Rajesh Kumar', employeeId: 'EMP001', present: 23, absent: 2, halfDay: 1, total: 26, percentage: 92 },
  { id: '2', name: 'Prof. Priya Singh', employeeId: 'EMP002', present: 24, absent: 0, halfDay: 2, total: 26, percentage: 96 },
  { id: '3', name: 'Mr. Amit Kumar', employeeId: 'EMP003', present: 22, absent: 1, halfDay: 3, total: 26, percentage: 85 },
  { id: '4', name: 'Mrs. Sneha Gupta', employeeId: 'EMP004', present: 25, absent: 1, halfDay: 0, total: 26, percentage: 96 },
  { id: '5', name: 'Dr. Rohan Verma', employeeId: 'EMP005', present: 22, absent: 1, halfDay: 3, total: 26, percentage: 88 },
  { id: '6', name: 'Ms. Anjali Patel', employeeId: 'EMP006', present: 23, absent: 1, halfDay: 2, total: 26, percentage: 90 },
  { id: '7', name: 'Mr. Vikram Singh', employeeId: 'EMP007', present: 21, absent: 0, halfDay: 5, total: 26, percentage: 82 },
  { id: '8', name: 'Mrs. Neha Reddy', employeeId: 'EMP008', present: 24, absent: 0, halfDay: 2, total: 26, percentage: 96 },
]

// Mock yearly attendance data
const mockYearlyAttendance = [
  { id: '1', name: 'Dr. Rajesh Kumar', employeeId: 'EMP001', present: 211, absent: 19, halfDay: 10, total: 240, percentage: 88 },
  { id: '2', name: 'Prof. Priya Singh', employeeId: 'EMP002', present: 225, absent: 11, halfDay: 4, total: 240, percentage: 94 },
  { id: '3', name: 'Mr. Amit Kumar', employeeId: 'EMP003', present: 208, absent: 10, halfDay: 22, total: 240, percentage: 87 },
  { id: '4', name: 'Mrs. Sneha Gupta', employeeId: 'EMP004', present: 230, absent: 7, halfDay: 3, total: 240, percentage: 96 },
  { id: '5', name: 'Dr. Rohan Verma', employeeId: 'EMP005', present: 216, absent: 5, halfDay: 19, total: 240, percentage: 90 },
  { id: '6', name: 'Ms. Anjali Patel', employeeId: 'EMP006', present: 213, absent: 9, halfDay: 18, total: 240, percentage: 89 },
  { id: '7', name: 'Mr. Vikram Singh', employeeId: 'EMP007', present: 204, absent: 17, halfDay: 19, total: 240, percentage: 85 },
  { id: '8', name: 'Mrs. Neha Reddy', employeeId: 'EMP008', present: 223, absent: 19, halfDay: -2, total: 240, percentage: 93 },
]

export default function TeacherAttendancePage() {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly' | 'yearly'>('monthly')
  const [selectedDate, setSelectedDate] = useState('2026-02-17')
  const [selectedMonth, setSelectedMonth] = useState('2026-02')
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024-25')
  const [dailyAttendance, setDailyAttendance] = useState<Record<string, 'present' | 'absent' | 'halfday' | null>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const getAttendanceCounts = () => {
    const present = Object.values(dailyAttendance).filter(status => status === 'present').length
    const absent = Object.values(dailyAttendance).filter(status => status === 'absent').length
    const halfDay = Object.values(dailyAttendance).filter(status => status === 'halfday').length
    const unmarked = mockTeachers.length - (present + absent + halfDay)
    return { present, absent, halfDay, unmarked }
  }

  const markAttendance = (teacherId: string, status: 'present' | 'absent' | 'halfday') => {
    setDailyAttendance(prev => ({
      ...prev,
      [teacherId]: prev[teacherId] === status ? null : status
    }))
  }

  const markAllPresent = () => {
    const allPresent: Record<string, 'present'> = {}
    mockTeachers.forEach(teacher => {
      allPresent[teacher.id] = 'present'
    })
    setDailyAttendance(allPresent)
  }

  const markAllAbsent = () => {
    const allAbsent: Record<string, 'absent'> = {}
    mockTeachers.forEach(teacher => {
      allAbsent[teacher.id] = 'absent'
    })
    setDailyAttendance(allAbsent)
  }

  const counts = getAttendanceCounts()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600'
    if (percentage >= 85) return 'text-blue-600'
    if (percentage >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPerformanceStatus = (percentage: number) => {
    if (percentage >= 95) return 'Excellent'
    if (percentage >= 85) return 'Good'
    if (percentage >= 75) return 'Average'
    return 'Poor'
  }

  // Pagination logic
  const getCurrentData = () => {
    if (viewMode === 'daily') return mockTeachers
    if (viewMode === 'monthly') return mockMonthlyAttendance
    return mockYearlyAttendance
  }

  const currentData = getCurrentData()
  const totalPages = Math.ceil(currentData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = currentData.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link href="/dashboard/teachers/active">
            <Button variant="ghost" size="sm" className="mb-3 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Teachers
            </Button>
          </Link>
          
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center shrink-0">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Attendance Management</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Track and manage teacher attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex rounded-lg border p-1 bg-muted/30">
            <Button
              variant={viewMode === 'daily' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('daily')}
              className={`${viewMode === 'daily' ? 'bg-[#1897C6] text-white' : ''} text-xs sm:text-sm`}
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
              Daily
            </Button>
            <Button
              variant={viewMode === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('monthly')}
              className={`${viewMode === 'monthly' ? 'bg-[#1897C6] text-white' : ''} text-xs sm:text-sm`}
            >
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
              Monthly
            </Button>
            <Button
              variant={viewMode === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('yearly')}
              className={`${viewMode === 'yearly' ? 'bg-[#1897C6] text-white' : ''} text-xs sm:text-sm`}
            >
              <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
              Yearly
            </Button>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground">Academic Year 2024-25</p>
        </div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Date Selector and Actions */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                    <Input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="max-w-xs"
                    />
                    <p className="text-xs text-muted-foreground mt-2">Tuesday, 17 February 2026</p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    <Button 
                      size="sm" 
                      className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700"
                      onClick={markAllPresent}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Mark All Present
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      className="flex-1 sm:flex-none"
                      onClick={markAllAbsent}
                    >
                      <XCircle className="h-4 w-4 mr-1.5" />
                      Mark All Absent
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Present</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">{counts.present}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Absent</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600">{counts.absent}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Half Day</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{counts.halfDay}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Unmarked</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-600">{counts.unmarked}</p>
                </CardContent>
              </Card>
            </div>

            {/* Teacher List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Teacher Attendance - {new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">S.No</th>
                        <th className="text-left p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Teacher Details</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Attendance Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((teacher: any, index: number) => (
                        <tr key={teacher.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 sm:p-4">
                            <p className="text-sm font-medium text-muted-foreground">{startIndex + index + 1}</p>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                                <AvatarImage src={teacher.avatar} />
                                <AvatarFallback className="bg-[#1897C6] text-white text-xs font-semibold">
                                  {getInitials(teacher.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">{teacher.name}</p>
                                <p className="text-xs text-muted-foreground">{teacher.employeeId} • {teacher.subject}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex flex-wrap justify-center gap-2">
                              <Button
                                size="sm"
                                variant={dailyAttendance[teacher.id] === 'present' ? 'default' : 'outline'}
                                className={`text-xs ${
                                  dailyAttendance[teacher.id] === 'present' 
                                    ? 'bg-green-600 hover:bg-green-700' 
                                    : 'hover:bg-green-50'
                                }`}
                                onClick={() => markAttendance(teacher.id, 'present')}
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Present
                              </Button>
                              <Button
                                size="sm"
                                variant={dailyAttendance[teacher.id] === 'absent' ? 'default' : 'outline'}
                                className={`text-xs ${
                                  dailyAttendance[teacher.id] === 'absent' 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'hover:bg-red-50'
                                }`}
                                onClick={() => markAttendance(teacher.id, 'absent')}
                              >
                                <XCircle className="h-3 w-3 mr-1" />
                                Absent
                              </Button>
                              <Button
                                size="sm"
                                variant={dailyAttendance[teacher.id] === 'halfday' ? 'default' : 'outline'}
                                className={`text-xs ${
                                  dailyAttendance[teacher.id] === 'halfday' 
                                    ? 'bg-yellow-600 hover:bg-yellow-700' 
                                    : 'hover:bg-yellow-50'
                                }`}
                                onClick={() => markAttendance(teacher.id, 'halfday')}
                              >
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Half Day
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {counts.unmarked > 0 && (
                  <div className="p-4 border-t bg-yellow-50">
                    <p className="text-sm text-yellow-800 text-center">
                      ⚠️ {counts.unmarked} teacher(s) pending attendance
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">Rows:</span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger className="w-[65px] sm:w-[75px] h-8 sm:h-9 border-2 text-xs sm:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {startIndex + 1}-{Math.min(endIndex, currentData.length)} of {currentData.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                        let pageNumber: number
                        if (totalPages <= 3) {
                          pageNumber = i + 1
                        } else if (currentPage <= 2) {
                          pageNumber = i + 1
                        } else if (currentPage >= totalPages - 1) {
                          pageNumber = totalPages - 2 + i
                        } else {
                          pageNumber = currentPage - 1 + i
                        }
                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`h-8 w-8 sm:h-9 sm:w-9 p-0 border-2 ${
                              currentPage === pageNumber 
                                ? 'bg-[#1897C6] border-[#1897C6] text-white hover:bg-[#1897C6]/90' 
                                : ''
                            }`}
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button size="lg" className="bg-[#1897C6] hover:bg-[#1897C6]/90 w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Save Attendance
              </Button>
            </div>
          </div>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Month Selector */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <Label className="text-sm font-medium mb-2 block">Select Month</Label>
                    <Input 
                      type="month" 
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                  <Button className="bg-[#1897C6] hover:bg-[#1897C6]/90 w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Avg. Attendance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1897C6]">90.8%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Excellent (95%+)</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">5</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Good (75-94%)</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">3</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Days</p>
                  <p className="text-2xl sm:text-3xl font-bold">26</p>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Report Table */}
            <Card>
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Monthly Attendance Report</CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">February 2026</p>
                  </div>
                  <Badge variant="secondary">8 Teachers</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Teacher</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Present</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Absent</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Half Day</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total Days</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Percentage</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((teacher: any, index: number) => (
                        <tr key={teacher.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 sm:p-4">
                            <p className="text-sm font-medium text-muted-foreground">{startIndex + index + 1}</p>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {teacher.present}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              {teacher.absent}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              {teacher.halfDay}
                            </Badge>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className="text-sm font-semibold">{teacher.total}</span>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex flex-col items-center gap-1">
                              <span className={`text-sm font-bold ${getPerformanceColor(teacher.percentage)}`}>
                                {teacher.percentage}%
                              </span>
                              <Progress value={teacher.percentage} className="h-1.5 w-16" />
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <Badge 
                              variant="outline"
                              className={
                                teacher.percentage >= 95 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : teacher.percentage >= 85 
                                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                  : teacher.percentage >= 75
                                  ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }
                            >
                              {getPerformanceStatus(teacher.percentage)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Yearly View */}
        {viewMode === 'yearly' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Year Info */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold mb-1">Academic Year {selectedAcademicYear}</h3>
                      <p className="text-sm text-muted-foreground">Complete yearly attendance overview</p>
                    </div>
                    <Button className="bg-[#1897C6] hover:bg-[#1897C6]/90 w-full sm:w-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Export Yearly Report
                    </Button>
                  </div>
                  
                  {/* Academic Year Selector */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Select Year:</label>
                    <Select value={selectedAcademicYear} onValueChange={setSelectedAcademicYear}>
                      <SelectTrigger className="w-[140px] sm:w-[160px] border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025-26">2025-26</SelectItem>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                        <SelectItem value="2022-23">2022-23</SelectItem>
                        <SelectItem value="2021-22">2021-22</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yearly Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Days</p>
                  <p className="text-2xl sm:text-3xl font-bold">240</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Avg. Present</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">90%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Best Performance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1897C6]">96%</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Total Teachers</p>
                  <p className="text-2xl sm:text-3xl font-bold">8</p>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Report Table */}
            <Card>
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-base sm:text-lg">Yearly Attendance Report</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Academic Year {selectedAcademicYear} • Complete Overview</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Teacher</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Present</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Absent</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Half Day</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Total Days</th>
                        <th className="text-center p-3 sm:p-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((teacher: any, index: number) => (
                        <tr key={teacher.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="p-3 sm:p-4">
                            <p className="text-sm font-medium text-muted-foreground">{startIndex + index + 1}</p>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-[#1897C6] text-white text-xs font-semibold">
                                  {getInitials(teacher.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">{teacher.name}</p>
                                <p className="text-xs text-muted-foreground">{teacher.employeeId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className="text-sm font-semibold text-green-600">{teacher.present}</span>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className="text-sm font-semibold text-red-600">{teacher.absent}</span>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className="text-sm font-semibold text-yellow-600">{teacher.halfDay}</span>
                          </td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className="text-sm font-semibold">{teacher.total}</span>
                          </td>
                          <td className="p-3 sm:p-4">
                            <div className="flex flex-col items-center gap-2">
                              <span className={`text-base font-bold ${getPerformanceColor(teacher.percentage)}`}>
                                {teacher.percentage}%
                              </span>
                              <Progress value={teacher.percentage} className="h-2 w-20" />
                              <Badge 
                                variant="outline"
                                className={
                                  teacher.percentage >= 95 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : teacher.percentage >= 85 
                                    ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                    : teacher.percentage >= 75
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                }
                              >
                                {getPerformanceStatus(teacher.percentage)}
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Pagination */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">Rows:</span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger className="w-[65px] sm:w-[75px] h-8 sm:h-9 border-2 text-xs sm:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {startIndex + 1}-{Math.min(endIndex, currentData.length)} of {currentData.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                        let pageNumber: number
                        if (totalPages <= 3) {
                          pageNumber = i + 1
                        } else if (currentPage <= 2) {
                          pageNumber = i + 1
                        } else if (currentPage >= totalPages - 1) {
                          pageNumber = totalPages - 2 + i
                        } else {
                          pageNumber = currentPage - 1 + i
                        }
                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`h-8 w-8 sm:h-9 sm:w-9 p-0 border-2 ${
                              currentPage === pageNumber 
                                ? 'bg-[#1897C6] border-[#1897C6] text-white hover:bg-[#1897C6]/90' 
                                : ''
                            }`}
                          >
                            {pageNumber}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                    >
                      <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
