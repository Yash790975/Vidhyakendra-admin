'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Eye, 
  Edit2, 
  Archive,
  Users, 
  CheckCircle, 
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Download,
  Calendar
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockTeachers = [
  {
    id: '1',
    teacher_code: 'TCH001',
    employee_code: 'EMP2024001',
    full_name: 'Dr. Rajesh Kumar Singh',
    email: 'rajesh.kumar@vidyakendra.com',
    mobile: '+91 98765 43210',
    designation: 'Senior Teacher',
    department: 'Science',
    subjects: ['Physics', 'Mathematics'],
    classes_assigned: ['10-A', '10-B', '11-Science'],
    qualification: 'PhD Physics, M.Sc',
    experience_years: 15,
    joining_date: '2020-04-15',
    attendance_percentage: 96.5,
    performance_rating: 4.8,
    photo_url: '',
    status: 'active',
    salary: 85000,
    class_teacher_of: '10-A'
  },
  {
    id: '2',
    teacher_code: 'TCH002',
    employee_code: 'EMP2024002',
    full_name: 'Mrs. Priya Sharma',
    email: 'priya.sharma@vidyakendra.com',
    mobile: '+91 98765 43211',
    designation: 'Teacher',
    department: 'Languages',
    subjects: ['English', 'Hindi'],
    classes_assigned: ['8-A', '9-B', '10-A'],
    qualification: 'M.A English, B.Ed',
    experience_years: 8,
    joining_date: '2021-06-01',
    attendance_percentage: 98.2,
    performance_rating: 4.9,
    photo_url: '',
    status: 'active',
    salary: 65000,
    class_teacher_of: '9-B'
  },
  {
    id: '3',
    teacher_code: 'TCH003',
    employee_code: 'EMP2024003',
    full_name: 'Mr. Amit Patel',
    email: 'amit.patel@vidyakendra.com',
    mobile: '+91 98765 43212',
    designation: 'Senior Teacher',
    department: 'Science',
    subjects: ['Chemistry', 'Biology'],
    classes_assigned: ['11-Science', '12-Science'],
    qualification: 'M.Sc Chemistry, B.Ed',
    experience_years: 12,
    joining_date: '2019-08-20',
    attendance_percentage: 94.8,
    performance_rating: 4.7,
    photo_url: '',
    status: 'active',
    salary: 78000,
    class_teacher_of: '11-Science'
  },
]

export default function ActiveTeachersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const stats = {
    total: 82,
    presentToday: 78,
    avgAttendance: 96.2,
    topPerformers: 25,
  }

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.mobile.includes(searchQuery) ||
      teacher.teacher_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.employee_code.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesDepartment = departmentFilter === 'all' || teacher.department === departmentFilter
    
    return matchesSearch && matchesDepartment
  })

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleArchive = (id: string) => {
    setSelectedTeacher(id)
    setArchiveDialogOpen(true)
  }

  const confirmArchive = () => {
    console.log('[v0] Archiving teacher:', selectedTeacher)
    // Add archive logic here
    setArchiveDialogOpen(false)
    setSelectedTeacher(null)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
            Active Teachers
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage and monitor your teaching staff</p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-fit bg-transparent gap-2 h-9 sm:h-10 border-2">
          <Download className="h-4 w-4" />
          <span className="text-sm">Export Teachers</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-4">
        <Card className="border-2 hover:border-[#1897C6]/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white shadow-md">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Active</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-green-500/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Present Today</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.presentToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-blue-500/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-md">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Avg Attendance</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.avgAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-[#F1AF37]/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white shadow-md">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Top Performers</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.topPerformers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teachers Table */}
      <Card className="border-2">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <CardTitle className="text-base sm:text-lg">Teachers Directory</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, code, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-11 text-sm"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-10 sm:h-11 text-sm">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Languages">Languages</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Social Studies">Social Studies</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border-2 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 hover:from-[#1897C6]/5 hover:to-[#67BAC3]/5 border-b-2">
                    <TableHead className="font-semibold text-sm h-14">Name</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Teacher Code</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Contact Details</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden lg:table-cell">Qualification</TableHead>
                    <TableHead className="font-semibold text-sm h-14 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <Users className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">No teachers found</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedTeachers.map((teacher) => (
                      <TableRow key={teacher.id} className="hover:bg-gradient-to-r hover:from-[#1897C6]/5 hover:to-transparent transition-all border-b group">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                              {teacher.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm">{teacher.full_name}</p>
                              <p className="text-xs text-muted-foreground md:hidden">{teacher.teacher_code}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell py-4">
                          <p className="font-mono font-semibold text-sm text-[#1897C6]">{teacher.teacher_code}</p>
                        </TableCell>
                        <TableCell className="hidden md:table-cell py-4">
                          <div className="text-sm space-y-0.5">
                            <p className="font-medium text-foreground">{teacher.email}</p>
                            <p className="text-muted-foreground">{teacher.mobile}</p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell py-4">
                          <div className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#F1AF37]/10 to-[#D88931]/10 px-3 py-1.5 border border-[#F1AF37]/20">
                            <span className="text-xs font-medium text-[#D87331]">{teacher.qualification}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/dashboard/teachers/active/${teacher.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg hover:bg-[#1897C6]/10 hover:text-[#1897C6] transition-colors"
                                title="View Details"
                              >
                                <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </Button>
                            </Link>
                            <Link href={`/dashboard/teachers/add?edit=${teacher.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg hover:bg-[#F1AF37]/10 hover:text-[#F1AF37] transition-colors"
                                title="Edit Teacher"
                              >
                                <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg text-orange-500 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                              title="Mark Inactive"
                              onClick={() => handleArchive(teacher.id)}
                            >
                              <Archive className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 pt-3 sm:pt-4 border-t">
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
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-xs sm:text-sm font-medium">
                {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredTeachers.length)} of {filteredTeachers.length}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2 bg-transparent hover:bg-[#1897C6]/10 hover:border-[#1897C6] disabled:opacity-50 transition-all"
              >
                <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 sm:h-9 sm:w-9 sm:w-auto sm:px-3 p-0 border-2 bg-transparent hover:bg-[#1897C6]/10 hover:border-[#1897C6] disabled:opacity-50 transition-all gap-2"
              >
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline text-sm">Previous</span>
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages <= 3 ? totalPages : 3, totalPages) }, (_, i) => {
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
                      variant={currentPage === pageNumber ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`h-8 w-8 sm:h-9 sm:w-9 p-0 border-2 font-semibold text-xs sm:text-sm transition-all ${
                        currentPage === pageNumber
                          ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white border-transparent shadow-md'
                          : 'bg-transparent hover:bg-[#1897C6]/10 hover:border-[#1897C6]'
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
                className="h-8 w-8 sm:h-9 sm:w-9 sm:w-auto sm:px-3 p-0 border-2 bg-transparent hover:bg-[#1897C6]/10 hover:border-[#1897C6] disabled:opacity-50 transition-all gap-2"
              >
                <span className="hidden sm:inline text-sm">Next</span>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2 bg-transparent hover:bg-[#1897C6]/10 hover:border-[#1897C6] disabled:opacity-50 transition-all"
              >
                <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Archive Confirmation Dialog */}
      <AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mark Teacher as Inactive?</AlertDialogTitle>
            <AlertDialogDescription>
              This will move the teacher to the inactive list. They will no longer appear in active teachers but their data will be preserved. You can reactivate them anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmArchive}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Mark Inactive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
