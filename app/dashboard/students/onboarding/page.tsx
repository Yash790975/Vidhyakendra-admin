'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Search, Plus, MoreHorizontal, Eye, CheckCircle, XCircle, UserPlus, AlertCircle, Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StatsCard } from '@/components/stats-card'

const mockStudents = [
  {
    id: '1',
    student_code: 'STD001',
    full_name: 'Aarav Sharma',
    class: '10',
    section: 'A',
    date_of_birth: '2008-05-15',
    guardian_name: 'Mr. Rajesh Sharma',
    guardian_mobile: '+91 98765 43210',
    email: 'rajesh.sharma@email.com',
    applied_date: '2024-01-15',
    status: 'pending_verification',
  },
  {
    id: '2',
    student_code: 'STD002',
    full_name: 'Ananya Patel',
    class: '9',
    section: 'B',
    date_of_birth: '2009-08-22',
    guardian_name: 'Mrs. Priya Patel',
    guardian_mobile: '+91 98765 43211',
    email: 'priya.patel@email.com',
    applied_date: '2024-01-16',
    status: 'documents_pending',
  },
  {
    id: '3',
    student_code: 'STD003',
    full_name: 'Vivaan Gupta',
    class: '11',
    section: 'C',
    date_of_birth: '2007-03-10',
    guardian_name: 'Mr. Anil Gupta',
    guardian_mobile: '+91 98765 43212',
    email: 'anil.gupta@email.com',
    applied_date: '2024-01-17',
    status: 'approved',
  },
  {
    id: '4',
    student_code: 'STD004',
    full_name: 'Diya Singh',
    class: '8',
    section: 'A',
    date_of_birth: '2010-11-20',
    guardian_name: 'Mrs. Neha Singh',
    guardian_mobile: '+91 98765 43213',
    email: 'neha.singh@email.com',
    applied_date: '2024-01-18',
    status: 'pending_verification',
  },
  {
    id: '5',
    student_code: 'STD005',
    full_name: 'Arjun Verma',
    class: '12',
    section: 'B',
    date_of_birth: '2006-07-14',
    guardian_name: 'Mr. Suresh Verma',
    guardian_mobile: '+91 98765 43214',
    email: 'suresh.verma@email.com',
    applied_date: '2024-01-19',
    status: 'documents_pending',
  },
  {
    id: '6',
    student_code: 'STD006',
    full_name: 'Saanvi Reddy',
    class: '10',
    section: 'B',
    date_of_birth: '2008-09-25',
    guardian_name: 'Mrs. Lakshmi Reddy',
    guardian_mobile: '+91 98765 43215',
    email: 'lakshmi.reddy@email.com',
    applied_date: '2024-01-20',
    status: 'pending_verification',
  },
  {
    id: '7',
    student_code: 'STD007',
    full_name: 'Ishaan Joshi',
    class: '9',
    section: 'A',
    date_of_birth: '2009-02-18',
    guardian_name: 'Mr. Vikram Joshi',
    guardian_mobile: '+91 98765 43216',
    email: 'vikram.joshi@email.com',
    applied_date: '2024-01-21',
    status: 'approved',
  },
  {
    id: '8',
    student_code: 'STD008',
    full_name: 'Myra Kapoor',
    class: '11',
    section: 'A',
    date_of_birth: '2007-06-30',
    guardian_name: 'Mrs. Priyanka Kapoor',
    guardian_mobile: '+91 98765 43217',
    email: 'priyanka.kapoor@email.com',
    applied_date: '2024-01-22',
    status: 'documents_pending',
  },
  {
    id: '9',
    student_code: 'STD009',
    full_name: 'Reyansh Kumar',
    class: '8',
    section: 'B',
    date_of_birth: '2010-12-05',
    guardian_name: 'Mr. Amit Kumar',
    guardian_mobile: '+91 98765 43218',
    email: 'amit.kumar@email.com',
    applied_date: '2024-01-23',
    status: 'pending_verification',
  },
  {
    id: '10',
    student_code: 'STD010',
    full_name: 'Aanya Mehta',
    class: '10',
    section: 'C',
    date_of_birth: '2008-04-12',
    guardian_name: 'Mrs. Kavita Mehta',
    guardian_mobile: '+91 98765 43219',
    email: 'kavita.mehta@email.com',
    applied_date: '2024-01-24',
    status: 'documents_pending',
  },
  {
    id: '11',
    student_code: 'STD011',
    full_name: 'Vihaan Desai',
    class: '12',
    section: 'A',
    date_of_birth: '2006-08-08',
    guardian_name: 'Mr. Mahesh Desai',
    guardian_mobile: '+91 98765 43220',
    email: 'mahesh.desai@email.com',
    applied_date: '2024-01-25',
    status: 'approved',
  },
]

export default function StudentOnboardingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const stats = {
    total: 24,
    pending: 15,
    documentsRequired: 7,
    readyToApprove: 2,
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending_verification: { label: 'Pending Verification', variant: 'secondary' },
      documents_pending: { label: 'Documents Pending', variant: 'outline' },
      approved: { label: 'Approved', variant: 'default' },
      rejected: { label: 'Rejected', variant: 'destructive' },
    }
    const config = statusConfig[status] || { label: status, variant: 'outline' }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    const matchesClass = classFilter === 'all' || student.class === classFilter
    return matchesSearch && matchesStatus && matchesClass
  })

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Onboarding</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Review and approve new student applications</p>
        </div>
        <Link href="/dashboard/students/add" className="w-full sm:w-auto">
          <Button className="gap-2 w-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
            <Plus className="h-4 w-4" />
            Add New Student
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Applications" value={stats.total} icon={UserPlus} color="primary" />
        <StatsCard title="Pending Verification" value={stats.pending} icon={AlertCircle} color="warning" />
        <StatsCard title="Documents Required" value={stats.documentsRequired} icon={AlertCircle} color="accent" />
        <StatsCard title="Ready to Approve" value={stats.readyToApprove} icon={CheckCircle} color="success" />
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <CardTitle className="text-lg sm:text-xl">Applications List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] border-2">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="8">Class 8</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px] border-2">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending_verification">Pending Verification</SelectItem>
                    <SelectItem value="documents_pending">Documents Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-2 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 hover:from-[#1897C6]/5 hover:to-[#67BAC3]/5 border-b-2">
                    <TableHead className="font-semibold text-sm h-14">Student</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Class/Section</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden lg:table-cell">Date of Birth</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden lg:table-cell">Guardian Details</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Applied Date</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Status</TableHead>
                    <TableHead className="font-semibold text-sm h-14 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                            <AvatarFallback className="bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white text-xs sm:text-sm">
                              {student.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-sm sm:text-base truncate">{student.full_name}</p>
                            <p className="text-xs text-muted-foreground truncate">{student.student_code}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="text-xs">Class {student.class}-{student.section}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{new Date(student.date_of_birth).toLocaleDateString()}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-xs sm:text-sm">
                          <p className="font-medium truncate max-w-[150px]">{student.guardian_name}</p>
                          <p className="text-muted-foreground truncate max-w-[150px]">{student.guardian_mobile}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{new Date(student.applied_date).toLocaleDateString()}</TableCell>
                      <TableCell className="hidden md:table-cell">{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/dashboard/students/onboarding/${student.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/students/add?edit=${student.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              title="Edit Application"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete Application"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 pt-3 sm:pt-4 px-4 sm:px-6 pb-4">
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
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length}
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
