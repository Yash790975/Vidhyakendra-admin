'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Search, Plus, MoreHorizontal, Eye, Edit, Archive, Download, Users, Calendar, TrendingUp, BookOpen, Trash2, Phone, Mail, MapPin, User as UserIcon, GraduationCap, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import { Pagination } from '@/components/pagination'
import { StatsCard } from '@/components/stats-card'

const mockStudents = [
  {
    id: '1',
    student_code: 'STD2024001',
    admission_number: 'ADM001',
    full_name: 'Aarav Sharma',
    class: '10',
    section: 'A',
    roll_number: '1',
    date_of_birth: '2008-05-15',
    gender: 'Male',
    blood_group: 'O+',
    father_name: 'Mr. Rajesh Sharma',
    mother_name: 'Mrs. Priya Sharma',
    guardian_name: 'Mr. Rajesh Sharma',
    guardian_mobile: '+91 98765 43210',
    email: 'rajesh.sharma@email.com',
    mobile: '+91 98765 43210',
    current_address: '123 MG Road, Andheri West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400058',
    attendance_percentage: 94.5,
    academic_performance: 'Excellent',
    admission_date: '2023-04-01',
    previous_school: 'ABC School',
    status: 'active',
  },
  {
    id: '2',
    student_code: 'STD2024002',
    admission_number: 'ADM002',
    full_name: 'Ananya Patel',
    class: '10',
    section: 'A',
    roll_number: '2',
    date_of_birth: '2009-08-22',
    gender: 'Female',
    blood_group: 'A+',
    father_name: 'Mr. Amit Patel',
    mother_name: 'Mrs. Priya Patel',
    guardian_name: 'Mrs. Priya Patel',
    guardian_mobile: '+91 98765 43211',
    email: 'priya.patel@email.com',
    mobile: '+91 98765 43211',
    current_address: '456 Hill Road, Bandra West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    attendance_percentage: 96.8,
    academic_performance: 'Excellent',
    admission_date: '2023-04-01',
    previous_school: 'XYZ School',
    status: 'active',
  },
  {
    id: '3',
    student_code: 'STD2024003',
    admission_number: 'ADM003',
    full_name: 'Rohan Kumar',
    class: '9',
    section: 'B',
    roll_number: '5',
    date_of_birth: '2009-03-10',
    gender: 'Male',
    blood_group: 'B+',
    father_name: 'Mr. Vijay Kumar',
    mother_name: 'Mrs. Anjali Kumar',
    guardian_name: 'Mr. Vijay Kumar',
    guardian_mobile: '+91 98765 43212',
    email: 'vijay.kumar@email.com',
    mobile: '+91 98765 43212',
    current_address: '789 Link Road, Malad West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400064',
    attendance_percentage: 89.2,
    academic_performance: 'Good',
    admission_date: '2023-04-15',
    previous_school: null,
    status: 'active',
  },
  {
    id: '4',
    student_code: 'STD2024004',
    admission_number: 'ADM004',
    full_name: 'Priya Singh',
    class: '10',
    section: 'B',
    roll_number: '8',
    date_of_birth: '2008-11-25',
    gender: 'Female',
    blood_group: 'AB+',
    father_name: 'Mr. Rakesh Singh',
    mother_name: 'Mrs. Meena Singh',
    guardian_name: 'Mr. Rakesh Singh',
    guardian_mobile: '+91 98765 43213',
    email: 'rakesh.singh@email.com',
    mobile: '+91 98765 43213',
    current_address: '45 Park Street, Powai, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076',
    attendance_percentage: 92.3,
    academic_performance: 'Excellent',
    admission_date: '2023-04-01',
    previous_school: 'LMN School',
    status: 'active',
  },
  {
    id: '5',
    student_code: 'STD2024005',
    admission_number: 'ADM005',
    full_name: 'Arjun Mehta',
    class: '11',
    section: 'A',
    roll_number: '3',
    date_of_birth: '2007-07-18',
    gender: 'Male',
    blood_group: 'O-',
    father_name: 'Mr. Sanjay Mehta',
    mother_name: 'Mrs. Kavita Mehta',
    guardian_name: 'Mrs. Kavita Mehta',
    guardian_mobile: '+91 98765 43214',
    email: 'sanjay.mehta@email.com',
    mobile: '+91 98765 43214',
    current_address: '67 Marine Drive, Churchgate, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400020',
    attendance_percentage: 97.5,
    academic_performance: 'Excellent',
    admission_date: '2023-04-10',
    previous_school: 'PQR School',
    status: 'active',
  },
  {
    id: '6',
    student_code: 'STD2024006',
    admission_number: 'ADM006',
    full_name: 'Sneha Desai',
    class: '9',
    section: 'A',
    roll_number: '12',
    date_of_birth: '2009-01-30',
    gender: 'Female',
    blood_group: 'A-',
    father_name: 'Mr. Mahesh Desai',
    mother_name: 'Mrs. Sunita Desai',
    guardian_name: 'Mr. Mahesh Desai',
    guardian_mobile: '+91 98765 43215',
    email: 'mahesh.desai@email.com',
    mobile: '+91 98765 43215',
    current_address: '89 Carter Road, Bandra West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    attendance_percentage: 88.7,
    academic_performance: 'Good',
    admission_date: '2023-04-20',
    previous_school: null,
    status: 'active',
  },
  {
    id: '7',
    student_code: 'STD2024007',
    admission_number: 'ADM007',
    full_name: 'Karan Joshi',
    class: '12',
    section: 'C',
    roll_number: '15',
    date_of_birth: '2006-09-05',
    gender: 'Male',
    blood_group: 'B-',
    father_name: 'Mr. Anil Joshi',
    mother_name: 'Mrs. Rekha Joshi',
    guardian_name: 'Mr. Anil Joshi',
    guardian_mobile: '+91 98765 43216',
    email: 'anil.joshi@email.com',
    mobile: '+91 98765 43216',
    current_address: '12 Juhu Lane, Juhu, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400049',
    attendance_percentage: 93.8,
    academic_performance: 'Excellent',
    admission_date: '2023-04-05',
    previous_school: 'STU School',
    status: 'active',
  },
  {
    id: '8',
    student_code: 'STD2024008',
    admission_number: 'ADM008',
    full_name: 'Tanvi Reddy',
    class: '8',
    section: 'A',
    roll_number: '7',
    date_of_birth: '2010-04-12',
    gender: 'Female',
    blood_group: 'O+',
    father_name: 'Mr. Krishna Reddy',
    mother_name: 'Mrs. Lakshmi Reddy',
    guardian_name: 'Mrs. Lakshmi Reddy',
    guardian_mobile: '+91 98765 43217',
    email: 'krishna.reddy@email.com',
    mobile: '+91 98765 43217',
    current_address: '34 Worli Sea Face, Worli, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400018',
    attendance_percentage: 91.4,
    academic_performance: 'Good',
    admission_date: '2023-04-12',
    previous_school: 'VWX School',
    status: 'active',
  },
  {
    id: '9',
    student_code: 'STD2024009',
    admission_number: 'ADM009',
    full_name: 'Ishaan Kapoor',
    class: '10',
    section: 'C',
    roll_number: '20',
    date_of_birth: '2008-12-08',
    gender: 'Male',
    blood_group: 'AB-',
    father_name: 'Mr. Rajiv Kapoor',
    mother_name: 'Mrs. Neha Kapoor',
    guardian_name: 'Mr. Rajiv Kapoor',
    guardian_mobile: '+91 98765 43218',
    email: 'rajiv.kapoor@email.com',
    mobile: '+91 98765 43218',
    current_address: '56 Linking Road, Khar West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400052',
    attendance_percentage: 86.5,
    academic_performance: 'Average',
    admission_date: '2023-04-18',
    previous_school: null,
    status: 'active',
  },
  {
    id: '10',
    student_code: 'STD2024010',
    admission_number: 'ADM010',
    full_name: 'Diya Nair',
    class: '11',
    section: 'B',
    roll_number: '10',
    date_of_birth: '2007-06-22',
    gender: 'Female',
    blood_group: 'A+',
    father_name: 'Mr. Suresh Nair',
    mother_name: 'Mrs. Geetha Nair',
    guardian_name: 'Mrs. Geetha Nair',
    guardian_mobile: '+91 98765 43219',
    email: 'suresh.nair@email.com',
    mobile: '+91 98765 43219',
    current_address: '78 Pedder Road, Malabar Hill, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400026',
    attendance_percentage: 95.2,
    academic_performance: 'Excellent',
    admission_date: '2023-04-08',
    previous_school: 'YZA School',
    status: 'active',
  },
  {
    id: '11',
    student_code: 'STD2024011',
    admission_number: 'ADM011',
    full_name: 'Aditya Shah',
    class: '9',
    section: 'C',
    roll_number: '18',
    date_of_birth: '2009-02-14',
    gender: 'Male',
    blood_group: 'B+',
    father_name: 'Mr. Paresh Shah',
    mother_name: 'Mrs. Nisha Shah',
    guardian_name: 'Mr. Paresh Shah',
    guardian_mobile: '+91 98765 43220',
    email: 'paresh.shah@email.com',
    mobile: '+91 98765 43220',
    current_address: '23 SV Road, Santacruz West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400054',
    attendance_percentage: 90.1,
    academic_performance: 'Good',
    admission_date: '2023-04-22',
    previous_school: null,
    status: 'active',
  },
]

