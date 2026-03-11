'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertCircle,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  Save,
  BookOpen,
  Calendar,
  Award,
  IndianRupee,
  UserCheck,
  IdCard,
  Plus,
  Trash2,
  School,
  Users,
  BookMarked
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock data - replace with API call
const mockTeacherData = {
  id: '1',
  full_name: 'Rajesh Kumar Singh',
  email: 'rajesh.kumar@email.com',
  mobile: '+91 98765 43210',
  date_of_birth: '1990-05-15',
  gender: 'male',
  blood_group: 'O+',
  marital_status: 'married',
  spouse_name: 'Anjali Singh',
  father_name: 'Ram Kumar Singh',
  mother_name: 'Savita Devi',
  nationality: 'Indian',
  religion: 'Hindu',
  category: 'General',
  emergency_contact: {
    name: 'Ram Kumar Singh',
    relation: 'Father',
    mobile: '+91 98765 43212'
  },
  address: {
    permanent_address: '123 MG Road, Sector 15',
    permanent_city: 'Mumbai',
    permanent_state: 'Maharashtra',
    permanent_pincode: '400001',
  },
  identity_documents: [
    { type: 'aadhaar_card', number: 'XXXX-XXXX-1234', verified: true, file_url: '/documents/aadhaar.pdf' },
    { type: 'pan_card', number: 'ABCDE1234F', verified: true, file_url: '/documents/pan.pdf' },
    { type: 'photo', number: '', verified: true, file_url: '/photo.jpg' },
    { type: 'passport', number: 'Z1234567', verified: false, file_url: '/documents/passport.pdf' },
  ],
  qualifications: [
    {
      degree: 'M.Sc Physics',
      board_university: 'Mumbai University',
      year_of_passing: 2015,
      percentage_cgpa: '85%',
    },
    {
      degree: 'B.Ed',
      board_university: 'SNDT University',
      year_of_passing: 2016,
      percentage_cgpa: '8.5 CGPA',
    },
  ],
  experience: [
    {
      school_name: 'ABC High School',
      designation: 'Physics Teacher',
      from_date: '2016-06-01',
      to_date: '2020-05-31',
      duration: '4 years',
    },
    {
      school_name: 'XYZ International School',
      designation: 'Senior Physics Teacher',
      from_date: '2020-06-01',
      to_date: '2023-12-31',
      duration: '3.5 years',
    },
  ],
  bank_details: {
    bank_name: 'HDFC Bank',
    account_number: 'XXXX-XXXX-1234',
    ifsc_code: 'HDFC0001234',
    branch_name: 'Mumbai Main Branch',
  },
  status: 'pending_verification',
  applied_date: '2024-01-15',
}

const classesData = [
  { standard: '9', sections: ['A', 'B', 'C'] },
  { standard: '10', sections: ['A', 'B', 'C'] },
  { standard: '11', sections: ['A', 'B'] },
  { standard: '12', sections: ['A', 'B'] },
]

const subjectsData = ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'English', 'Hindi']

type SubjectTeachingAllocation = {
  subject: string
  classes: Array<{ standard: string; section: string }>
}

