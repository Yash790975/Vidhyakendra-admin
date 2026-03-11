'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, CheckCircle, XCircle, FileText, Heart, GraduationCap, Briefcase, DollarSign, Home, AlertCircle, Bus } from 'lucide-react'

// Mock student data - in real app, this would come from the database
const mockStudent = {
  id: '1',
  student_code: 'STD001',
  admission_number: 'ADM001',
  admission_date: '2024-01-15',
  first_name: 'Aarav',
  last_name: 'Sharma',
  full_name: 'Aarav Sharma',
  date_of_birth: '2008-05-15',
  gender: 'Male',
  blood_group: 'O+',
  religion: 'Hindu',
  caste: 'General',
  category: 'General',
  nationality: 'Indian',
  aadhaar_number: '1234 5678 9012',
  mobile: '+91 98765 43210',
  email: 'aarav.sharma@email.com',
  alternate_mobile: '+91 98765 43211',
  current_address: '123 Main Street, Andheri East',
  current_city: 'Mumbai',
  current_state: 'Maharashtra',
  current_pincode: '400069',
  permanent_address: '123 Main Street, Andheri East',
  permanent_city: 'Mumbai',
  permanent_state: 'Maharashtra',
  permanent_pincode: '400069',
  primary_guardian: 'father' as const,
  father_name: 'Mr. Rajesh Sharma',
  father_occupation: 'Business',
  father_mobile: '+91 98765 43212',
  father_email: 'rajesh.sharma@email.com',
  father_annual_income: '₹12,00,000',
  father_aadhaar: '9876 5432 1098',
  mother_name: 'Mrs. Priya Sharma',
  mother_occupation: 'Teacher',
  mother_mobile: '+91 98765 43213',
  mother_email: 'priya.sharma@email.com',
  mother_annual_income: '₹6,00,000',
  mother_aadhaar: '8765 4321 0987',
  guardian_name: '',
  guardian_relation: '',
  guardian_mobile: '',
  guardian_email: '',
  previous_school: 'ABC High School',
  previous_class: '9',
  roll_number: '',
  medical_history: 'None',
  allergies: 'None',
  current_medications: 'None',
  emergency_contact_name: 'Mr. Rajesh Sharma',
  emergency_contact_number: '+91 98765 43212',
  transport_required: true,
  pickup_point: 'Andheri Station',
  drop_point: 'Andheri Station',
  applied_date: '2024-01-15',
  status: 'pending_verification',
  photo_url: '',
  birth_certificate_url: '/docs/birth-cert.pdf',
  transfer_certificate_url: '/docs/tc.pdf',
  caste_certificate_url: '',
  aadhaar_card_url: '/docs/aadhaar.pdf',
  previous_marksheet_url: '/docs/marksheet.pdf',
}

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    pending_verification: { label: 'Pending Verification', className: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    documents_pending: { label: 'Documents Pending', className: 'bg-orange-100 text-orange-800 border-orange-300' },
    approved: { label: 'Approved', className: 'bg-green-100 text-green-800 border-green-300' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-300' },
  }
  
  const config = statusConfig[status] || statusConfig.pending_verification
  return (
    <Badge variant="outline" className={`${config.className} font-medium`}>
      {config.label}
    </Badge>
  )
}

// Helper function to get student by ID - in production, this would fetch from database
const getStudentById = (id: string) => {
  // For now, return mock student data
  // In production: const student = await fetchStudentById(id)
  return { ...mockStudent, id, class: '10', section: 'A' }
}