export default function AllStudentsPage() {
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterClass, setFilterClass] = useState('all')
  const [filterSection, setFilterSection] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewStudent, setViewStudent] = useState<typeof mockStudents[0] | null>(null)
  const [rejectStudentId, setRejectStudentId] = useState<string | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Pre-select class from URL parameter
  useEffect(() => {
    const classParam = searchParams?.get('class')
    if (classParam && filterClass === 'all') {
      setFilterClass(classParam)
    }
  }, [searchParams, filterClass])

  const stats = {
    totalActive: 1248,
    presentToday: 1195,
    averageAttendance: 95.8,
    topPerformers: 187,
  }

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.student_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.admission_number.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesClass = filterClass === 'all' || student.class === filterClass
    const matchesSection = filterSection === 'all' || student.section === filterSection
    return matchesSearch && matchesClass && matchesSection
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">All Students</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage and monitor all enrolled students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-initial">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Link href="/dashboard/students/add" className="flex-1 sm:flex-initial">
            <Button className="gap-2 w-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
              <Plus className="h-4 w-4" />
              <span className="sm:inline">Add Student</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Active Students" value={stats.totalActive} icon={Users} trend={{ value: 8.3, isPositive: true }} color="primary" />
        <StatsCard title="Present Today" value={stats.presentToday} icon={Calendar} color="success" />
        <StatsCard title="Average Attendance" value={`${stats.averageAttendance}%`} icon={TrendingUp} color="secondary" />
        <StatsCard title="Top Performers" value={stats.topPerformers} icon={BookOpen} color="accent" />
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <CardTitle className="text-lg sm:text-xl">Students List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search students..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select value={filterClass} onValueChange={setFilterClass}>
                  <SelectTrigger className="flex-1 sm:w-32">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(cls => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
                </Select>
                <Select value={filterSection} onValueChange={setFilterSection}>
                  <SelectTrigger className="flex-1 sm:w-32">
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    {['A', 'B', 'C', 'D'].map(sec => (
                      <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block border-2 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 hover:from-[#1897C6]/5 hover:to-[#67BAC3]/5 border-b-2">
                  <TableHead className="font-semibold text-sm h-14">Student</TableHead>
                  <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Admission No</TableHead>
                  <TableHead className="font-semibold text-sm h-14 hidden lg:table-cell">Class/Section</TableHead>
                  <TableHead className="font-semibold text-sm h-14 hidden lg:table-cell">Roll No</TableHead>
                  <TableHead className="font-semibold text-sm h-14 hidden md:table-cell">Guardian</TableHead>
                  <TableHead className="font-semibold text-sm h-14 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                          <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold">No students found</p>
                          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedStudents.map((student) => (
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
                        <span className="font-mono text-xs sm:text-sm">{student.admission_number}</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="outline" className="text-xs">
                          Class {student.class}-{student.section}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="text-sm">{student.roll_number}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-xs sm:text-sm">
                          <p className="font-medium truncate max-w-[150px]">{student.guardian_name}</p>
                          <p className="text-muted-foreground truncate max-w-[150px]">{student.guardian_mobile}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/dashboard/students/all/${student.id}`}>
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
                              title="Edit Student"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRejectStudentId(student.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Reject Application"
                          >
                            <X className="h-4 w-4" />
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {paginatedStudents.map((student) => (
              <Card key={student.id} className="border-2 hover:border-[#1897C6]/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                        {student.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h3 className="font-semibold text-base leading-tight">{student.full_name}</h3>
                        <p className="text-xs text-muted-foreground">{student.student_code}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Adm: {student.admission_number}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Class {student.class}-{student.section}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Roll: {student.roll_number}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span className="truncate">{student.guardian_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{student.guardian_mobile}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{student.email || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 pt-2">
                        <Link href={`/dashboard/students/all/${student.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/students/add?edit=${student.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRejectStudentId(student.id)}
                          className="h-8 px-2 text-red-600 hover:bg-red-50"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
        </CardContent>
      </Card>

      {/* View Student Dialog */}
      <Dialog open={!!viewStudent} onOpenChange={() => setViewStudent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewStudent && (
            <>
              <DialogHeader className="border-b pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
                    <AvatarFallback className="bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white text-lg sm:text-xl">
                      {viewStudent.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-lg sm:text-xl lg:text-2xl">{viewStudent.full_name}</DialogTitle>
                    <DialogDescription className="mt-1">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <Badge variant="outline" className="text-xs">{viewStudent.student_code}</Badge>
                        <Badge variant="outline" className="text-xs">Class {viewStudent.class}-{viewStudent.section}</Badge>
                        <Badge className={`text-xs ${viewStudent.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                          {viewStudent.status}
                        </Badge>
                      </div>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 sm:space-y-5 py-3 sm:py-4">
                {/* Quick Actions */}
                <Card className="border-2 border-[#1897C6]/20 bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5">
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" />
                        Quick Actions
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {/* Class Allocation */}
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm">Assign Class & Section</Label>
                          <div className="flex gap-2">
                            <Select defaultValue={viewStudent.class}>
                              <SelectTrigger className="flex-1 h-9 sm:h-10">
                                <SelectValue placeholder="Class" />
                              </SelectTrigger>
                              <SelectContent>
                                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(cls => (
                                  <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select defaultValue={viewStudent.section}>
                              <SelectTrigger className="w-20 sm:w-24 h-9 sm:h-10">
                                <SelectValue placeholder="Sec" />
                              </SelectTrigger>
                              <SelectContent>
                                {['A', 'B', 'C', 'D'].map(sec => (
                                  <SelectItem key={sec} value={sec}>Sec {sec}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="space-y-2">
                          <Label className="text-xs sm:text-sm">Student Status</Label>
                          <Select defaultValue={viewStudent.status}>
                            <SelectTrigger className="h-9 sm:h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button 
                        className="w-full h-9 sm:h-10 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]"
                        onClick={() => {
                          console.log('[v0] Updating student class and status')
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4 sm:space-y-5">
                {/* Personal Information */}
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Admission Number</Label>
                        <p className="font-medium">{viewStudent.admission_number}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Roll Number</Label>
                        <p className="font-medium">{viewStudent.roll_number}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Date of Birth</Label>
                        <p className="font-medium" suppressHydrationWarning>
                          {new Date(viewStudent.date_of_birth).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Gender</Label>
                        <p className="font-medium">{viewStudent.gender}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Blood Group</Label>
                        <p className="font-medium">{viewStudent.blood_group}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Admission Date</Label>
                        <p className="font-medium" suppressHydrationWarning>
                          {new Date(viewStudent.admission_date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Guardian Information */}
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Guardian Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Father's Name</Label>
                        <p className="font-medium">{viewStudent.father_name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Mother's Name</Label>
                        <p className="font-medium">{viewStudent.mother_name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Primary Guardian</Label>
                        <p className="font-medium">{viewStudent.guardian_name}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Contact Number</Label>
                        <p className="font-medium flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          {viewStudent.guardian_mobile}
                        </p>
                      </div>
                      <div className="sm:col-span-2">
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <p className="font-medium flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {viewStudent.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-[#D87331]/5 to-[#D88931]/5 pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-sm leading-relaxed">
                      {viewStudent.current_address}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-3 mt-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">City</Label>
                        <p className="font-medium text-sm">{viewStudent.city}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">State</Label>
                        <p className="font-medium text-sm">{viewStudent.state}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Pincode</Label>
                        <p className="font-medium text-sm">{viewStudent.pincode}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Performance */}
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Academic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Attendance</Label>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-2xl font-bold text-[#1897C6]">
                            {viewStudent.attendance_percentage}%
                          </span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3]"
                              style={{ width: `${viewStudent.attendance_percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Performance</Label>
                        <Badge className="mt-1 bg-green-100 text-green-700 border-green-200">
                          {viewStudent.academic_performance}
                        </Badge>
                      </div>
                      {viewStudent.previous_school && (
                        <div className="sm:col-span-2">
                          <Label className="text-xs text-muted-foreground">Previous School</Label>
                          <p className="font-medium">{viewStudent.previous_school}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-2 pt-3 sm:pt-4 border-t">
                <Button variant="outline" className="flex-1" onClick={() => setViewStudent(null)}>
                  Close
                </Button>
                <Link href={`/dashboard/students/add?edit=${viewStudent.id}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Full Details
                  </Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={!!rejectStudentId} onOpenChange={() => setRejectStudentId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Student Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this student's application? This will mark the application as rejected and the student will be notified.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col-reverse sm:flex-row gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setRejectStudentId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={() => {
                console.log('[v0] Rejecting student application:', rejectStudentId)
                setRejectStudentId(null)
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Reject Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