export default function TeacherViewPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [activateDialogOpen, setActivateDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  // Class Teacher Assignment states
  const [isClassTeacher, setIsClassTeacher] = useState(false)
  const [classTeacherClass, setClassTeacherClass] = useState('')
  const [classTeacherSection, setClassTeacherSection] = useState('')
  const [classTeacherSubjects, setClassTeacherSubjects] = useState<string[]>([])

  // Subject Teaching states
  const [subjectAllocations, setSubjectAllocations] = useState<SubjectTeachingAllocation[]>([])

  // Salary structure states
  const [salaryType, setSalaryType] = useState('fixed_monthly')
  const [basicSalary, setBasicSalary] = useState('')
  const [hra, setHra] = useState('')
  const [da, setDa] = useState('')
  const [conveyanceAllowance, setConveyanceAllowance] = useState('')
  const [medicalAllowance, setMedicalAllowance] = useState('')
  const [perLectureRate, setPerLectureRate] = useState('')
  const [maxLectures, setMaxLectures] = useState('')
  const [pfApplicable, setPfApplicable] = useState(false)
  const [pfPercentage, setPfPercentage] = useState('')
  const [tdsApplicable, setTdsApplicable] = useState(false)
  const [tdsPercentage, setTdsPercentage] = useState('')
  
  // Activation states
  const [teacherCode, setTeacherCode] = useState('')
  const [joiningDate, setJoiningDate] = useState('')
  const [employmentType, setEmploymentType] = useState('full_time')

  const handleActivate = () => {
    console.log('[v0] Activating teacher with allocations:', {
      isClassTeacher,
      classTeacherClass,
      classTeacherSection,
      classTeacherSubjects,
      subjectAllocations,
      salaryType,
      basicSalary,
      hra,
      da,
      teacherCode,
      joiningDate,
      employmentType,
    })
    setActivateDialogOpen(false)
    // Add activation logic here
  }

  const handleReject = () => {
    console.log('[v0] Rejecting teacher application:', rejectionReason)
    setRejectDialogOpen(false)
    // Add rejection logic here
  }

  const addSubjectAllocation = () => {
    setSubjectAllocations([
      ...subjectAllocations,
      { subject: '', classes: [] }
    ])
  }

  const removeSubjectAllocation = (index: number) => {
    const updated = [...subjectAllocations]
    updated.splice(index, 1)
    setSubjectAllocations(updated)
  }

  const updateSubjectAllocation = (index: number, subject: string) => {
    const updated = [...subjectAllocations]
    updated[index].subject = subject
    setSubjectAllocations(updated)
  }

  const toggleClassForSubject = (subjectIndex: number, standard: string, section: string) => {
    const updated = [...subjectAllocations]
    const existingIndex = updated[subjectIndex].classes.findIndex(
      c => c.standard === standard && c.section === section
    )
    
    if (existingIndex === -1) {
      updated[subjectIndex].classes.push({ standard, section })
    } else {
      updated[subjectIndex].classes.splice(existingIndex, 1)
    }
    setSubjectAllocations(updated)
  }

  const isClassSelected = (subjectIndex: number, standard: string, section: string) => {
    return subjectAllocations[subjectIndex]?.classes.some(
      c => c.standard === standard && c.section === section
    )
  }

  const calculateTotalSalary = () => {
    if (salaryType === 'fixed_monthly') {
      return (
        parseFloat(basicSalary || '0') +
        parseFloat(hra || '0') +
        parseFloat(da || '0') +
        parseFloat(conveyanceAllowance || '0') +
        parseFloat(medicalAllowance || '0')
      ).toFixed(2)
    } else if (salaryType === 'per_lecture') {
      return (parseFloat(perLectureRate || '0') * parseFloat(maxLectures || '0')).toFixed(2)
    }
    return '0.00'
  }

  const calculateDeductions = () => {
    const gross = parseFloat(calculateTotalSalary())
    let deductions = 0
    
    if (pfApplicable && pfPercentage) {
      deductions += (gross * parseFloat(pfPercentage)) / 100
    }
    if (tdsApplicable && tdsPercentage) {
      deductions += (gross * parseFloat(tdsPercentage)) / 100
    }
    
    return deductions.toFixed(2)
  }

  const calculateNetSalary = () => {
    return (parseFloat(calculateTotalSalary()) - parseFloat(calculateDeductions())).toFixed(2)
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/teachers/onboarding">
            <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
              Teacher Application Review
            </h1>
            <p className="text-muted-foreground mt-1 text-xs sm:text-sm">Review and activate teacher profile</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setRejectDialogOpen(true)}
            className="flex-1 sm:flex-none gap-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white h-10"
          >
            <XCircle className="h-4 w-4" />
            <span className="text-sm">Reject</span>
          </Button>
          <Button
            onClick={() => setActivateDialogOpen(true)}
            className="flex-1 sm:flex-none gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md h-10"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm">Activate</span>
          </Button>
        </div>
      </div>

      {/* Teacher Info Card */}
      <Card className="border-2 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white font-bold text-2xl sm:text-3xl shadow-lg">
              {mockTeacherData.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div className="flex-1 space-y-3 w-full">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">{mockTeacherData.full_name}</h2>
                <Badge className="mt-2 bg-blue-50 text-blue-700 border-2 border-blue-200">
                  {mockTeacherData.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Mail className="h-4 w-4 text-[#1897C6] shrink-0" />
                  <span className="text-muted-foreground truncate">{mockTeacherData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Phone className="h-4 w-4 text-[#1897C6] shrink-0" />
                  <span className="text-muted-foreground">{mockTeacherData.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 text-[#1897C6] shrink-0" />
                  <span className="text-muted-foreground">Applied: {new Date(mockTeacherData.applied_date).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1897C6] data-[state=active]:to-[#67BAC3] data-[state=active]:text-white text-xs sm:text-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="allocations" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1897C6] data-[state=active]:to-[#67BAC3] data-[state=active]:text-white text-xs sm:text-sm"
          >
            Class Allocation
          </TabsTrigger>
          <TabsTrigger 
            value="salary" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1897C6] data-[state=active]:to-[#67BAC3] data-[state=active]:text-white text-xs sm:text-sm"
          >
            Salary Structure
          </TabsTrigger>
          <TabsTrigger 
            value="activation" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1897C6] data-[state=active]:to-[#67BAC3] data-[state=active]:text-white text-xs sm:text-sm"
          >
            Activation
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Personal Information */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Personal Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Date of Birth</Label>
                    <p className="font-medium text-sm sm:text-base">{new Date(mockTeacherData.date_of_birth).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Gender</Label>
                    <p className="font-medium text-sm sm:text-base capitalize">{mockTeacherData.gender}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Blood Group</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.blood_group}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Marital Status</Label>
                    <p className="font-medium text-sm sm:text-base capitalize">{mockTeacherData.marital_status}</p>
                  </div>
                  {mockTeacherData.spouse_name && (
                    <div>
                      <Label className="text-xs sm:text-sm text-muted-foreground">Spouse Name</Label>
                      <p className="font-medium text-sm sm:text-base">{mockTeacherData.spouse_name}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Father's Name</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.father_name}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Mother's Name</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.mother_name}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Nationality</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.nationality}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Religion</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.religion}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Category</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.category}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Address</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Address</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.address.permanent_address}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">City</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.address.permanent_city}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">State</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.address.permanent_state}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Pincode</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.address.permanent_pincode}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Identity Documents */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white">
                    <IdCard className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Identity Documents</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                {mockTeacherData.identity_documents.map((doc, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-muted/50 border">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-[#F1AF37] shrink-0" />
                        <p className="font-medium text-sm capitalize">{doc.type.replace('_', ' ')}</p>
                      </div>
                      {doc.number && (
                        <p className="text-xs sm:text-sm text-muted-foreground ml-6">{doc.number}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-6 sm:ml-0">
                      <Badge className={doc.verified ? "bg-emerald-50 text-emerald-700 border-emerald-200 text-xs" : "bg-amber-50 text-amber-700 border-amber-200 text-xs"}>
                        {doc.verified ? 'Verified' : 'Pending'}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-7 px-2 text-xs text-[#1897C6] hover:bg-[#1897C6]/10"
                        onClick={() => window.open(doc.file_url, '_blank')}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-red-500/5 to-red-600/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Emergency Contact</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Name</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.emergency_contact.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Relation</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.emergency_contact.relation}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Mobile</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.emergency_contact.mobile}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card className="border-2">
              <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg">Bank Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Bank Name</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.bank_details.bank_name}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Account Number</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.bank_details.account_number}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">IFSC Code</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.bank_details.ifsc_code}</p>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm text-muted-foreground">Branch</Label>
                    <p className="font-medium text-sm sm:text-base">{mockTeacherData.bank_details.branch_name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Qualifications */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <CardTitle className="text-base sm:text-lg">Educational Qualifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {mockTeacherData.qualifications.map((qual, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4 space-y-2">
                      <h4 className="font-semibold text-base sm:text-lg">{qual.degree}</h4>
                      <div className="space-y-1 text-xs sm:text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium">University:</span> {qual.board_university}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Year:</span> {qual.year_of_passing}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Score:</span> {qual.percentage_cgpa}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-2">
            <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <CardTitle className="text-base sm:text-lg">Work Experience</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {mockTeacherData.experience.map((exp, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-base sm:text-lg">{exp.designation}</h4>
                          <p className="text-sm text-muted-foreground">{exp.school_name}</p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span>{new Date(exp.from_date).toLocaleDateString('en-IN')} - {new Date(exp.to_date).toLocaleDateString('en-IN')}</span>
                            <Badge variant="outline" className="text-xs">{exp.duration}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Allocation Tab */}
        <TabsContent value="allocations" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <div className="space-y-6">
            {/* Class Teacher Assignment */}
            <Card className="border-2 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white shadow-sm">
                      <School className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">Class Teacher Assignment</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">Assign as class teacher with teaching subjects</p>
                    </div>
                  </div>
                  <Checkbox 
                    checked={isClassTeacher}
                    onCheckedChange={(checked) => setIsClassTeacher(checked as boolean)}
                    className="h-5 w-5"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {isClassTeacher && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Class <span className="text-red-500">*</span></Label>
                        <Select value={classTeacherClass} onValueChange={setClassTeacherClass}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classesData.map((cls) => (
                              <SelectItem key={cls.standard} value={cls.standard}>
                                Class {cls.standard}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Section <span className="text-red-500">*</span></Label>
                        <Select 
                          value={classTeacherSection} 
                          onValueChange={setClassTeacherSection}
                          disabled={!classTeacherClass}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            {classTeacherClass && classesData
                              .find((cls) => cls.standard === classTeacherClass)
                              ?.sections.map((section) => (
                                <SelectItem key={section} value={section}>
                                  Section {section}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {classTeacherClass && classTeacherSection && (
                      <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 border-2 border-[#1897C6]/20">
                        <div className="flex items-center gap-2">
                          <BookMarked className="h-5 w-5 text-[#1897C6]" />
                          <Label className="text-sm font-semibold">Subjects Teaching (As Class Teacher)</Label>
                        </div>
                        <p className="text-xs text-muted-foreground">Select subjects that this class teacher will teach in Class {classTeacherClass}{classTeacherSection}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                          {subjectsData.map((subject) => (
                            <div key={subject} className="flex items-center space-x-2 p-2 rounded-md bg-white border">
                              <Checkbox
                                id={`class-teacher-${subject}`}
                                checked={classTeacherSubjects.includes(subject)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setClassTeacherSubjects([...classTeacherSubjects, subject])
                                  } else {
                                    setClassTeacherSubjects(classTeacherSubjects.filter(s => s !== subject))
                                  }
                                }}
                              />
                              <label
                                htmlFor={`class-teacher-${subject}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {subject}
                              </label>
                            </div>
                          ))}
                        </div>

                        {classTeacherSubjects.length > 0 && (
                          <div className="mt-3 p-3 bg-white rounded-lg border-2 border-[#1897C6]/30">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Selected Subjects:</p>
                            <div className="flex flex-wrap gap-2">
                              {classTeacherSubjects.map((subject) => (
                                <Badge key={subject} className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {!isClassTeacher && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Enable to assign as class teacher</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Subject Teaching Allocation */}
            <Card className="border-2 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white shadow-sm">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">Subject Teaching Allocation</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">Assign subjects across different classes</p>
                    </div>
                  </div>
                  <Button
                    onClick={addSubjectAllocation}
                    className="gap-2 bg-gradient-to-r from-[#F1AF37] to-[#D88931] hover:from-[#F1AF37]/90 hover:to-[#D88931]/90 h-9 w-full sm:w-auto"
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Add Subject</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {subjectAllocations.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground mb-4">No subject allocations yet</p>
                    <Button
                      onClick={addSubjectAllocation}
                      variant="outline"
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add First Subject
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subjectAllocations.map((allocation, index) => (
                      <Card key={index} className="border-2 overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 space-y-2">
                              <Label className="text-sm font-medium">Subject {index + 1}</Label>
                              <Select
                                value={allocation.subject}
                                onValueChange={(value) => updateSubjectAllocation(index, value)}
                              >
                                <SelectTrigger className="h-10 bg-white">
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  {subjectsData.map((subject) => (
                                    <SelectItem key={subject} value={subject}>
                                      {subject}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeSubjectAllocation(index)}
                              className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        {allocation.subject && (
                          <CardContent className="p-4 space-y-3">
                            <Label className="text-sm font-medium">Assign Classes</Label>
                            <div className="space-y-3">
                              {classesData.map((classItem) => (
                                <div key={classItem.standard} className="space-y-2">
                                  <p className="text-sm font-medium text-muted-foreground">Class {classItem.standard}</p>
                                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                    {classItem.sections.map((section) => {
                                      const isSelected = isClassSelected(index, classItem.standard, section)
                                      return (
                                        <button
                                          key={section}
                                          onClick={() => toggleClassForSubject(index, classItem.standard, section)}
                                          className={`p-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                            isSelected
                                              ? 'bg-gradient-to-r from-[#F1AF37] to-[#D88931] text-white border-transparent shadow-md'
                                              : 'bg-white border-border hover:border-[#F1AF37] hover:bg-[#F1AF37]/5'
                                          }`}
                                        >
                                          {classItem.standard}{section}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {allocation.classes.length > 0 && (
                              <div className="mt-4 p-3 bg-gradient-to-r from-[#F1AF37]/10 to-[#D88931]/10 rounded-lg border-2 border-[#F1AF37]/30">
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                  Selected: {allocation.classes.length} {allocation.classes.length === 1 ? 'class' : 'classes'}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {allocation.classes.map((cls, idx) => (
                                    <Badge key={idx} variant="outline" className="bg-white text-[#D87331] border-[#F1AF37]/40">
                                      Class {cls.standard}{cls.section}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Summary */}
            {(isClassTeacher || subjectAllocations.some(a => a.classes.length > 0)) && (
              <Card className="border-2 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <CardTitle className="text-base sm:text-lg text-emerald-900">Allocation Summary</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isClassTeacher && classTeacherClass && classTeacherSection && (
                    <div className="p-3 bg-white rounded-lg border-2 border-emerald-200">
                      <p className="text-sm font-semibold text-emerald-900 mb-2">Class Teacher:</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white">
                          Class {classTeacherClass}{classTeacherSection}
                        </Badge>
                        {classTeacherSubjects.length > 0 && (
                          <>
                            <span className="text-xs text-muted-foreground">teaching</span>
                            {classTeacherSubjects.map((subject) => (
                              <Badge key={subject} variant="outline" className="bg-[#1897C6]/10 text-[#1897C6] border-[#1897C6]/30">
                                {subject}
                              </Badge>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {subjectAllocations.filter(a => a.subject && a.classes.length > 0).map((allocation, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border-2 border-emerald-200">
                      <p className="text-sm font-semibold text-emerald-900 mb-2">{allocation.subject}:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {allocation.classes.map((cls, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-[#F1AF37]/10 text-[#D87331] border-[#F1AF37]/30">
                            {cls.standard}{cls.section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Salary Structure Tab */}
        <TabsContent value="salary" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <Card className="border-2 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white shadow-sm">
                  <IndianRupee className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Salary Structure Configuration</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Define compensation and benefits</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Salary Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Salary Type <span className="text-red-500">*</span></Label>
                <RadioGroup value={salaryType} onValueChange={setSalaryType}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center space-x-2 p-3 border-2 rounded-lg hover:bg-muted/50 cursor-pointer has-[:checked]:border-[#F1AF37] has-[:checked]:bg-[#F1AF37]/5">
                      <RadioGroupItem value="fixed_monthly" id="fixed_monthly" />
                      <label htmlFor="fixed_monthly" className="text-sm font-medium cursor-pointer flex-1">
                        Fixed Monthly Salary
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border-2 rounded-lg hover:bg-muted/50 cursor-pointer has-[:checked]:border-[#F1AF37] has-[:checked]:bg-[#F1AF37]/5">
                      <RadioGroupItem value="per_lecture" id="per_lecture" />
                      <label htmlFor="per_lecture" className="text-sm font-medium cursor-pointer flex-1">
                        Per Lecture
                      </label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Fixed Monthly Salary Fields */}
              {salaryType === 'fixed_monthly' && (
                <div className="space-y-4 p-4 rounded-lg border-2 bg-muted/20">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Basic Salary <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={basicSalary}
                          onChange={(e) => setBasicSalary(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">HRA (House Rent Allowance)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={hra}
                          onChange={(e) => setHra(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">DA (Dearness Allowance)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={da}
                          onChange={(e) => setDa(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Conveyance Allowance</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={conveyanceAllowance}
                          onChange={(e) => setConveyanceAllowance(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label className="text-sm font-medium">Medical Allowance</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={medicalAllowance}
                          onChange={(e) => setMedicalAllowance(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Per Lecture Fields */}
              {salaryType === 'per_lecture' && (
                <div className="space-y-4 p-4 rounded-lg border-2 bg-muted/20">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rate Per Lecture <span className="text-red-500">*</span></Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={perLectureRate}
                          onChange={(e) => setPerLectureRate(e.target.value)}
                          placeholder="0.00"
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Max Lectures Per Month</Label>
                      <Input
                        type="number"
                        value={maxLectures}
                        onChange={(e) => setMaxLectures(e.target.value)}
                        placeholder="0"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Deductions */}
              <div className="space-y-4 p-4 rounded-lg border-2 bg-red-50/30 border-red-200">
                <h3 className="text-sm font-semibold text-red-900">Deductions</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        id="pf"
                        checked={pfApplicable}
                        onCheckedChange={(checked) => setPfApplicable(checked as boolean)}
                      />
                      <Label htmlFor="pf" className="text-sm font-medium cursor-pointer">
                        Provident Fund (PF)
                      </Label>
                    </div>
                    {pfApplicable && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={pfPercentage}
                          onChange={(e) => setPfPercentage(e.target.value)}
                          placeholder="12"
                          className="w-20 h-9 text-sm"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        id="tds"
                        checked={tdsApplicable}
                        onCheckedChange={(checked) => setTdsApplicable(checked as boolean)}
                      />
                      <Label htmlFor="tds" className="text-sm font-medium cursor-pointer">
                        TDS (Tax Deducted at Source)
                      </Label>
                    </div>
                    {tdsApplicable && (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={tdsPercentage}
                          onChange={(e) => setTdsPercentage(e.target.value)}
                          placeholder="10"
                          className="w-20 h-9 text-sm"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Salary Summary */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-[#F1AF37]/10 to-[#D88931]/10 border-2 border-[#F1AF37]/30 space-y-3">
                <h3 className="text-sm font-semibold text-[#D87331]">Salary Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Gross Salary:</span>
                    <span className="font-semibold">₹ {calculateTotalSalary()}</span>
                  </div>
                  <div className="flex justify-between items-center text-red-600">
                    <span>Total Deductions:</span>
                    <span className="font-semibold">- ₹ {calculateDeductions()}</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center text-base">
                    <span className="font-bold text-[#D87331]">Net Salary:</span>
                    <span className="font-bold text-lg text-[#D87331]">₹ {calculateNetSalary()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activation Tab */}
        <TabsContent value="activation" className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
          <Card className="border-2 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg text-emerald-900">Teacher Activation</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Final step to activate teacher account</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-6">
              {/* Teacher Code */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Teacher Code <span className="text-red-500">*</span></Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={teacherCode}
                      onChange={(e) => setTeacherCode(e.target.value)}
                      placeholder="e.g., TCH001"
                      className="pl-10 h-11"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const code = `TCH${Math.floor(1000 + Math.random() * 9000)}`
                      setTeacherCode(code)
                    }}
                    className="h-11 px-4"
                  >
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Unique identifier for the teacher</p>
              </div>

              {/* Joining Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Joining Date <span className="text-red-500">*</span></Label>
                <Input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Employment Type <span className="text-red-500">*</span></Label>
                <Select value={employmentType} onValueChange={setEmploymentType}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full Time</SelectItem>
                    <SelectItem value="part_time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="visiting">Visiting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Checklist */}
              <div className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-900">Pre-Activation Checklist</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    {teacherCode ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Teacher code assigned</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {joiningDate ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Joining date set</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {basicSalary || perLectureRate ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span>Salary structure configured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {(isClassTeacher && classTeacherClass) || subjectAllocations.some(a => a.classes.length > 0) ? (
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    <span>Class allocation assigned (optional)</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 gap-2 h-11"
                  onClick={() => {
                    // Save as draft logic
                  }}
                >
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button
                  onClick={() => setActivateDialogOpen(true)}
                  disabled={!teacherCode || !joiningDate || (!basicSalary && !perLectureRate)}
                  className="flex-1 gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-md h-11"
                >
                  <CheckCircle className="h-4 w-4" />
                  Activate Teacher
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activation Confirmation Dialog */}
      <AlertDialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Activate Teacher Account?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>This will activate <strong>{mockTeacherData.full_name}</strong> as a teacher.</p>
              <div className="mt-3 p-3 rounded-lg bg-muted text-sm space-y-1">
                <p><strong>Teacher Code:</strong> {teacherCode}</p>
                <p><strong>Joining Date:</strong> {joiningDate}</p>
                <p><strong>Salary:</strong> ₹{calculateNetSalary()}/month</p>
              </div>
              <p className="text-xs text-muted-foreground mt-3">The teacher will receive login credentials via email.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleActivate} className="bg-gradient-to-r from-emerald-500 to-emerald-600">
              Confirm Activation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Teacher Application?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>Please provide a reason for rejection:</p>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">The applicant will be notified via email.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="bg-red-500 hover:bg-red-600"
            >
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
