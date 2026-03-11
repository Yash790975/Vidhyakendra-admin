'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Upload,
  X
} from 'lucide-react'

type FormData = {
  // Personal Information
  student_code: string
  admission_number: string
  admission_date: string
  first_name: string
  last_name: string
  full_name: string
  date_of_birth: string
  gender: string
  blood_group: string
  religion: string
  caste: string
  category: string
  nationality: string
  aadhaar_number: string
  
  // Contact Information
  mobile: string
  email: string
  alternate_mobile: string
  
  // Address
  current_address: string
  current_city: string
  current_state: string
  current_pincode: string
  permanent_address: string
  permanent_city: string
  permanent_state: string
  permanent_pincode: string
  same_as_current: boolean
  
  // Guardian Details
  primary_guardian: 'father' | 'mother' | 'other'
  father_name: string
  father_occupation: string
  father_mobile: string
  father_email: string
  father_annual_income: string
  father_aadhaar: string
  mother_name: string
  mother_occupation: string
  mother_mobile: string
  mother_email: string
  mother_annual_income: string
  mother_aadhaar: string
  guardian_name: string
  guardian_relation: string
  guardian_mobile: string
  guardian_email: string
  
  // Academic Details
  class_id: string
  section_id: string
  roll_number: string
  previous_school: string
  previous_class: string
  
  // Documents
  photo_url: string
  birth_certificate_url: string
  transfer_certificate_url: string
  caste_certificate_url: string
  aadhaar_card_url: string
  previous_marksheet_url: string
  
  // Medical Information
  medical_history: string
  allergies: string
  current_medications: string
  emergency_contact_name: string
  emergency_contact_number: string
  
  // Transport (Optional)
  transport_required: boolean
  pickup_point: string
  drop_point: string
}

type Section = 'personal' | 'contact' | 'address' | 'guardian' | 'academic' | 'documents' | 'medical' | 'transport' | 'review'

const sections: { key: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'personal', label: 'Personal Info', icon: User },
  { key: 'contact', label: 'Contact', icon: Phone },
  { key: 'address', label: 'Address', icon: MapPin },
  { key: 'guardian', label: 'Guardian', icon: User },
  { key: 'academic', label: 'Academic', icon: GraduationCap },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'medical', label: 'Medical', icon: AlertCircle },
  { key: 'transport', label: 'Transport', icon: FileText },
  { key: 'review', label: 'Review', icon: CheckCircle2 },
]

