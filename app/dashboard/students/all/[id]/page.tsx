'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, User, Phone, Mail, MapPin, Calendar, Heart, GraduationCap, 
  BookOpen, DollarSign, ClipboardList, Award, TrendingUp, Users, 
  FileText, Clock, CheckCircle, XCircle, AlertCircle, Bus, Briefcase,
  Activity, Target, BarChart3, Download, Printer, CalendarDays, Edit, Plus, Trash2
} from 'lucide-react'

// Mock comprehensive student data
const mockStudentData = {
  id: '1',
  student_code: 'STD2024001',
  admission_number: 'ADM001',
  full_name: 'Aarav Kumar',
  class: '10',
  section: 'A',
  roll_number: '15',
  gender: 'Male',
  date_of_birth: '2008-05-15',
  blood_group: 'O+',
  email: 'aarav.kumar@email.com',
  mobile: '+91 98765 43210',
  father_name: 'Mr. Rajesh Kumar',
  mother_name: 'Mrs. Priya Kumar',
  current_address: '123 Main Street, Andheri East, Mumbai',
  academic_year: '2023-2024',
  
  // Academic Summary
  overall_grade: 'A',
  overall_percentage: 87.5,
  class_rank: 12,
  academic_grade: 5,
  
  // Academic Progress by Quarter
  quarterProgress: [
    { quarter: 'Q1', percentage: 82 },
    { quarter: 'Q2', percentage: 85 },
    { quarter: 'Q3', percentage: 88 },
    { quarter: 'Q4', percentage: 90 },
    { quarter: 'Final', percentage: 87.5 },
  ],
  
  // Subjects with detailed performance
  subjects: [
    { name: 'Mathematics', teacher: 'Mr. Sharma', theory: 92, practical: 95, total: 94, grade: 'A+' },
    { name: 'Science', teacher: 'Mrs. Patel', theory: 88, practical: 90, total: 89, grade: 'A' },
    { name: 'English', teacher: 'Ms. Verma', theory: 85, practical: null, total: 85, grade: 'A' },
    { name: 'Social Studies', teacher: 'Mr. Singh', theory: 90, practical: null, total: 90, grade: 'A+' },
    { name: 'Hindi', teacher: 'Mrs. Gupta', theory: 82, practical: null, total: 82, grade: 'A' },
  ],
  
  // Examination Results
  examinations: [
    {
      id: '1',
      name: 'First Quarterly Examination',
      date: '15 September 2023',
      percentage: 92,
      grade: 'A+',
      rank: 8,
      subjects: [
        { name: 'Mathematics', marks: 95, outOf: 100, grade: 'A+' },
        { name: 'Science', marks: 92, outOf: 100, grade: 'A+' },
        { name: 'English', marks: 88, outOf: 100, grade: 'A' },
        { name: 'Social Studies', marks: 94, outOf: 100, grade: 'A+' },
        { name: 'Hindi', marks: 89, outOf: 100, grade: 'A' },
      ]
    },
    {
      id: '2',
      name: 'Half-Yearly Examination',
      date: '20 December 2023',
      percentage: 88.7,
      grade: 'A',
      rank: 15,
      subjects: [
        { name: 'Mathematics', marks: 90, outOf: 100, grade: 'A+' },
        { name: 'Science', marks: 88, outOf: 100, grade: 'A' },
        { name: 'English', marks: 86, outOf: 100, grade: 'A' },
        { name: 'Social Studies', marks: 92, outOf: 100, grade: 'A+' },
        { name: 'Hindi', marks: 87, outOf: 100, grade: 'A' },
      ]
    },
    {
      id: '3',
      name: 'Third Quarterly Examination',
      date: '15 February 2024',
      percentage: 90.5,
      grade: 'A+',
      rank: 10,
      subjects: [
        { name: 'Mathematics', marks: 93, outOf: 100, grade: 'A+' },
        { name: 'Science', marks: 91, outOf: 100, grade: 'A+' },
        { name: 'English', marks: 87, outOf: 100, grade: 'A' },
        { name: 'Social Studies', marks: 92, outOf: 100, grade: 'A+' },
        { name: 'Hindi', marks: 89, outOf: 100, grade: 'A' },
      ]
    },
    {
      id: '4',
      name: 'Final Examination',
      date: '10 April 2024',
      percentage: 91.8,
      grade: 'A+',
      rank: 7,
      subjects: [
        { name: 'Mathematics', marks: 96, outOf: 100, grade: 'A+' },
        { name: 'Science', marks: 93, outOf: 100, grade: 'A+' },
        { name: 'English', marks: 88, outOf: 100, grade: 'A' },
        { name: 'Social Studies', marks: 94, outOf: 100, grade: 'A+' },
        { name: 'Hindi', marks: 88, outOf: 100, grade: 'A' },
      ]
    },
  ],
  
  // Attendance Data
  attendance: {
    overall_rate: 92,
    present: 55,
    absent: 1,
    late: 3,
    excused: 1,
    total_days: 60,
    
    // Current Academic Year
    yearlyData: {
      year: '2023-2024',
      grade: '10-A',
      total_school_days: 180,
      present: 165,
      absent: 8,
      late: 5,
      excused: 2,
      attendance_rate: 91.7,
    },
    
    // Monthly Breakdown
    monthlyRecords: [
      {
        month: 'January 2024',
        grade: '10-A',
        percentage: 86.4,
        present: 19,
        absent: 1,
        late: 2,
        excused: 0,
        dailyRecords: [
          { date: 'Wed, Jan 31', status: 'present' },
          { date: 'Tue, Jan 30', status: 'present' },
          { date: 'Mon, Jan 29', status: 'present' },
          { date: 'Fri, Jan 26', status: 'present' },
          { date: 'Thu, Jan 25', status: 'late' },
        ]
      },
      {
        month: 'December 2023',
        grade: '10-A',
        percentage: 88.9,
        present: 16,
        absent: 1,
        late: 1,
        excused: 0,
        dailyRecords: []
      },
      {
        month: 'November 2023',
        grade: '10-A',
        percentage: 90.5,
        present: 19,
        absent: 0,
        late: 1,
        excused: 1,
        dailyRecords: []
      },
      {
        month: 'October 2023',
        grade: '10-A',
        percentage: 95.7,
        present: 22,
        absent: 0,
        late: 1,
        excused: 0,
        dailyRecords: []
      },
    ],
  },
  
  // Fee Structure
  fees: {
    academic_years: ['2023-2024', '2022-2023', '2021-2022', '2020-2021', '2019-2020'],
    current_year: '2023-2024',
    total_fee: 371400,
    amount_paid: 338400,
    amount_due: 33000,
    payment_progress: 91,
    successful_payments: 9,
    pending_payments: 1,
    
    overdue_alert: {
      term: 'Term 4 (January-March)',
      year: '2023-2024',
      grade: '10',
      total_amount: 25500,
      balance_due: 25500,
      due_date: '15 January 2025',
      late_fee: 850,
      status: 'overdue',
    },
    
    payment_history: [
      { id: '1', term: 'Term 1', date: '05 April 2023', amount: 92850, status: 'paid', method: 'Online' },
      { id: '2', term: 'Term 2', date: '10 July 2023', amount: 92850, status: 'paid', method: 'Online' },
      { id: '3', term: 'Term 3', date: '15 October 2023', amount: 92850, status: 'paid', method: 'Cheque' },
    ],
    
    fee_structure: [
      { category: 'Tuition Fee', amount: 250000, description: 'Annual tuition charges' },
      { category: 'Development Fee', amount: 50000, description: 'Infrastructure development' },
      { category: 'Library Fee', amount: 15000, description: 'Library and reading material' },
      { category: 'Lab Fee', amount: 25000, description: 'Science and computer labs' },
      { category: 'Sports Fee', amount: 12000, description: 'Sports and extracurricular' },
      { category: 'Transport Fee', amount: 19400, description: 'School bus service' },
    ],
  },
}

