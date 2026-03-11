'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2, 
  UserPlus, 
  AlertCircle, 
  CheckCircle, 
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Download
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
    full_name: 'Rajesh Kumar Singh',
    email: 'rajesh.kumar@email.com',
    mobile: '+91 98765 43210',
    qualification: 'M.Sc Physics, B.Ed',
    experience_years: 5,
    applied_date: '2024-01-15',
    status: 'pending_verification',
    subjects: ['Physics', 'Mathematics'],
    photo_url: null,
  },
  {
    id: '2',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    mobile: '+91 98765 43211',
    qualification: 'M.A English, B.Ed',
    experience_years: 3,
    applied_date: '2024-01-16',
    status: 'documents_pending',
    subjects: ['English', 'Hindi'],
    photo_url: null,
  },
  {
    id: '3',
    full_name: 'Amit Patel',
    email: 'amit.patel@email.com',
    mobile: '+91 98765 43212',
    qualification: 'M.Sc Chemistry, B.Ed',
    experience_years: 7,
    applied_date: '2024-01-17',
    status: 'approved',
    subjects: ['Chemistry', 'Biology'],
    photo_url: null,
  },
  {
    id: '4',
    full_name: 'Sneha Verma',
    email: 'sneha.verma@email.com',
    mobile: '+91 98765 43213',
    qualification: 'M.A Hindi, B.Ed',
    experience_years: 4,
    applied_date: '2024-01-18',
    status: 'pending_verification',
    subjects: ['Hindi', 'Sanskrit'],
    photo_url: null,
  },
  {
    id: '5',
    full_name: 'Rahul Mishra',
    email: 'rahul.mishra@email.com',
    mobile: '+91 98765 43214',
    qualification: 'M.Com, B.Ed',
    experience_years: 6,
    applied_date: '2024-01-19',
    status: 'documents_pending',
    subjects: ['Commerce', 'Economics'],
    photo_url: null,
  },
]

export default function TeacherOnboardingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const stats = {
    total: 15,
    pending: 8,
    documentsRequired: 5,
    approved: 2,
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      pending_verification: { 
        label: 'Pending Verification', 
        className: 'text-blue-600' 
      },
      documents_pending: { 
        label: 'Documents Pending', 
        className: 'text-amber-600' 
      },
      approved: { 
        label: 'Approved', 
        className: 'text-emerald-600' 
      },
      rejected: { 
        label: 'Rejected', 
        className: 'text-rose-600' 
      },
    }
    return configs[status] || { label: status, className: 'text-slate-600' }
  }

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.mobile.includes(searchQuery)
    
    const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDelete = (id: string) => {
    setSelectedTeacher(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log('[v0] Deleting teacher:', selectedTeacher)
    // Add delete logic here
    setDeleteDialogOpen(false)
    setSelectedTeacher(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
            Teacher Onboarding
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Review and manage new teacher applications</p>
        </div>
        <Link href="/dashboard/teachers/add" className="w-full sm:w-auto">
          <Button className="gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90 shadow-md h-11 px-6 w-full sm:w-auto">
            <Plus className="h-5 w-5" />
            <span>Add New Teacher</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-4">
        <Card className="border-2 hover:border-[#1897C6]/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white shadow-md">
                <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-amber-500/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-orange-500/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-md">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Documents Required</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.documentsRequired}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-green-500/50 transition-all">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-green-400 to-green-500 text-white shadow-md">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-xl sm:text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Applications Table */}
      <Card className="border-2">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <CardTitle className="text-base sm:text-lg">Applications List</CardTitle>
            <Button variant="outline" size="sm" className="w-full sm:w-fit bg-transparent gap-2 h-9">
              <Download className="h-4 w-4" />
              <span className="text-sm">Export</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 sm:h-11 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px] h-10 sm:h-11 text-sm">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending_verification">Pending</SelectItem>
                <SelectItem value="documents_pending">Documents</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                    <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Contact</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden lg:table-cell">Qualification</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden xl:table-cell">Experience</TableHead>
                    <TableHead className="font-semibold text-sm h-14 hidden sm:table-cell">Applied Date</TableHead>
                    <TableHead className="font-semibold text-sm h-14">Status</TableHead>
                    <TableHead className="font-semibold text-sm h-14 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <UserPlus className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-semibold">No applications found</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedTeachers.map((teacher) => {
                      const statusConfig = getStatusConfig(teacher.status)
                      return (
                        <TableRow key={teacher.id} className="hover:bg-gradient-to-r hover:from-[#1897C6]/5 hover:to-transparent transition-all border-b group">
                          <TableCell className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
                                {teacher.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm">{teacher.full_name}</p>
                                <p className="text-xs text-muted-foreground md:hidden truncate">{teacher.email}</p>
                              </div>
                            </div>
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
                          <TableCell className="hidden xl:table-cell py-4">
                            <span className="text-sm font-medium text-foreground">{teacher.experience_years} years</span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell py-4">
                            <span className="text-sm text-muted-foreground">
                              {new Date(teacher.applied_date).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className={`${statusConfig.className} text-xs sm:text-sm font-medium`}>
                              {statusConfig.label}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center justify-end gap-1">
                              <Link href={`/dashboard/teachers/onboarding/${teacher.id}`}>
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
                                  title="Edit Application"
                                >
                                  <Edit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 sm:h-9 sm:w-9 p-0 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="Delete"
                                onClick={() => handleDelete(teacher.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this teacher application? This action cannot be undone and all associated data will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