export default function AddStudentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEditMode = searchParams?.get('edit')
  const editId = searchParams?.get('edit')

  const [activeSection, setActiveSection] = useState<Section>('personal')
  const [activeGuardians, setActiveGuardians] = useState<Array<'father' | 'mother' | 'other'>>(['father'])
  const [primaryGuardian, setPrimaryGuardian] = useState<'father' | 'mother' | 'other' | null>('father')
  const [formData, setFormData] = useState<FormData>({
    student_code: '',
    admission_number: '',
    admission_date: '',
    first_name: '',
    last_name: '',
    full_name: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    religion: '',
    caste: '',
    category: '',
    nationality: 'Indian',
    aadhaar_number: '',
    mobile: '',
    email: '',
    alternate_mobile: '',
    current_address: '',
    current_city: '',
    current_state: '',
    current_pincode: '',
    permanent_address: '',
    permanent_city: '',
    permanent_state: '',
    permanent_pincode: '',
    same_as_current: false,
    primary_guardian: 'father',
    father_name: '',
    father_occupation: '',
    father_mobile: '',
    father_email: '',
    father_annual_income: '',
    father_aadhaar: '',
    mother_name: '',
    mother_occupation: '',
    mother_mobile: '',
    mother_email: '',
    mother_annual_income: '',
    mother_aadhaar: '',
    guardian_name: '',
    guardian_relation: '',
    guardian_mobile: '',
    guardian_email: '',
    class_id: '',
    section_id: '',
    roll_number: '',
    previous_school: '',
    previous_class: '',
    photo_url: '',
    birth_certificate_url: '',
    transfer_certificate_url: '',
    caste_certificate_url: '',
    aadhaar_card_url: '',
    previous_marksheet_url: '',
    medical_history: '',
    allergies: '',
    current_medications: '',
    emergency_contact_name: '',
    emergency_contact_number: '',
    transport_required: false,
    pickup_point: '',
    drop_point: '',
  })

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    if (field === 'first_name' || field === 'last_name') {
      const firstName = field === 'first_name' ? value : formData.first_name
      const lastName = field === 'last_name' ? value : formData.last_name
      setFormData((prev) => ({ ...prev, full_name: `${firstName} ${lastName}`.trim() }))
    }
    
    if (field === 'same_as_current' && value) {
      setFormData((prev) => ({
        ...prev,
        permanent_address: prev.current_address,
        permanent_city: prev.current_city,
        permanent_state: prev.current_state,
        permanent_pincode: prev.current_pincode,
      }))
    }
  }

  const handleSubmit = async () => {
    console.log('[v0] Submitting student form:', formData)
    // In real app, this would call the API
    router.push('/dashboard/students/all')
  }

  const getCurrentSectionIndex = () => sections.findIndex((s) => s.key === activeSection)
  const progress = ((getCurrentSectionIndex() + 1) / sections.length) * 100

  const goToPrevSection = () => {
    const currentIndex = getCurrentSectionIndex()
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].key)
    }
  }

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex()
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].key)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
              {isEditMode ? 'Edit Student' : 'Add New Student'}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Complete all sections to onboard a new student</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/dashboard/students/all')} className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="sm:inline">Back to Students</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Section Navigation */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-3 sm:p-4">
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1 snap-x snap-mandatory">
            {sections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.key
              const index = sections.findIndex((s) => s.key === section.key)
              const currentIndex = getCurrentSectionIndex()
              const isCompleted = index < currentIndex

              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg whitespace-nowrap transition-all snap-start flex-shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white'
                      : isCompleted
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">{section.label}</span>
                  {isCompleted && <CheckCircle2 className="h-3 w-3" />}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

        {/* Form Content */}
        <Card>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-4 sm:space-y-6">
            {/* Personal Information */}
            {activeSection === 'personal' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="student_code">Student Code</Label>
                    <Input
                      id="student_code"
                      placeholder="STD2024001"
                      value={formData.student_code}
                      onChange={(e) => handleChange('student_code', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admission_number">Admission Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="admission_number"
                      placeholder="ADM001"
                      value={formData.admission_number}
                      onChange={(e) => handleChange('admission_number', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admission_date">Admission Date <span className="text-red-500">*</span></Label>
                    <Input
                      id="admission_date"
                      type="date"
                      value={formData.admission_date}
                      onChange={(e) => handleChange('admission_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="first_name"
                      placeholder="Enter first name"
                      value={formData.first_name}
                      onChange={(e) => handleChange('first_name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="last_name"
                      placeholder="Enter last name"
                      value={formData.last_name}
                      onChange={(e) => handleChange('last_name', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth <span className="text-red-500">*</span></Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => handleChange('date_of_birth', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                    <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="blood_group">Blood Group</Label>
                    <Select value={formData.blood_group} onValueChange={(value) => handleChange('blood_group', value)}>
                      <SelectTrigger id="blood_group">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Input
                      id="religion"
                      placeholder="Enter religion"
                      value={formData.religion}
                      onChange={(e) => handleChange('religion', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caste">Caste</Label>
                    <Input
                      id="caste"
                      placeholder="Enter caste"
                      value={formData.caste}
                      onChange={(e) => handleChange('caste', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      placeholder="Enter nationality"
                      value={formData.nationality}
                      onChange={(e) => handleChange('nationality', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar_number">Aadhaar Number</Label>
                    <Input
                      id="aadhaar_number"
                      placeholder="XXXX-XXXX-XXXX"
                      value={formData.aadhaar_number}
                      onChange={(e) => handleChange('aadhaar_number', e.target.value)}
                      maxLength={12}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information */}
            {activeSection === 'contact' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternate_mobile">Alternate Mobile</Label>
                    <Input
                      id="alternate_mobile"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.alternate_mobile}
                      onChange={(e) => handleChange('alternate_mobile', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Address */}
            {activeSection === 'address' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Current Address</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current_address">Address <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="current_address"
                        placeholder="Enter current address"
                        value={formData.current_address}
                        onChange={(e) => handleChange('current_address', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="current_city">City <span className="text-red-500">*</span></Label>
                        <Input
                          id="current_city"
                          placeholder="Enter city"
                          value={formData.current_city}
                          onChange={(e) => handleChange('current_city', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="current_state">State <span className="text-red-500">*</span></Label>
                        <Input
                          id="current_state"
                          placeholder="Enter state"
                          value={formData.current_state}
                          onChange={(e) => handleChange('current_state', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="current_pincode">Pincode <span className="text-red-500">*</span></Label>
                        <Input
                          id="current_pincode"
                          placeholder="XXXXXX"
                          value={formData.current_pincode}
                          onChange={(e) => handleChange('current_pincode', e.target.value)}
                          maxLength={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="same_as_current"
                    checked={formData.same_as_current}
                    onCheckedChange={(checked) => handleChange('same_as_current', checked)}
                  />
                  <Label htmlFor="same_as_current" className="text-sm font-normal cursor-pointer">
                    Permanent address same as current address
                  </Label>
                </div>

                {!formData.same_as_current && (
                  <div>
                    <h3 className="font-semibold mb-4">Permanent Address</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="permanent_address">Address</Label>
                        <Textarea
                          id="permanent_address"
                          placeholder="Enter permanent address"
                          value={formData.permanent_address}
                          onChange={(e) => handleChange('permanent_address', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="permanent_city">City</Label>
                          <Input
                            id="permanent_city"
                            placeholder="Enter city"
                            value={formData.permanent_city}
                            onChange={(e) => handleChange('permanent_city', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="permanent_state">State</Label>
                          <Input
                            id="permanent_state"
                            placeholder="Enter state"
                            value={formData.permanent_state}
                            onChange={(e) => handleChange('permanent_state', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="permanent_pincode">Pincode</Label>
                          <Input
                            id="permanent_pincode"
                            placeholder="XXXXXX"
                            value={formData.permanent_pincode}
                            onChange={(e) => handleChange('permanent_pincode', e.target.value)}
                            maxLength={6}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Guardian Details */}
            {activeSection === 'guardian' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Add Guardian Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">Guardian Information</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Add and manage guardian details</p>
                  </div>
                  <Select 
                    value="" 
                    onValueChange={(value: 'father' | 'mother' | 'other') => {
                      if (!activeGuardians.includes(value)) {
                        setActiveGuardians([...activeGuardians, value])
                        if (!primaryGuardian) setPrimaryGuardian(value)
                      }
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="+ Add Guardian" />
                    </SelectTrigger>
                    <SelectContent>
                      {!activeGuardians.includes('father') && <SelectItem value="father">Father</SelectItem>}
                      {!activeGuardians.includes('mother') && <SelectItem value="mother">Mother</SelectItem>}
                      {!activeGuardians.includes('other') && <SelectItem value="other">Other Guardian</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>

                {/* Father's Information */}
                {activeGuardians.includes('father') && (
                  <div>
                  <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full hover:bg-red-100 hover:text-red-600"
                        onClick={() => {
                          setActiveGuardians(activeGuardians.filter(g => g !== 'father'))
                          if (primaryGuardian === 'father') setPrimaryGuardian(activeGuardians.find(g => g !== 'father') || null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <User className="h-4 w-4 text-blue-700" />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg">Father's Information</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {primaryGuardian === 'father' ? (
                        <Badge className="bg-[#1897C6] text-white text-xs">Primary</Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setPrimaryGuardian('father')}
                        >
                          Set Primary
                        </Button>
                      )}
                    </div>
                    </div>
                    <Card className="border bg-blue-50/50">
                      <CardContent className="p-3 sm:p-4 lg:p-6">
                        <div className="space-y-3 sm:space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="father_name">Father's Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="father_name"
                              placeholder="Enter father's name"
                              value={formData.father_name}
                              onChange={(e) => handleChange('father_name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="father_occupation">Occupation</Label>
                            <Input
                              id="father_occupation"
                              placeholder="Enter occupation"
                              value={formData.father_occupation}
                              onChange={(e) => handleChange('father_occupation', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="father_mobile">Mobile Number <span className="text-red-500">*</span></Label>
                            <Input
                              id="father_mobile"
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.father_mobile}
                              onChange={(e) => handleChange('father_mobile', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="father_email">Email</Label>
                            <Input
                              id="father_email"
                              type="email"
                              placeholder="father@email.com"
                              value={formData.father_email}
                              onChange={(e) => handleChange('father_email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="father_annual_income">Annual Income</Label>
                            <Input
                              id="father_annual_income"
                              type="number"
                              placeholder="Enter annual income"
                              value={formData.father_annual_income}
                              onChange={(e) => handleChange('father_annual_income', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="father_aadhaar">Aadhaar Number</Label>
                            <Input
                              id="father_aadhaar"
                              placeholder="XXXX-XXXX-XXXX"
                              value={formData.father_aadhaar}
                              onChange={(e) => handleChange('father_aadhaar', e.target.value)}
                              maxLength={12}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                {/* Mother's Information */}
                {activeGuardians.includes('mother') && (
                  <div>
                    <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full hover:bg-red-100 hover:text-red-600"
                          onClick={() => {
                            setActiveGuardians(activeGuardians.filter(g => g !== 'mother'))
                            if (primaryGuardian === 'mother') setPrimaryGuardian(activeGuardians.find(g => g !== 'mother') || null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-100">
                          <User className="h-4 w-4 text-pink-700" />
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base lg:text-lg">Mother's Information</h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {primaryGuardian === 'mother' ? (
                          <Badge className="bg-[#1897C6] text-white text-xs">Primary</Badge>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setPrimaryGuardian('mother')}
                          >
                            Set Primary
                          </Button>
                        )}
                      </div>
                    </div>
                    <Card className="border bg-pink-50/50">
                      <CardContent className="p-3 sm:p-4 lg:p-6">
                        <div className="space-y-3 sm:space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="mother_name">Mother's Name <span className="text-red-500">*</span></Label>
                            <Input
                              id="mother_name"
                              placeholder="Enter mother's name"
                              value={formData.mother_name}
                              onChange={(e) => handleChange('mother_name', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mother_occupation">Occupation</Label>
                            <Input
                              id="mother_occupation"
                              placeholder="Enter occupation"
                              value={formData.mother_occupation}
                              onChange={(e) => handleChange('mother_occupation', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="mother_mobile">Mobile Number <span className="text-red-500">*</span></Label>
                            <Input
                              id="mother_mobile"
                              type="tel"
                              placeholder="+91 XXXXX XXXXX"
                              value={formData.mother_mobile}
                              onChange={(e) => handleChange('mother_mobile', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mother_email">Email</Label>
                            <Input
                              id="mother_email"
                              type="email"
                              placeholder="mother@email.com"
                              value={formData.mother_email}
                              onChange={(e) => handleChange('mother_email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="mother_annual_income">Annual Income</Label>
                            <Input
                              id="mother_annual_income"
                              type="number"
                              placeholder="Enter annual income"
                              value={formData.mother_annual_income}
                              onChange={(e) => handleChange('mother_annual_income', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mother_aadhaar">Aadhaar Number</Label>
                            <Input
                              id="mother_aadhaar"
                              placeholder="XXXX-XXXX-XXXX"
                              value={formData.mother_aadhaar}
                              onChange={(e) => handleChange('mother_aadhaar', e.target.value)}
                              maxLength={12}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                )}

                {/* Other Guardian Information */}
                {activeGuardians.includes('other') && (
                  <div>
                    <div className="flex items-start sm:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full hover:bg-red-100 hover:text-red-600"
                          onClick={() => {
                            setActiveGuardians(activeGuardians.filter(g => g !== 'other'))
                            if (primaryGuardian === 'other') setPrimaryGuardian(activeGuardians.find(g => g !== 'other') || null)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100">
                          <User className="h-4 w-4 text-green-700" />
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base lg:text-lg">Other Guardian Information</h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {primaryGuardian === 'other' ? (
                          <Badge className="bg-[#1897C6] text-white text-xs">Primary</Badge>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setPrimaryGuardian('other')}
                          >
                            Set Primary
                          </Button>
                        )}
                      </div>
                    </div>
                    <Card className="border-2 border-amber-200 bg-amber-50 mb-3 sm:mb-4">
                      <CardContent className="p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-amber-800 flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>Please provide details of the guardian who will be the primary contact for this student.</span>
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border bg-green-50/50">
                      <CardContent className="p-3 sm:p-4 lg:p-6">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="guardian_name">Guardian's Name <span className="text-red-500">*</span></Label>
                                <Input
                                  id="guardian_name"
                                  placeholder="Enter guardian's name"
                                  value={formData.guardian_name}
                                  onChange={(e) => handleChange('guardian_name', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="guardian_relation">Relation</Label>
                                <Input
                                  id="guardian_relation"
                                  placeholder="e.g., Uncle, Aunt, Grandfather"
                                  value={formData.guardian_relation}
                                  onChange={(e) => handleChange('guardian_relation', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-2">
                                <Label htmlFor="guardian_mobile">Mobile Number <span className="text-red-500">*</span></Label>
                                <Input
                                  id="guardian_mobile"
                                  type="tel"
                                  placeholder="+91 XXXXX XXXXX"
                                  value={formData.guardian_mobile}
                                  onChange={(e) => handleChange('guardian_mobile', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="guardian_email">Email</Label>
                                <Input
                                  id="guardian_email"
                                  type="email"
                                  placeholder="guardian@email.com"
                                  value={formData.guardian_email}
                                  onChange={(e) => handleChange('guardian_email', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}

            {/* Academic Details */}
            {activeSection === 'academic' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="class_id">Class <span className="text-red-500">*</span></Label>
                    <Select value={formData.class_id} onValueChange={(value) => handleChange('class_id', value)}>
                      <SelectTrigger id="class_id">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            Class {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section_id">Section <span className="text-red-500">*</span></Label>
                    <Select value={formData.section_id} onValueChange={(value) => handleChange('section_id', value)}>
                      <SelectTrigger id="section_id">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D'].map((section) => (
                          <SelectItem key={section} value={section}>
                            Section {section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roll_number">Roll Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="roll_number"
                      type="number"
                      placeholder="Enter roll number"
                      value={formData.roll_number}
                      onChange={(e) => handleChange('roll_number', e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="previous_school">Previous School</Label>
                    <Input
                      id="previous_school"
                      placeholder="Enter previous school name"
                      value={formData.previous_school}
                      onChange={(e) => handleChange('previous_school', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previous_class">Previous Class</Label>
                    <Input
                      id="previous_class"
                      placeholder="Enter previous class"
                      value={formData.previous_class}
                      onChange={(e) => handleChange('previous_class', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Documents */}
            {activeSection === 'documents' && (
              <div className="space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {[
                    { key: 'photo_url', label: 'Student Photo', required: true },
                    { key: 'birth_certificate_url', label: 'Birth Certificate', required: true },
                    { key: 'transfer_certificate_url', label: 'Transfer Certificate', required: false },
                    { key: 'caste_certificate_url', label: 'Caste Certificate', required: false },
                    { key: 'aadhaar_card_url', label: 'Aadhaar Card', required: false },
                    { key: 'previous_marksheet_url', label: 'Previous Marksheet', required: false },
                  ].map((doc) => (
                    <Card key={doc.key} className="border-2">
                      <CardContent className="p-3 sm:p-4">
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            {doc.label} {doc.required && <span className="text-red-500">*</span>}
                          </Label>
                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                            {formData[doc.key as keyof FormData] && (
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Medical Information */}
            {activeSection === 'medical' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medical_history">Medical History</Label>
                  <Textarea
                    id="medical_history"
                    placeholder="Enter any medical conditions or history"
                    value={formData.medical_history}
                    onChange={(e) => handleChange('medical_history', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="Enter any known allergies"
                    value={formData.allergies}
                    onChange={(e) => handleChange('allergies', e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current_medications">Current Medications</Label>
                  <Textarea
                    id="current_medications"
                    placeholder="Enter any current medications"
                    value={formData.current_medications}
                    onChange={(e) => handleChange('current_medications', e.target.value)}
                    rows={2}
                  />
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_name">Emergency Contact Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="emergency_contact_name"
                      placeholder="Enter emergency contact name"
                      value={formData.emergency_contact_name}
                      onChange={(e) => handleChange('emergency_contact_name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact_number">Emergency Contact Number <span className="text-red-500">*</span></Label>
                    <Input
                      id="emergency_contact_number"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.emergency_contact_number}
                      onChange={(e) => handleChange('emergency_contact_number', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Transport */}
            {activeSection === 'transport' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="transport_required"
                    checked={formData.transport_required}
                    onCheckedChange={(checked) => handleChange('transport_required', checked)}
                  />
                  <Label htmlFor="transport_required" className="text-sm font-normal cursor-pointer">
                    Transport facility required
                  </Label>
                </div>

                {formData.transport_required && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickup_point">Pickup Point</Label>
                      <Input
                        id="pickup_point"
                        placeholder="Enter pickup point"
                        value={formData.pickup_point}
                        onChange={(e) => handleChange('pickup_point', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="drop_point">Drop Point</Label>
                      <Input
                        id="drop_point"
                        placeholder="Enter drop point"
                        value={formData.drop_point}
                        onChange={(e) => handleChange('drop_point', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Review */}
            {activeSection === 'review' && (
              <div className="space-y-4 sm:space-y-6">
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Ready to Submit</p>
                        <p className="text-sm text-green-700 mt-1">
                          Please review all the information before submitting. You can go back to any section to make changes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Personal Information</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Name:</span> {formData.full_name || 'Not provided'}</p>
                      <p><span className="text-muted-foreground">Admission Number:</span> {formData.admission_number || 'Not provided'}</p>
                      <p><span className="text-muted-foreground">Gender:</span> {formData.gender || 'Not provided'}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Guardian Information</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Father:</span> {formData.father_name || 'Not provided'}</p>
                      <p><span className="text-muted-foreground">Mother:</span> {formData.mother_name || 'Not provided'}</p>
                      <p><span className="text-muted-foreground">Primary Guardian:</span> {formData.primary_guardian}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Academic Details</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Class:</span> {formData.class_id || 'Not provided'}</p>
                      <p><span className="text-muted-foreground">Section:</span> {formData.section_id || 'Not provided'}</p>
                      <p><span className="text-muted-foreground">Roll Number:</span> {formData.roll_number || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
        <Button
          variant="outline"
          onClick={goToPrevSection}
          disabled={getCurrentSectionIndex() === 0}
          className="sm:flex-1"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        {activeSection === 'review' ? (
          <Button onClick={handleSubmit} className="sm:flex-1 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
            <Save className="h-4 w-4 mr-2" />
            {isEditMode ? 'Update Student' : 'Add Student'}
          </Button>
        ) : (
          <Button onClick={goToNextSection} className="sm:flex-1 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
        </div>
      </div>
    </div>
  )
}