export default function StudentDetailPage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string
  
  const [selectedYear, setSelectedYear] = useState(mockStudentData.fees.current_year)
  const [attendanceView, setAttendanceView] = useState<'weekly' | 'monthly' | 'yearly'>('yearly')
  const [feeTab, setFeeTab] = useState('pending')
  const student = mockStudentData
  
  // Student Notice state
  const [showNoticeDialog, setShowNoticeDialog] = useState(false)
  const [noticeText, setNoticeText] = useState("Please clear pending fee dues by 28th February 2024 to avoid late fee charges. Contact the accounts office for any queries.")
  
  // Academic CRUD states
  const [showAddExamDialog, setShowAddExamDialog] = useState(false)
  const [showEditExamDialog, setShowEditExamDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState<any>(null)
  
  // Fee CRUD states
  const [showAddFeeDialog, setShowAddFeeDialog] = useState(false)
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)
  
  // Attendance state
  const [expandedMonths, setExpandedMonths] = useState<string[]>([])

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-3 sm:space-y-4 md:space-y-6 p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="shrink-0 h-9 w-9 sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight truncate">Student Profile</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Complete academic and administrative overview</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download Report</span>
            </Button>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-[#1897C6]/20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={student.full_name} />
                <AvatarFallback className="bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white text-xl sm:text-2xl font-bold">
                  {student.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Student Name</p>
                  <p className="font-semibold text-sm sm:text-base">{student.full_name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Student ID</p>
                  <p className="font-semibold font-mono text-sm sm:text-base">{student.student_code}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Class & Section</p>
                  <Badge variant="outline" className="font-semibold">Class {student.class}-{student.section}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Roll Number</p>
                  <p className="font-semibold text-sm sm:text-base">{student.roll_number}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                  <p className="text-sm">{new Date(student.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Blood Group</p>
                  <p className="text-sm">{student.blood_group}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contact</p>
                  <p className="text-sm">{student.mobile}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm truncate">{student.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="academics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="academics" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Academics</span>
            </TabsTrigger>
            <TabsTrigger value="fees" className="gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Fees</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Attendance</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
          </TabsList>

          {/* Academics Tab */}
          <TabsContent value="academics" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold">Academic Performance</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>

            {/* Academic Summary */}
            <Card className="bg-gradient-to-br from-[#1897C6]/10 to-[#67BAC3]/10 border-2 border-[#1897C6]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#1897C6]" />
                  Student Academic Summary
                  <Badge className="ml-auto bg-[#1897C6]">Overall Performance Record</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 text-white mb-2">
                        <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">{student.overall_grade}</p>
                      <p className="text-xs text-muted-foreground mt-1">Overall Grade</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-cyan-50 border-cyan-200">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-500 text-white mb-2">
                        <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-cyan-600">{student.overall_percentage}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Overall Percentage</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 text-white mb-2">
                        <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-600">#{student.class_rank}</p>
                      <p className="text-xs text-muted-foreground mt-1">Class Rank</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500 text-white mb-2">
                        <Activity className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-600">{student.academic_grade}</p>
                      <p className="text-xs text-muted-foreground mt-1">Academic Grade</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Academic Progress Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#1897C6]" />
                  Academic Progress Trend
                  <Badge variant="outline" className="ml-auto text-green-600 border-green-600">Improving</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-2 h-40">
                  {student.quarterProgress.map((q, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gray-100 rounded-lg overflow-hidden" style={{ height: '120px' }}>
                        <div 
                          className={`w-full ${idx === student.quarterProgress.length - 1 ? 'bg-gradient-to-t from-[#1897C6] to-[#67BAC3]' : 'bg-gray-300'} rounded-t-lg transition-all`}
                          style={{ height: `${q.percentage}%`, marginTop: `${120 - (q.percentage * 1.2)}px` }}
                        />
                      </div>
                      <p className="text-xs font-medium">{q.quarter}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Year Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#1897C6]" />
                  Select Academic Year
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021'].map((year) => (
                    <Card 
                      key={year} 
                      className={`cursor-pointer transition-all ${year === '2024-2025' ? 'bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white border-[#1897C6]' : 'hover:border-[#1897C6]'}`}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="font-bold text-sm sm:text-base">{year}</p>
                        <p className="text-xs mt-1 opacity-80">
                          {year === '2024-2025' ? 'Grade 11' : year === '2023-2024' ? 'Grade 10' : 'Grade 9'}
                        </p>
                        <p className="text-xs mt-1 opacity-80">
                          {year === '2024-2025' ? 'A' : 'A'}: 90.5%
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Examination Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <FileText className="h-5 w-5 text-[#1897C6]" />
                      Examination Results
                      <Badge>{student.examinations.length} Exams</Badge>
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Detailed breakdown of all examination performances</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]"
                    onClick={() => setShowAddExamDialog(true)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Exam</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {student.examinations.map((exam, idx) => {
                  const colors = [
                    { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-500', text: 'text-blue-600' },
                    { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-500', text: 'text-purple-600' },
                    { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-500', text: 'text-green-600' },
                    { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-500', text: 'text-orange-600' },
                  ]
                  const color = colors[idx % colors.length]
                  
                  return (
                    <Card key={exam.id} className={`${color.bg} ${color.border}`}>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${color.icon} flex items-center justify-center text-white shrink-0`}>
                              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-sm sm:text-base truncate">{exam.name}</p>
                              <p className="text-xs text-muted-foreground">Class 10-A • {exam.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                setSelectedExam(exam)
                                setShowEditExamDialog(true)
                              }}
                              title="Edit Exam"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete Exam"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          
                          {/* Scores - Desktop */}
                          <div className="hidden sm:flex items-center gap-2 md:gap-4">
                            <div className="text-center px-3 py-2 bg-white rounded-lg border-2">
                              <p className={`text-xl md:text-2xl font-bold ${color.text}`}>{exam.percentage}%</p>
                              <p className="text-xs text-muted-foreground">Percentage</p>
                            </div>
                            <div className="text-center px-3 py-2 bg-white rounded-lg border-2">
                              <p className={`text-xl md:text-2xl font-bold ${color.text}`}>{exam.grade}</p>
                              <p className="text-xs text-muted-foreground">Grade</p>
                            </div>
                            <div className="text-center px-3 py-2 bg-white rounded-lg border-2">
                              <p className={`text-xl md:text-2xl font-bold ${color.text}`}>#{exam.rank}</p>
                              <p className="text-xs text-muted-foreground">Rank</p>
                            </div>
                          </div>
                          
                          {/* Scores - Mobile */}
                          <div className="flex sm:hidden items-center justify-between gap-2">
                            <div className="flex-1 text-center px-2 py-1.5 bg-white rounded-lg border">
                              <p className={`text-lg font-bold ${color.text}`}>{exam.percentage}%</p>
                              <p className="text-xs text-muted-foreground">%</p>
                            </div>
                            <div className="flex-1 text-center px-2 py-1.5 bg-white rounded-lg border">
                              <p className={`text-lg font-bold ${color.text}`}>{exam.grade}</p>
                              <p className="text-xs text-muted-foreground">Grade</p>
                            </div>
                            <div className="flex-1 text-center px-2 py-1.5 bg-white rounded-lg border">
                              <p className={`text-lg font-bold ${color.text}`}>#{exam.rank}</p>
                              <p className="text-xs text-muted-foreground">Rank</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Subject-wise Breakdown */}
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs font-semibold text-muted-foreground mb-3">SUBJECT-WISE MARKS</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {exam.subjects && exam.subjects.map((subject, subIdx) => (
                              <div key={subIdx} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                                <span className="text-xs sm:text-sm font-medium truncate pr-2">{subject.name}</span>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="text-sm font-bold">{subject.marks}/{subject.outOf}</span>
                                  <Badge variant="outline" className="text-xs">{subject.grade}</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </CardContent>
            </Card>

            {/* Overall Performance Summary */}
            <Card className="border-2 border-[#1897C6]/30 bg-gradient-to-br from-[#1897C6]/5 to-[#67BAC3]/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-[#1897C6]" />
                  Overall Performance
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Cumulative academic achievement across all examinations</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {/* Overall Grade */}
                  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-green-200 shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-3xl font-bold text-white">A</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Grade</p>
                  </div>

                  {/* Overall Percentage */}
                  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-2xl font-bold text-white">88.5%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Percentage</p>
                  </div>

                  {/* Class Rank */}
                  <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-2xl font-bold text-white">#12</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Class Rank</p>
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-[#1897C6]">5</p>
                    <p className="text-xs text-muted-foreground mt-1">Total Subjects</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-green-600">4</p>
                    <p className="text-xs text-muted-foreground mt-1">Exams Completed</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-orange-600">1770</p>
                    <p className="text-xs text-muted-foreground mt-1">Total Marks</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <p className="text-2xl font-bold text-purple-600">2000</p>
                    <p className="text-xs text-muted-foreground mt-1">Maximum Marks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fees Tab */}
          <TabsContent value="fees" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Fee Management</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  <Badge className="bg-[#1897C6] mr-2">Academic Year 2023-2024</Badge>
                  Complete financial overview and payment history
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Payment</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit Structure</span>
                </Button>
              </div>
            </div>

            {/* Student Notice Section */}
            <Card className="border-2 border-orange-300 bg-orange-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Student Notice
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setShowNoticeDialog(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-900 mb-3">
                  <strong>Important:</strong> {noticeText}
                </p>
                <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleString()}</p>
              </CardContent>
            </Card>

            {/* Year Selector */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-[#1897C6]" />
                  <Label className="text-sm font-medium">Academic Year:</Label>
                  <div className="flex flex-wrap gap-2">
                    {student.fees.academic_years.map((year) => (
                      <Badge 
                        key={year}
                        variant={year === selectedYear ? 'default' : 'outline'}
                        className={`cursor-pointer ${year === selectedYear ? 'bg-[#1897C6]' : ''}`}
                        onClick={() => setSelectedYear(year)}
                      >
                        {year}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Fee Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Total Fee Amount</p>
                  </div>
                  <p className="text-2xl font-bold">₹ {student.fees.total_fee.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">Academic year fees</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Amount Paid</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">₹ {student.fees.amount_paid.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{student.fees.successful_payments} successful payments</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Amount Due</p>
                  </div>
                  <p className="text-2xl font-bold text-red-600">₹ {student.fees.amount_due.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{student.fees.pending_payments} pending payment</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Payment Progress</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{student.fees.payment_progress}%</p>
                  <Progress value={student.fees.payment_progress} className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Overdue Alert */}
            {student.fees.overdue_alert && (
              <Card className="border-2 border-red-300 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-900 flex items-center gap-2">
                        ⚠️ Attention: Overdue Payments
                      </p>
                      <p className="text-sm text-red-800 mt-1">
                        You have 1 overdue payment. Please settle immediately to avoid additional late fees and ensure continuous access to all school services.
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-red-200">
                        <span className="text-xs text-muted-foreground">Term 4 (January-March)</span>
                        <span className="font-bold text-red-600">₹{student.fees.overdue_alert.balance_due.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fee Details Tabs */}
            <Card>
              <CardHeader className="border-b">
                <div className="flex gap-2">
                  <Button 
                    variant={feeTab === 'pending' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFeeTab('pending')}
                    className={feeTab === 'pending' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Pending
                  </Button>
                  <Button 
                    variant={feeTab === 'paid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFeeTab('paid')}
                    className={feeTab === 'paid' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Paid
                  </Button>
                  <Button 
                    variant={feeTab === 'structure' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFeeTab('structure')}
                    className={feeTab === 'structure' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Structure
                  </Button>
                  <Button 
                    variant={feeTab === 'history' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setFeeTab('history')}
                    className={feeTab === 'history' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    History
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                {feeTab === 'pending' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Pending & Overdue Payments</h3>
                      <p className="text-sm text-muted-foreground">Review and complete your outstanding payments</p>
                    </div>
                    
                    <Card className="border-2 border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                              <FileText className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-semibold">{student.fees.overdue_alert.term}</p>
                              <p className="text-sm text-muted-foreground">{student.fees.overdue_alert.year} • Grade {student.fees.overdue_alert.grade}</p>
                              <Badge variant="destructive" className="mt-2">Overdue</Badge>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="space-y-2">
                              <div className="bg-white rounded-lg px-3 py-1.5 border">
                                <p className="text-xs text-muted-foreground">Total Amount</p>
                                <p className="font-bold">₹ {student.fees.overdue_alert.total_amount.toLocaleString()}</p>
                              </div>
                              <div className="bg-white rounded-lg px-3 py-1.5 border border-red-200">
                                <p className="text-xs text-muted-foreground">Balance Due</p>
                                <p className="font-bold text-red-600">₹ {student.fees.overdue_alert.balance_due.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Payment Due Date</p>
                              <p className="text-sm text-muted-foreground">{student.fees.overdue_alert.due_date}</p>
                            </div>
                            <Badge variant="destructive" className="ml-2">+₹{student.fees.overdue_alert.late_fee} Late Fee</Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-900">
                            <strong>Important Note:</strong> Payment overdue. Please pay immediately.
                          </p>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button className="flex-1 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                            <DollarSign className="h-4 w-4 mr-2" />
                            Pay Now
                          </Button>
                          <Button variant="outline">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {feeTab === 'paid' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Payment History</h3>
                      <p className="text-sm text-muted-foreground">{student.fees.payment_history.length} transactions</p>
                    </div>
                    {student.fees.payment_history.map((payment) => (
                      <Card key={payment.id} className="border-2 border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <p className="font-semibold">{payment.term}</p>
                                <p className="text-sm text-muted-foreground">{payment.date} • {payment.method}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-600">₹ {payment.amount.toLocaleString()}</p>
                                <Badge className="bg-green-600 mt-1">Paid</Badge>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Receipt">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" title="Delete">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {feeTab === 'structure' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Fee Structure Breakdown</h3>
                      <Button size="sm" className="gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                        <Plus className="h-4 w-4" />
                        Add Fee Item
                      </Button>
                    </div>
                    {student.fees.fee_structure.map((item, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1">
                              <p className="font-semibold">{item.category}</p>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="text-lg font-bold">₹ {item.amount.toLocaleString()}</p>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" title="Delete">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Separator />
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#1897C6]/10 to-[#67BAC3]/10 rounded-lg border-2 border-[#1897C6]/30">
                      <p className="font-bold text-lg">Total Annual Fee</p>
                      <p className="text-2xl font-bold text-[#1897C6]">₹ {student.fees.total_fee.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Attendance Records</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  <Badge className="bg-[#1897C6] mr-2">Academic Year 2023-2024</Badge>
                  Track your school attendance with detailed insights
                </p>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <Card className="border-2 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">Overall Rate</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">{student.attendance.overall_rate}%</p>
                  <Progress value={student.attendance.overall_rate} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">{student.attendance.present} of {student.attendance.total_days} days</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-green-500 flex items-center justify-center text-white mb-2">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{student.attendance.present}</p>
                  <p className="text-xs text-muted-foreground mt-1">92% attendance</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-red-500 flex items-center justify-center text-white mb-2">
                    <XCircle className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">{student.attendance.absent}</p>
                  <p className="text-xs text-muted-foreground mt-1">1 excused absences</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white mb-2">
                    <Clock className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{student.attendance.late}</p>
                  <p className="text-xs text-muted-foreground mt-1">Late arrivals recorded</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-sky-200 bg-sky-50">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-sky-500 flex items-center justify-center text-white mb-2">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <p className="text-2xl font-bold text-sky-600">{student.attendance.excused}</p>
                  <p className="text-xs text-muted-foreground mt-1">Approved absences</p>
                </CardContent>
              </Card>
            </div>

            {/* View Selector */}
            <div className="flex gap-2">
              <Button 
                variant={attendanceView === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAttendanceView('weekly')}
                className={attendanceView === 'weekly' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
              >
                Weekly
              </Button>
              <Button 
                variant={attendanceView === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAttendanceView('monthly')}
                className={attendanceView === 'monthly' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
              >
                Monthly
              </Button>
              <Button 
                variant={attendanceView === 'yearly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAttendanceView('yearly')}
                className={attendanceView === 'yearly' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
              >
                Yearly
              </Button>
            </div>

            {/* Yearly Summary */}
            {attendanceView === 'yearly' && (
              <>
                <Card className="bg-gradient-to-br from-[#1897C6]/10 to-[#67BAC3]/10 border-2 border-[#1897C6]/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold flex flex-wrap items-center gap-2">
                          <CalendarDays className="h-5 w-5 text-[#1897C6]" />
                          Academic Year {student.attendance.yearlyData.year}
                          <Badge className="bg-[#1897C6]">Current Year</Badge>
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Grade {student.attendance.yearlyData.grade} • {student.attendance.yearlyData.total_school_days} School Days
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          April 1, 2023 - March 31, 2024
                        </p>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-4xl font-bold text-[#1897C6]">{student.attendance.yearlyData.attendance_rate}%</p>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1 justify-center sm:justify-end">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                          Overall Rate
                        </p>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="text-sm text-muted-foreground mb-3">
                      All statistics below are for Academic Year 2023-2024 • Class Grade 10-A
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
                      <Card className="border-2">
                        <CardContent className="p-2 sm:p-3 text-center">
                          <div className="w-8 h-8 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <p className="text-xl sm:text-2xl font-bold">{student.attendance.yearlyData.total_school_days}</p>
                          <p className="text-xs text-muted-foreground mt-1">Total Days</p>
                          <p className="text-xs text-muted-foreground">School days</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-green-50 border-2 border-green-200">
                        <CardContent className="p-2 sm:p-3 text-center">
                          <div className="w-8 h-8 mx-auto rounded-lg bg-green-100 flex items-center justify-center mb-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <p className="text-xl sm:text-2xl font-bold text-green-600">{student.attendance.yearlyData.present}</p>
                          <p className="text-xs text-muted-foreground mt-1">Present</p>
                          <p className="text-xs text-muted-foreground">Days present</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-red-50 border-2 border-red-200">
                        <CardContent className="p-2 sm:p-3 text-center">
                          <div className="w-8 h-8 mx-auto rounded-lg bg-red-100 flex items-center justify-center mb-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </div>
                          <p className="text-xl sm:text-2xl font-bold text-red-600">{student.attendance.yearlyData.absent}</p>
                          <p className="text-xs text-muted-foreground mt-1">Absent</p>
                          <p className="text-xs text-muted-foreground">Days missed</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-orange-50 border-2 border-orange-200">
                        <CardContent className="p-2 sm:p-3 text-center">
                          <div className="w-8 h-8 mx-auto rounded-lg bg-orange-100 flex items-center justify-center mb-2">
                            <Clock className="h-4 w-4 text-orange-600" />
                          </div>
                          <p className="text-xl sm:text-2xl font-bold text-orange-600">{student.attendance.yearlyData.late}</p>
                          <p className="text-xs text-muted-foreground mt-1">Late</p>
                          <p className="text-xs text-muted-foreground">Late arrivals</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-sky-50 border-2 border-sky-200">
                        <CardContent className="p-2 sm:p-3 text-center">
                          <div className="w-8 h-8 mx-auto rounded-lg bg-sky-100 flex items-center justify-center mb-2">
                            <AlertCircle className="h-4 w-4 text-sky-600" />
                          </div>
                          <p className="text-xl sm:text-2xl font-bold text-sky-600">{student.attendance.yearlyData.excused || 2}</p>
                          <p className="text-xs text-muted-foreground mt-1">Excused</p>
                          <p className="text-xs text-muted-foreground">Approved</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Attendance Progress</p>
                        <p className="text-sm font-bold">{student.attendance.yearlyData.present}/{student.attendance.yearlyData.total_school_days} days</p>
                      </div>
                      <Progress 
                        value={(student.attendance.yearlyData.present / student.attendance.yearlyData.total_school_days) * 100} 
                        className="h-3"
                      />
                      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Attendance Insights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center shrink-0">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-green-900 text-sm sm:text-base">Attendance Rate</p>
                          <p className="text-xs sm:text-sm text-green-700 mt-1">Excellent attendance record! Keep it up.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900 text-sm sm:text-base">Improvement Areas</p>
                          <p className="text-xs sm:text-sm text-blue-700 mt-1">Maintain this excellent attendance pattern throughout the year.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Hide/Show Detailed Breakdown Toggle */}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setExpandedMonths([])}
                  >
                    <Download className="h-4 w-4" />
                    {expandedMonths.length > 0 ? 'Hide' : 'Show'} Detailed Breakdown
                  </Button>
                </div>
              </>
            )}
            
            {attendanceView === 'monthly' && (
              <>
                {/* Attendance Status Guide */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg">Attendance Status Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <Card className="border-2 border-green-200 bg-green-50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <p className="font-semibold text-green-900">Present</p>
                          </div>
                          <p className="text-xs text-green-700">Attended class on time and stayed for the full duration.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-orange-200 bg-orange-50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-white" />
                            </div>
                            <p className="font-semibold text-orange-900">Late</p>
                          </div>
                          <p className="text-xs text-orange-700">Arrived after class started but attended afterwards.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-red-200 bg-red-50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                              <XCircle className="h-4 w-4 text-white" />
                            </div>
                            <p className="font-semibold text-red-900">Absent</p>
                          </div>
                          <p className="text-xs text-red-700">Did not attend class without prior approval.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-2 border-sky-200 bg-sky-50">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center">
                              <AlertCircle className="h-4 w-4 text-white" />
                            </div>
                            <p className="font-semibold text-sky-900">Excused</p>
                          </div>
                          <p className="text-xs text-sky-700">Absence approved by school administration.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Breakdown */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-[#1897C6]" />
                      <CardTitle className="text-base sm:text-lg">Monthly Attendance Breakdown</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {student.attendance.monthlyRecords.map((record, idx) => {
                      const isExpanded = expandedMonths.includes(record.month)
                      
                      return (
                        <Card key={idx} className="border-2">
                          <CardContent className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <div>
                                <p className="font-bold text-base sm:text-lg">{record.month}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">Grade {record.grade}</p>
                              </div>
                              <div className="text-left sm:text-right">
                                <p className="text-2xl sm:text-3xl font-bold text-[#1897C6]">{record.percentage}%</p>
                                <p className="text-xs text-muted-foreground">{record.present}/{record.present + record.absent + record.late + record.excused} days</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
                              <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-lg sm:text-xl font-bold text-green-600">{record.present}</p>
                                <p className="text-xs text-muted-foreground">Present</p>
                              </div>
                              <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
                                <p className="text-lg sm:text-xl font-bold text-red-600">{record.absent}</p>
                                <p className="text-xs text-muted-foreground">Absent</p>
                              </div>
                              <div className="text-center p-2 bg-orange-50 rounded-lg border border-orange-200">
                                <p className="text-lg sm:text-xl font-bold text-orange-600">{record.late}</p>
                                <p className="text-xs text-muted-foreground">Late</p>
                              </div>
                              <div className="text-center p-2 bg-sky-50 rounded-lg border border-sky-200">
                                <p className="text-lg sm:text-xl font-bold text-sky-600">{record.excused}</p>
                                <p className="text-xs text-muted-foreground">Excused</p>
                              </div>
                            </div>

                            {record.dailyRecords && record.dailyRecords.length > 0 && (
                              <>
                                <div className="mt-4 pt-4 border-t">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="w-full gap-2 text-[#1897C6]"
                                    onClick={() => {
                                      setExpandedMonths(prev => 
                                        isExpanded 
                                          ? prev.filter(m => m !== record.month)
                                          : [...prev, record.month]
                                      )
                                    }}
                                  >
                                    {isExpanded ? (
                                      <>
                                        <Download className="h-4 w-4 rotate-180" />
                                        Hide Details
                                      </>
                                    ) : (
                                      <>
                                        <Download className="h-4 w-4" />
                                        View Daily Records
                                      </>
                                    )}
                                  </Button>
                                </div>
                                
                                {isExpanded && (
                                  <div className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {record.dailyRecords.map((day, dayIdx) => (
                                      <div 
                                        key={dayIdx} 
                                        className="flex items-center justify-between p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                                      >
                                        <div className="flex items-center gap-2">
                                          {day.status === 'present' && <CheckCircle className="h-4 w-4 text-green-600" />}
                                          {day.status === 'absent' && <XCircle className="h-4 w-4 text-red-600" />}
                                          {day.status === 'late' && <Clock className="h-4 w-4 text-orange-600" />}
                                          {day.status === 'excused' && <AlertCircle className="h-4 w-4 text-sky-600" />}
                                          <span className="text-sm font-medium">{day.day}</span>
                                        </div>
                                        <Badge 
                                          variant={day.status === 'present' ? 'default' : 'secondary'}
                                          className={`
                                            ${day.status === 'present' ? 'bg-green-600' : ''}
                                            ${day.status === 'absent' ? 'bg-red-600' : ''}
                                            ${day.status === 'late' ? 'bg-orange-600' : ''}
                                            ${day.status === 'excused' ? 'bg-sky-600' : ''}
                                          `}
                                        >
                                          {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Complete Student Profile</h2>
            
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-[#1897C6]" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoItem label="Full Name" value={student.full_name} />
                  <InfoItem label="Student Code" value={student.student_code} />
                  <InfoItem label="Admission Number" value={student.admission_number} />
                  <InfoItem label="Date of Birth" value={new Date(student.date_of_birth).toLocaleDateString()} />
                  <InfoItem label="Gender" value={student.gender} />
                  <InfoItem label="Blood Group" value={student.blood_group} />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#1897C6]" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoItem label="Email" value={student.email} icon={Mail} />
                  <InfoItem label="Mobile" value={student.mobile} icon={Phone} />
                  <InfoItem label="Address" value={student.current_address} icon={MapPin} />
                </CardContent>
              </Card>

              {/* Guardian Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#1897C6]" />
                    Guardian Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoItem label="Father's Name" value={student.father_name} />
                  <InfoItem label="Mother's Name" value={student.mother_name} />
                </CardContent>
              </Card>

              {/* Academic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[#1897C6]" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoItem label="Class" value={`${student.class}-${student.section}`} />
                  <InfoItem label="Roll Number" value={student.roll_number} />
                  <InfoItem label="Academic Year" value={student.academic_year} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Student Notice Dialog */}
      <Dialog open={showNoticeDialog} onOpenChange={setShowNoticeDialog}>
        <DialogContent className="max-w-full sm:max-w-md mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Student Notice</DialogTitle>
            <DialogDescription>
              Update the notice message for this student regarding fees or other important information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="notice">Notice Message</Label>
              <Textarea
                id="notice"
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                placeholder="Enter notice message..."
                rows={5}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNoticeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNoticeDialog(false)} className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
              Save Notice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Exam Dialog */}
      <Dialog open={showAddExamDialog} onOpenChange={setShowAddExamDialog}>
        <DialogContent className="max-w-full sm:max-w-2xl mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Add New Examination</DialogTitle>
            <DialogDescription>
              Enter examination details and subject-wise marks for the student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exam-name">Examination Name</Label>
                <Input id="exam-name" placeholder="e.g., Mid-Term Examination" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="exam-date">Examination Date</Label>
                <Input id="exam-date" type="date" className="mt-2" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="percentage">Percentage</Label>
                <Input id="percentage" type="number" step="0.01" placeholder="85.5" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" placeholder="A" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="rank">Class Rank</Label>
                <Input id="rank" type="number" placeholder="12" className="mt-2" />
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Subject-wise Marks</h4>
              <div className="space-y-3">
                {['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'].map((subject) => (
                  <div key={subject} className="grid grid-cols-4 gap-2 items-center">
                    <Label className="col-span-1">{subject}</Label>
                    <Input type="number" placeholder="Marks" className="col-span-1" />
                    <Input type="number" placeholder="Out of" defaultValue="100" className="col-span-1" />
                    <Input placeholder="Grade" className="col-span-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExamDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddExamDialog(false)} className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
              Add Examination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Exam Dialog */}
      <Dialog open={showEditExamDialog} onOpenChange={setShowEditExamDialog}>
        <DialogContent className="max-w-full sm:max-w-2xl mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Examination</DialogTitle>
            <DialogDescription>
              Update examination details and subject-wise marks.
            </DialogDescription>
          </DialogHeader>
          {selectedExam && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-exam-name">Examination Name</Label>
                  <Input id="edit-exam-name" defaultValue={selectedExam.name} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-exam-date">Examination Date</Label>
                  <Input id="edit-exam-date" defaultValue={selectedExam.date} className="mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-percentage">Percentage</Label>
                  <Input id="edit-percentage" type="number" defaultValue={selectedExam.percentage} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-grade">Grade</Label>
                  <Input id="edit-grade" defaultValue={selectedExam.grade} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-rank">Class Rank</Label>
                  <Input id="edit-rank" type="number" defaultValue={selectedExam.rank} className="mt-2" />
                </div>
              </div>
              {selectedExam.subjects && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Subject-wise Marks</h4>
                  <div className="space-y-3">
                    {selectedExam.subjects.map((subject: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-4 gap-2 items-center">
                        <Label className="col-span-1">{subject.name}</Label>
                        <Input type="number" defaultValue={subject.marks} className="col-span-1" />
                        <Input type="number" defaultValue={subject.outOf} className="col-span-1" />
                        <Input defaultValue={subject.grade} className="col-span-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditExamDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowEditExamDialog(false)} className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper Component
function InfoItem({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2 mt-1">
        {Icon && <Icon className="h-4 w-4 text-[#1897C6] shrink-0" />}
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