export default function StudentOnboardingViewPage() {
  const router = useRouter()
  const params = useParams()
  const studentId = params.id as string
  
  const student = getStudentById(studentId)
  const [selectedClass, setSelectedClass] = useState(student.class)
  const [selectedSection, setSelectedSection] = useState(student.section)
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const handleApprove = () => {
    console.log('[v0] Approving student:', student.student_code, 'Class:', selectedClass, 'Section:', selectedSection)
    // In production: API call to approve student and move to active students
    setShowApproveDialog(false)
    router.push('/dashboard/students/onboarding')
  }

  const handleReject = () => {
    console.log('[v0] Rejecting student:', student.student_code)
    // In production: API call to reject student application
    setShowRejectDialog(false)
    router.push('/dashboard/students/onboarding')
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 p-2 sm:p-3 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0 h-9 w-9 sm:h-10 sm:w-10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight truncate">Student Application Review</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Review and approve student application</p>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50 h-9 sm:h-10 text-sm"
            onClick={() => setShowRejectDialog(true)}
          >
            <XCircle className="h-4 w-4" />
            <span className="hidden xs:inline">Reject</span>
          </Button>
          <Button
            className="flex-1 gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-9 sm:h-10 text-sm"
            onClick={() => setShowApproveDialog(true)}
          >
            <CheckCircle className="h-4 w-4" />
            <span className="hidden xs:inline">Approve</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
          {/* Student Profile Card */}
          <Card>
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#1897C6]" />
                Student Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              {/* Profile Header with Avatar */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 pb-4 sm:pb-6 border-b">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 border-4 border-gradient-to-br from-[#1897C6] to-[#67BAC3]">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={student.full_name} />
                  <AvatarFallback className="bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white text-xl sm:text-2xl font-bold">
                    {student.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left space-y-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold truncate">{student.full_name}</h2>
                  <p className="text-sm text-muted-foreground font-mono truncate">{student.student_code}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                    {getStatusBadge(student.status)}
                    <Badge variant="outline" className="border-[#1897C6] text-[#1897C6]">
                      Applied: {new Date(student.applied_date).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Personal Information Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="Admission Number" value={student.admission_number} />
                <InfoItem label="Admission Date" value={new Date(student.admission_date).toLocaleDateString()} icon={Calendar} />
                <InfoItem label="Date of Birth" value={new Date(student.date_of_birth).toLocaleDateString()} icon={Calendar} />
                <InfoItem label="Gender" value={student.gender} />
                <InfoItem label="Blood Group" value={student.blood_group} />
                <InfoItem label="Religion" value={student.religion} />
                <InfoItem label="Caste" value={student.caste} />
                <InfoItem label="Category" value={student.category} />
                <InfoItem label="Nationality" value={student.nationality} />
                <InfoItem label="Aadhaar Number" value={student.aadhaar_number} />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#1897C6]" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Primary Mobile" value={student.mobile} icon={Phone} />
                <InfoItem label="Email Address" value={student.email} icon={Mail} />
                {student.alternate_mobile && (
                  <InfoItem label="Alternate Mobile" value={student.alternate_mobile} icon={Phone} />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#1897C6]" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-[#1897C6]">Current Address</h4>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium">{student.current_address}</p>
                  <div className="grid gap-2 sm:grid-cols-3 text-sm">
                    <InfoItem label="City" value={student.current_city} compact />
                    <InfoItem label="State" value={student.current_state} compact />
                    <InfoItem label="Pincode" value={student.current_pincode} compact />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3 text-[#1897C6]">Permanent Address</h4>
                <div className="space-y-2 bg-muted/30 p-4 rounded-lg">
                  <p className="font-medium">{student.permanent_address}</p>
                  <div className="grid gap-2 sm:grid-cols-3 text-sm">
                    <InfoItem label="City" value={student.permanent_city} compact />
                    <InfoItem label="State" value={student.permanent_state} compact />
                    <InfoItem label="Pincode" value={student.permanent_pincode} compact />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#1897C6]" />
                Guardian Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Father Details */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">F</span>
                  Father's Details
                  {student.primary_guardian === 'father' && (
                    <Badge variant="outline" className="text-xs border-[#1897C6] text-[#1897C6]">Primary</Badge>
                  )}
                </h4>
                <div className="grid gap-3 sm:grid-cols-2 bg-blue-50/50 p-4 rounded-lg">
                  <InfoItem label="Name" value={student.father_name} compact />
                  <InfoItem label="Occupation" value={student.father_occupation} icon={Briefcase} compact />
                  <InfoItem label="Mobile" value={student.father_mobile} icon={Phone} compact />
                  <InfoItem label="Email" value={student.father_email} icon={Mail} compact />
                  <InfoItem label="Annual Income" value={student.father_annual_income} icon={DollarSign} compact />
                  <InfoItem label="Aadhaar" value={student.father_aadhaar} compact />
                </div>
              </div>

              {/* Mother Details */}
              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs">M</span>
                  Mother's Details
                  {student.primary_guardian === 'mother' && (
                    <Badge variant="outline" className="text-xs border-[#1897C6] text-[#1897C6]">Primary</Badge>
                  )}
                </h4>
                <div className="grid gap-3 sm:grid-cols-2 bg-pink-50/50 p-4 rounded-lg">
                  <InfoItem label="Name" value={student.mother_name} compact />
                  <InfoItem label="Occupation" value={student.mother_occupation} icon={Briefcase} compact />
                  <InfoItem label="Mobile" value={student.mother_mobile} icon={Phone} compact />
                  <InfoItem label="Email" value={student.mother_email} icon={Mail} compact />
                  <InfoItem label="Annual Income" value={student.mother_annual_income} icon={DollarSign} compact />
                  <InfoItem label="Aadhaar" value={student.mother_aadhaar} compact />
                </div>
              </div>

              {/* Other Guardian if exists */}
              {student.guardian_name && student.primary_guardian === 'other' && (
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs">G</span>
                    Guardian Details
                    <Badge variant="outline" className="text-xs border-[#1897C6] text-[#1897C6]">Primary</Badge>
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2 bg-gray-50/50 p-4 rounded-lg">
                    <InfoItem label="Name" value={student.guardian_name} compact />
                    <InfoItem label="Relation" value={student.guardian_relation} compact />
                    <InfoItem label="Mobile" value={student.guardian_mobile} icon={Phone} compact />
                    <InfoItem label="Email" value={student.guardian_email} icon={Mail} compact />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#1897C6]" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Previous School" value={student.previous_school || 'Not Specified'} icon={GraduationCap} />
                <InfoItem label="Previous Class" value={student.previous_class || 'Not Specified'} />
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#1897C6]" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem label="Medical History" value={student.medical_history} />
                <InfoItem label="Allergies" value={student.allergies} />
                <InfoItem label="Current Medications" value={student.current_medications} />
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3 text-[#1897C6]">Emergency Contact</h4>
                <div className="grid gap-3 sm:grid-cols-2 bg-red-50/50 p-4 rounded-lg">
                  <InfoItem label="Contact Name" value={student.emergency_contact_name} icon={AlertCircle} compact />
                  <InfoItem label="Contact Number" value={student.emergency_contact_number} icon={Phone} compact />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Information */}
          {student.transport_required && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-[#1897C6]" />
                  Transport Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoItem label="Transport Required" value="Yes" icon={Bus} />
                  <InfoItem label="Pickup Point" value={student.pickup_point} icon={MapPin} />
                  <InfoItem label="Drop Point" value={student.drop_point} icon={MapPin} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#1897C6]" />
                Documents Submitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <DocumentItem label="Photo" url={student.photo_url} />
                <DocumentItem label="Birth Certificate" url={student.birth_certificate_url} />
                <DocumentItem label="Transfer Certificate" url={student.transfer_certificate_url} />
                <DocumentItem label="Aadhaar Card" url={student.aadhaar_card_url} />
                <DocumentItem label="Previous Marksheet" url={student.previous_marksheet_url} />
                {student.caste_certificate_url && (
                  <DocumentItem label="Caste Certificate" url={student.caste_certificate_url} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4 sm:space-y-6">
          {/* Class Allocation */}
          <Card className="border-2 border-[#1897C6]/20">
            <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5">
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5 text-[#1897C6]" />
                Class Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="class">Assign Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="class" className="border-2">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(cls => (
                      <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Assign Section</Label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger id="section" className="border-2">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {['A', 'B', 'C', 'D', 'E'].map(sec => (
                      <SelectItem key={sec} value={sec}>Section {sec}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 space-y-2">
                <div className="p-3 rounded-lg bg-[#1897C6]/5 border border-[#1897C6]/20">
                  <p className="text-sm text-muted-foreground">Selected Class</p>
                  <p className="text-lg font-bold text-[#1897C6]">
                    Class {selectedClass} - Section {selectedSection}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Application ID</span>
                <span className="font-mono font-semibold">{student.student_code}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Applied Date</span>
                <span className="font-medium">{new Date(student.applied_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm text-muted-foreground">Documents</span>
                <span className="font-medium">5 submitted</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(student.status)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="max-w-full sm:max-w-md mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Approve Student Application
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this student application? The student will be enrolled in Class {selectedClass}-{selectedSection} and moved to active students.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={handleApprove}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve & Enroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="max-w-full sm:max-w-md mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <XCircle className="h-5 w-5 text-red-600" />
              Reject Student Application
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this student application? This action will remove the application from the onboarding list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleReject}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Helper Components
function InfoItem({ 
  label, 
  value, 
  icon: Icon, 
  compact = false 
}: { 
  label: string
  value: string | number
  icon?: React.ComponentType<{ className?: string }>
  compact?: boolean
}) {
  return (
    <div className={compact ? "space-y-0.5" : "space-y-1"}>
      <Label className={`${compact ? 'text-xs' : 'text-xs'} text-muted-foreground`}>{label}</Label>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-[#1897C6] shrink-0" />}
        <p className={`${compact ? 'text-sm' : ''} font-medium break-words`}>{value || 'Not Provided'}</p>
      </div>
    </div>
  )
}

function DocumentItem({ label, url }: { label: string; url: string }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg ${url ? 'bg-green-50 border border-green-200' : 'bg-muted/50 border border-muted'}`}>
      <div className="flex items-center gap-2">
        {url ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <XCircle className="h-4 w-4 text-muted-foreground" />
        )}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {url && (
        <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            View
          </a>
        </Button>
      )}
    </div>
  )
}
