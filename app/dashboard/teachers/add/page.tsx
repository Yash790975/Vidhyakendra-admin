'use client'

export const dynamic = "force-dynamic";
// import React, { useState, useEffect } from 'react'
import React, { useState, useEffect, Suspense } from 'react'
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
import { ArrowLeft, ArrowRight, Save, User, Phone, MapPin, FileText, GraduationCap, Briefcase, CreditCard, CheckCircle2, AlertCircle, Plus, Trash2, Upload, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type SectionId = 'personal' | 'contact' | 'address' | 'documents' | 'professional' | 'qualification' | 'experience' | 'bank'

function AddTeacherContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditMode = !!editId
  
  const [activeSection, setActiveSection] = useState<SectionId>('personal')
  const [completedSections, setCompletedSections] = useState<SectionId[]>([])
  const [isLoading, setIsLoading] = useState(isEditMode)
  
  // Mock data for edit mode - In real app, fetch from API
  const mockTeacherData = {
    id: '1',
    full_name: 'Rajesh Kumar Singh',
    date_of_birth: '1990-05-15',
    gender: 'Male',
    blood_group: 'O+',
    nationality: 'Indian',
    religion: 'Hindu',
    category: 'General',
    marital_status: 'Married',
    spouse_name: 'Anjali Singh',
    father_name: 'Ram Kumar Singh',
    mother_name: 'Savita Devi',
    photo_url: '',
    email: 'rajesh.kumar@email.com',
    mobile: '+91 98765 43210',
    alternate_mobile: '+91 98765 43211',
    whatsapp_number: '+91 98765 43210',
    emergency_contact_name: 'Ram Kumar Singh',
    emergency_contact_relation: 'Father',
    emergency_contact_mobile: '+91 98765 43212',
    current_address: '123 MG Road',
    current_city: 'Mumbai',
    current_state: 'Maharashtra',
    current_pincode: '400001',
    permanent_address: '123 MG Road',
    permanent_city: 'Mumbai',
    permanent_state: 'Maharashtra',
    permanent_pincode: '400001',
    same_as_current: true,
    aadhaar_number: '1234 5678 9012',
    aadhaar_file_url: '',
    pan_number: 'ABCDE1234F',
    pan_file_url: '',
    driving_license: 'MH01 20230012345',
    passport_number: 'Z1234567',
    teacher_type: 'Permanent',
    employment_type: 'Full Time',
    designation: 'Senior Teacher',
    department: 'Science',
    joining_date: '2020-06-01',
    specialization: 'Physics',
    teaching_experience_years: '5',
    qualifications: [
      {
        qualification: 'M.Sc',
        degree_type: 'Post Graduate',
        specialization: 'Physics',
        institute_name: 'Mumbai University',
        university: 'Mumbai University',
        passing_year: '2015',
        marks_percentage: '85',
        file_url: ''
      }
    ],
    experiences: [
      {
        organization_name: 'ABC School',
        designation: 'Physics Teacher',
        from_date: '2015-07-01',
        to_date: '2020-05-31',
        is_current: false,
        responsibilities: 'Teaching Physics to 11th and 12th grade students'
      }
    ],
    bank_name: 'State Bank of India',
    account_holder_name: 'Rajesh Kumar Singh',
    account_number: '12345678901234',
    confirm_account_number: '12345678901234',
    ifsc_code: 'SBIN0001234',
    branch_name: 'MG Road Branch',
    account_type: 'Savings',
    upi_id: 'rajesh@oksbi'
  }
  
  // Form state matching schema
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: '',
    date_of_birth: '',
    gender: '',
    blood_group: '',
    nationality: 'Indian',
    religion: '',
    category: '',
    marital_status: '',
    spouse_name: '',
    father_name: '',
    mother_name: '',
    photo_url: '',
    
    // Contact Information
    email: '',
    mobile: '',
    alternate_mobile: '',
    whatsapp_number: '',
    emergency_contact_name: '',
    emergency_contact_relation: '',
    emergency_contact_mobile: '',
    
    // Address Information
    current_address: '',
    current_city: '',
    current_state: '',
    current_pincode: '',
    permanent_address: '',
    permanent_city: '',
    permanent_state: '',
    permanent_pincode: '',
    same_as_current: false,
    
    // Identity Documents
    aadhaar_number: '',
    aadhaar_file_url: '',
    pan_number: '',
    pan_file_url: '',
    driving_license: '',
    passport_number: '',
    
    // Professional Information
    teacher_type: '',
    employment_type: '',
    designation: '',
    department: '',
    joining_date: '',
    specialization: '',
    teaching_experience_years: '',
    
    // Qualifications
    qualifications: [
      {
        qualification: '',
        degree_type: '',
        specialization: '',
        institute_name: '',
        university: '',
        passing_year: '',
        marks_percentage: '',
        file_url: ''
      }
    ],
    
    // Experience
    experiences: [
      {
        organization_name: '',
        designation: '',
        from_date: '',
        to_date: '',
        is_current: false,
        responsibilities: ''
      }
    ],
    
    // Bank Details
    account_holder_name: '',
    bank_name: '',
    account_number: '',
    confirm_account_number: '',
    ifsc_code: '',
    branch_name: '',
    account_type: '',
    upi_id: '',
  })

  // Load edit data
  useEffect(() => {
    if (isEditMode && editId) {
      console.log('[v0] Loading teacher data for edit:', editId)
      // Simulate API call
      setTimeout(() => {
        setFormData(mockTeacherData as any)
        setIsLoading(false)
        console.log('[v0] Teacher data loaded successfully')
      }, 500)
    }
  }, [isEditMode, editId])

  const sections = [
    { id: 'personal' as SectionId, label: 'Personal Information', icon: User, required: true },
    { id: 'contact' as SectionId, label: 'Contact Information', icon: Phone, required: true },
    { id: 'address' as SectionId, label: 'Address Details', icon: Home, required: true },
    { id: 'documents' as SectionId, label: 'Identity Documents', icon: FileText, required: true },
    { id: 'professional' as SectionId, label: 'Professional Info', icon: Briefcase, required: true },
    { id: 'qualification' as SectionId, label: 'Qualifications', icon: GraduationCap, required: true },
    { id: 'experience' as SectionId, label: 'Experience', icon: Briefcase, required: false },
    { id: 'bank' as SectionId, label: 'Bank Details', icon: CreditCard, required: true },
  ]

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateSection = (sectionId: SectionId): boolean => {
    switch (sectionId) {
      case 'personal':
        return !!(formData.full_name && formData.date_of_birth && formData.gender && formData.father_name && formData.mother_name)
      case 'contact':
        return !!(formData.email && formData.mobile && formData.emergency_contact_name && formData.emergency_contact_mobile)
      case 'address':
        return !!(formData.current_address && formData.current_city && formData.current_state && formData.current_pincode &&
                 formData.permanent_address && formData.permanent_city && formData.permanent_state && formData.permanent_pincode)
      case 'documents':
        return !!(formData.aadhaar_number && formData.pan_number)
      case 'professional':
        return !!(formData.teacher_type && formData.employment_type && formData.designation && formData.joining_date && formData.department)
      case 'qualification':
        return !!(formData.qualifications[0].qualification && formData.qualifications[0].institute_name && formData.qualifications[0].passing_year)
      case 'bank':
        return !!(formData.account_holder_name && formData.bank_name && formData.account_number && 
                 formData.confirm_account_number && formData.ifsc_code && formData.account_number === formData.confirm_account_number)
      case 'experience':
        return true // Optional section
      default:
        return true
    }
  }

  const handleNext = () => {
    const currentValid = validateSection(activeSection)
    const currentSection = sections.find(s => s.id === activeSection)
    
    if (!currentValid && currentSection?.required) {
      alert('Please fill all required fields before proceeding')
      return
    }
    
    if (currentValid && !completedSections.includes(activeSection)) {
      setCompletedSections([...completedSections, activeSection])
    }
    
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection)
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id)
    }
  }

  const handleSectionClick = (sectionId: SectionId) => {
    setActiveSection(sectionId)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const allValid = sections
      .filter(s => s.required)
      .every(s => validateSection(s.id))
    
    if (!allValid) {
      alert('Please complete all required sections')
      return
    }
    
    console.log('[v0] Teacher form data:', formData)
    router.push('/dashboard/teachers/onboarding')
  }

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, {
        qualification: '',
        degree_type: '',
        specialization: '',
        institute_name: '',
        university: '',
        passing_year: '',
        marks_percentage: '',
        file_url: ''
      }]
    }))
  }

  const removeQualification = (index: number) => {
    if (formData.qualifications.length > 1) {
      setFormData(prev => ({
        ...prev,
        qualifications: prev.qualifications.filter((_, i) => i !== index)
      }))
    }
  }

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        organization_name: '',
        designation: '',
        from_date: '',
        to_date: '',
        is_current: false,
        responsibilities: ''
      }]
    }))
  }

  const removeExperience = (index: number) => {
    if (formData.experiences.length > 1) {
      setFormData(prev => ({
        ...prev,
        experiences: prev.experiences.filter((_, i) => i !== index)
      }))
    }
  }

  const copySameAddress = () => {
    if (formData.same_as_current) {
      setFormData(prev => ({
        ...prev,
        permanent_address: prev.current_address,
        permanent_city: prev.current_city,
        permanent_state: prev.current_state,
        permanent_pincode: prev.current_pincode,
      }))
    }
  }

  const getSectionStatus = (sectionId: SectionId) => {
    if (completedSections.includes(sectionId)) return 'completed'
    if (sectionId === activeSection) return 'active'
    return 'pending'
  }

  const getProgressPercentage = () => {
    const totalSections = sections.filter(s => s.required).length
    const completed = completedSections.filter(id => sections.find(s => s.id === id)?.required).length
    return (completed / totalSections) * 100
  }

  const currentSectionIndex = sections.findIndex(s => s.id === activeSection)
  const isLastSection = currentSectionIndex === sections.length - 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/teachers/onboarding">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h2 className="text-base font-semibold">{isEditMode ? 'Edit Teacher' : 'Add New Teacher'}</h2>
                <p className="text-xs text-muted-foreground hidden sm:block">{isEditMode ? 'Update information' : 'Complete all sections'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Progress:</span>
                <div className="w-32">
                  <Progress value={getProgressPercentage()} className="h-2" />
                </div>
                <span className="text-sm font-semibold">{Math.round(getProgressPercentage())}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation - Desktop */}
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <Card className="sticky top-24 shadow-md border-2">
              <CardHeader className="pb-4 bg-gradient-to-br from-[#1897C6]/5 to-[#67BAC3]/5">
                <CardTitle className="text-base">Sections</CardTitle>
                <CardDescription className="text-xs">
                  {completedSections.length} of {sections.filter(s => s.required).length} completed
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-1">
                  {sections.map((section, index) => {
                    const status = getSectionStatus(section.id)
                    const Icon = section.icon
                    
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg p-3 text-left transition-all",
                          status === 'active' && "bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white shadow-md",
                          status === 'pending' && "hover:bg-muted",
                          status === 'completed' && "bg-green-50 hover:bg-green-100"
                        )}
                      >
                        <div className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all",
                          status === 'active' && "bg-white/20",
                          status === 'pending' && "bg-muted",
                          status === 'completed' && "bg-green-200"
                        )}>
                          {status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Icon className={cn(
                              "h-5 w-5",
                              status === 'active' && "text-white",
                              status === 'pending' && "text-muted-foreground"
                            )} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className={cn(
                              "text-sm font-medium truncate",
                              status === 'active' && "text-white",
                              status === 'pending' && "text-foreground",
                              status === 'completed' && "text-green-700"
                            )}>
                              {section.label}
                            </p>
                            {section.required && status === 'pending' && (
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            )}
                          </div>
                          <p className={cn(
                            "text-xs mt-0.5",
                            status === 'active' && "text-white/80",
                            status === 'pending' && "text-muted-foreground",
                            status === 'completed' && "text-green-600"
                          )}>
                            Step {index + 1}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Mobile Section Selector */}
          <div className="lg:hidden">
            <Card className="shadow-md border-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Current Section</p>
                    <p className="text-xs text-muted-foreground">
                      Step {currentSectionIndex + 1} of {sections.length}
                    </p>
                  </div>
                  <Select value={activeSection} onValueChange={(value) => setActiveSection(value as SectionId)}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4">
                  <Progress value={getProgressPercentage()} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {Math.round(getProgressPercentage())}% Complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              <Card className="shadow-md border-2">
                <CardContent className="p-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#1897C6] border-t-transparent"></div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">Loading Teacher Data...</p>
                      <p className="text-sm text-muted-foreground mt-1">Please wait while we fetch the details</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmit}>
                <Card className="shadow-md border-2">
                <CardHeader className="bg-gradient-to-r from-[#1897C6]/10 to-[#67BAC3]/10 border-b">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white shadow-lg">
                      {React.createElement(sections.find(s => s.id === activeSection)?.icon || User, {
                        className: "h-6 w-6"
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl sm:text-2xl">
                        {sections.find(s => s.id === activeSection)?.label}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {sections.find(s => s.id === activeSection)?.required 
                          ? 'All fields marked with * are required' 
                          : 'Optional section - Fill if applicable'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  {/* Personal Information */}
                  {activeSection === 'personal' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <User className="h-5 w-5 text-[#1897C6]" />
                          Basic Information
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="full_name" className="text-sm font-medium">
                              Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="full_name"
                              value={formData.full_name}
                              onChange={(e) => handleChange('full_name', e.target.value)}
                              placeholder="Enter full name as per documents"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="date_of_birth" className="text-sm font-medium">
                              Date of Birth <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="date_of_birth"
                              type="date"
                              value={formData.date_of_birth}
                              onChange={(e) => handleChange('date_of_birth', e.target.value)}
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-medium">
                              Gender <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.gender} onValueChange={(value) => handleChange('gender', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="blood_group" className="text-sm font-medium">
                              Blood Group
                            </Label>
                            <Select value={formData.blood_group} onValueChange={(value) => handleChange('blood_group', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select blood group" />
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
                            <Label htmlFor="father_name" className="text-sm font-medium">
                              Father's Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="father_name"
                              value={formData.father_name}
                              onChange={(e) => handleChange('father_name', e.target.value)}
                              placeholder="Enter father's name"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="mother_name" className="text-sm font-medium">
                              Mother's Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="mother_name"
                              value={formData.mother_name}
                              onChange={(e) => handleChange('mother_name', e.target.value)}
                              placeholder="Enter mother's name"
                              className="h-11"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Additional Details</h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="marital_status" className="text-sm font-medium">
                              Marital Status
                            </Label>
                            <Select value={formData.marital_status} onValueChange={(value) => handleChange('marital_status', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Single">Single</SelectItem>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Divorced">Divorced</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {formData.marital_status === 'Married' && (
                            <div className="space-y-2">
                              <Label htmlFor="spouse_name" className="text-sm font-medium">
                                Spouse Name
                              </Label>
                              <Input
                                id="spouse_name"
                                value={formData.spouse_name}
                                onChange={(e) => handleChange('spouse_name', e.target.value)}
                                placeholder="Enter spouse name"
                                className="h-11"
                              />
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            <Label htmlFor="nationality" className="text-sm font-medium">
                              Nationality
                            </Label>
                            <Input
                              id="nationality"
                              value={formData.nationality}
                              onChange={(e) => handleChange('nationality', e.target.value)}
                              placeholder="Indian"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="religion" className="text-sm font-medium">
                              Religion
                            </Label>
                            <Input
                              id="religion"
                              value={formData.religion}
                              onChange={(e) => handleChange('religion', e.target.value)}
                              placeholder="Enter religion"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium">
                              Category
                            </Label>
                            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select category" />
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
                          
                          <div className="space-y-2">
                            <Label htmlFor="photo" className="text-sm font-medium">
                              Upload Photo
                            </Label>
                            <div className="flex items-center gap-3">
                              <Input
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="h-11"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">Max 2MB, JPG/PNG only</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  {activeSection === 'contact' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Phone className="h-5 w-5 text-[#1897C6]" />
                          Contact Details
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="teacher@example.com"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-sm font-medium">
                              Mobile Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="mobile"
                              value={formData.mobile}
                              onChange={(e) => handleChange('mobile', e.target.value)}
                              placeholder="+91 98765 43210"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="alternate_mobile" className="text-sm font-medium">
                              Alternate Mobile
                            </Label>
                            <Input
                              id="alternate_mobile"
                              value={formData.alternate_mobile}
                              onChange={(e) => handleChange('alternate_mobile', e.target.value)}
                              placeholder="+91 98765 43210"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="whatsapp_number" className="text-sm font-medium">
                              WhatsApp Number
                            </Label>
                            <Input
                              id="whatsapp_number"
                              value={formData.whatsapp_number}
                              onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                              placeholder="+91 98765 43210"
                              className="h-11"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-500" />
                          Emergency Contact
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="emergency_contact_name" className="text-sm font-medium">
                              Contact Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="emergency_contact_name"
                              value={formData.emergency_contact_name}
                              onChange={(e) => handleChange('emergency_contact_name', e.target.value)}
                              placeholder="Enter contact name"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="emergency_contact_relation" className="text-sm font-medium">
                              Relationship
                            </Label>
                            <Input
                              id="emergency_contact_relation"
                              value={formData.emergency_contact_relation}
                              onChange={(e) => handleChange('emergency_contact_relation', e.target.value)}
                              placeholder="e.g., Father, Mother, Spouse"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="emergency_contact_mobile" className="text-sm font-medium">
                              Contact Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="emergency_contact_mobile"
                              value={formData.emergency_contact_mobile}
                              onChange={(e) => handleChange('emergency_contact_mobile', e.target.value)}
                              placeholder="+91 98765 43210"
                              className="h-11"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Address Details */}
                  {activeSection === 'address' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Home className="h-5 w-5 text-[#1897C6]" />
                          Current Address
                        </h3>
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="current_address" className="text-sm font-medium">
                              Street Address <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="current_address"
                              value={formData.current_address}
                              onChange={(e) => handleChange('current_address', e.target.value)}
                              placeholder="Enter full address"
                              rows={3}
                              className="resize-none"
                            />
                          </div>
                          
                          <div className="grid gap-6 sm:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="current_city" className="text-sm font-medium">
                                City <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="current_city"
                                value={formData.current_city}
                                onChange={(e) => handleChange('current_city', e.target.value)}
                                placeholder="Enter city"
                                className="h-11"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="current_state" className="text-sm font-medium">
                                State <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="current_state"
                                value={formData.current_state}
                                onChange={(e) => handleChange('current_state', e.target.value)}
                                placeholder="Enter state"
                                className="h-11"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="current_pincode" className="text-sm font-medium">
                                PIN Code <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="current_pincode"
                                value={formData.current_pincode}
                                onChange={(e) => handleChange('current_pincode', e.target.value)}
                                placeholder="6-digit PIN"
                                maxLength={6}
                                className="h-11"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[#1897C6]" />
                            Permanent Address
                          </h3>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.same_as_current}
                              onChange={(e) => {
                                handleChange('same_as_current', e.target.checked)
                                if (e.target.checked) {
                                  copySameAddress()
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                            <span className="text-sm text-muted-foreground">Same as current</span>
                          </label>
                        </div>
                        
                        <div className="grid gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="permanent_address" className="text-sm font-medium">
                              Street Address <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="permanent_address"
                              value={formData.permanent_address}
                              onChange={(e) => handleChange('permanent_address', e.target.value)}
                              placeholder="Enter full address"
                              rows={3}
                              className="resize-none"
                              disabled={formData.same_as_current}
                            />
                          </div>
                          
                          <div className="grid gap-6 sm:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="permanent_city" className="text-sm font-medium">
                                City <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="permanent_city"
                                value={formData.permanent_city}
                                onChange={(e) => handleChange('permanent_city', e.target.value)}
                                placeholder="Enter city"
                                className="h-11"
                                disabled={formData.same_as_current}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="permanent_state" className="text-sm font-medium">
                                State <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="permanent_state"
                                value={formData.permanent_state}
                                onChange={(e) => handleChange('permanent_state', e.target.value)}
                                placeholder="Enter state"
                                className="h-11"
                                disabled={formData.same_as_current}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="permanent_pincode" className="text-sm font-medium">
                                PIN Code <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="permanent_pincode"
                                value={formData.permanent_pincode}
                                onChange={(e) => handleChange('permanent_pincode', e.target.value)}
                                placeholder="6-digit PIN"
                                maxLength={6}
                                className="h-11"
                                disabled={formData.same_as_current}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Identity Documents */}
                  {activeSection === 'documents' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-[#1897C6]" />
                          Identity Documents
                        </h3>
                        
                        <div className="space-y-6">
                          {/* Aadhaar */}
                          <Card className="border-2">
                            <CardContent className="p-5">
                              <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="aadhaar_number" className="text-sm font-medium">
                                    Aadhaar Number <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="aadhaar_number"
                                    value={formData.aadhaar_number}
                                    onChange={(e) => handleChange('aadhaar_number', e.target.value)}
                                    placeholder="XXXX XXXX XXXX"
                                    maxLength={12}
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="aadhaar_file" className="text-sm font-medium">
                                    Upload Aadhaar
                                  </Label>
                                  <div className="flex gap-2">
                                    <Input
                                      id="aadhaar_file"
                                      type="file"
                                      accept=".pdf,.jpg,.jpeg,.png"
                                      className="h-11"
                                    />
                                  </div>
                                  <p className="text-xs text-muted-foreground">PDF or Image, Max 5MB</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* PAN */}
                          <Card className="border-2">
                            <CardContent className="p-5">
                              <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="pan_number" className="text-sm font-medium">
                                    PAN Number <span className="text-red-500">*</span>
                                  </Label>
                                  <Input
                                    id="pan_number"
                                    value={formData.pan_number}
                                    onChange={(e) => handleChange('pan_number', e.target.value.toUpperCase())}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="pan_file" className="text-sm font-medium">
                                    Upload PAN
                                  </Label>
                                  <Input
                                    id="pan_file"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="h-11"
                                  />
                                  <p className="text-xs text-muted-foreground">PDF or Image, Max 5MB</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Optional Documents */}
                          <Card className="border-2 border-dashed">
                            <CardContent className="p-5">
                              <h4 className="text-sm font-semibold mb-4">Optional Documents</h4>
                              <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label htmlFor="driving_license" className="text-sm font-medium">
                                    Driving License Number
                                  </Label>
                                  <Input
                                    id="driving_license"
                                    value={formData.driving_license}
                                    onChange={(e) => handleChange('driving_license', e.target.value)}
                                    placeholder="Enter DL number"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="passport_number" className="text-sm font-medium">
                                    Passport Number
                                  </Label>
                                  <Input
                                    id="passport_number"
                                    value={formData.passport_number}
                                    onChange={(e) => handleChange('passport_number', e.target.value.toUpperCase())}
                                    placeholder="Enter passport number"
                                    className="h-11"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Professional Information */}
                  {activeSection === 'professional' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-[#1897C6]" />
                          Professional Details
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="teacher_type" className="text-sm font-medium">
                              Teacher Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.teacher_type} onValueChange={(value) => handleChange('teacher_type', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Primary">Primary Teacher</SelectItem>
                                <SelectItem value="Secondary">Secondary Teacher</SelectItem>
                                <SelectItem value="Senior Secondary">Senior Secondary Teacher</SelectItem>
                                <SelectItem value="Subject Specialist">Subject Specialist</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="employment_type" className="text-sm font-medium">
                              Employment Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.employment_type} onValueChange={(value) => handleChange('employment_type', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Permanent">Permanent</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Guest">Guest Faculty</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="designation" className="text-sm font-medium">
                              Designation <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="designation"
                              value={formData.designation}
                              onChange={(e) => handleChange('designation', e.target.value)}
                              placeholder="e.g., Senior Teacher, Lecturer"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="department" className="text-sm font-medium">
                              Department <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="department"
                              value={formData.department}
                              onChange={(e) => handleChange('department', e.target.value)}
                              placeholder="e.g., Science, Mathematics"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="joining_date" className="text-sm font-medium">
                              Joining Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="joining_date"
                              type="date"
                              value={formData.joining_date}
                              onChange={(e) => handleChange('joining_date', e.target.value)}
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="teaching_experience_years" className="text-sm font-medium">
                              Total Teaching Experience (Years)
                            </Label>
                            <Input
                              id="teaching_experience_years"
                              type="number"
                              value={formData.teaching_experience_years}
                              onChange={(e) => handleChange('teaching_experience_years', e.target.value)}
                              placeholder="e.g., 5"
                              min="0"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="specialization" className="text-sm font-medium">
                              Specialization/Subject Expertise
                            </Label>
                            <Input
                              id="specialization"
                              value={formData.specialization}
                              onChange={(e) => handleChange('specialization', e.target.value)}
                              placeholder="e.g., Physics, Chemistry, Mathematics"
                              className="h-11"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Qualifications */}
                  {activeSection === 'qualification' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-[#1897C6]" />
                          Educational Qualifications
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addQualification}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add More
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        {formData.qualifications.map((qual, index) => (
                          <Card key={index} className="border-2">
                            <CardHeader className="pb-4 bg-muted/30">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">
                                  Qualification {index + 1}
                                  {index === 0 && <span className="text-red-500 ml-1">*</span>}
                                </CardTitle>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeQualification(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-5">
                              <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Qualification {index === 0 && <span className="text-red-500">*</span>}
                                  </Label>
                                  <Select
                                    value={qual.qualification}
                                    onValueChange={(value) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].qualification = value
                                      handleChange('qualifications', newQuals)
                                    }}
                                  >
                                    <SelectTrigger className="h-11">
                                      <SelectValue placeholder="Select qualification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="B.Ed">B.Ed</SelectItem>
                                      <SelectItem value="M.Ed">M.Ed</SelectItem>
                                      <SelectItem value="B.A">B.A</SelectItem>
                                      <SelectItem value="M.A">M.A</SelectItem>
                                      <SelectItem value="B.Sc">B.Sc</SelectItem>
                                      <SelectItem value="M.Sc">M.Sc</SelectItem>
                                      <SelectItem value="B.Com">B.Com</SelectItem>
                                      <SelectItem value="M.Com">M.Com</SelectItem>
                                      <SelectItem value="Ph.D">Ph.D</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Degree Type
                                  </Label>
                                  <Select
                                    value={qual.degree_type}
                                    onValueChange={(value) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].degree_type = value
                                      handleChange('qualifications', newQuals)
                                    }}
                                  >
                                    <SelectTrigger className="h-11">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Full Time">Full Time</SelectItem>
                                      <SelectItem value="Part Time">Part Time</SelectItem>
                                      <SelectItem value="Distance">Distance</SelectItem>
                                      <SelectItem value="Online">Online</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Specialization
                                  </Label>
                                  <Input
                                    value={qual.specialization}
                                    onChange={(e) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].specialization = e.target.value
                                      handleChange('qualifications', newQuals)
                                    }}
                                    placeholder="e.g., Physics, Chemistry"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Institute Name {index === 0 && <span className="text-red-500">*</span>}
                                  </Label>
                                  <Input
                                    value={qual.institute_name}
                                    onChange={(e) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].institute_name = e.target.value
                                      handleChange('qualifications', newQuals)
                                    }}
                                    placeholder="Enter institute name"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    University
                                  </Label>
                                  <Input
                                    value={qual.university}
                                    onChange={(e) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].university = e.target.value
                                      handleChange('qualifications', newQuals)
                                    }}
                                    placeholder="Enter university name"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Passing Year {index === 0 && <span className="text-red-500">*</span>}
                                  </Label>
                                  <Input
                                    value={qual.passing_year}
                                    onChange={(e) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].passing_year = e.target.value
                                      handleChange('qualifications', newQuals)
                                    }}
                                    placeholder="YYYY"
                                    maxLength={4}
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Marks/Percentage
                                  </Label>
                                  <Input
                                    value={qual.marks_percentage}
                                    onChange={(e) => {
                                      const newQuals = [...formData.qualifications]
                                      newQuals[index].marks_percentage = e.target.value
                                      handleChange('qualifications', newQuals)
                                    }}
                                    placeholder="e.g., 85%"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Upload Certificate
                                  </Label>
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="h-11"
                                  />
                                  <p className="text-xs text-muted-foreground">PDF or Image, Max 5MB</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-[#1897C6]" />
                          Work Experience
                        </h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addExperience}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Add More
                        </Button>
                      </div>
                      
                      <div className="space-y-6">
                        {formData.experiences.map((exp, index) => (
                          <Card key={index} className="border-2">
                            <CardHeader className="pb-4 bg-muted/30">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base">
                                  Experience {index + 1}
                                </CardTitle>
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-5">
                              <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Organization Name
                                  </Label>
                                  <Input
                                    value={exp.organization_name}
                                    onChange={(e) => {
                                      const newExps = [...formData.experiences]
                                      newExps[index].organization_name = e.target.value
                                      handleChange('experiences', newExps)
                                    }}
                                    placeholder="Enter organization name"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    Designation
                                  </Label>
                                  <Input
                                    value={exp.designation}
                                    onChange={(e) => {
                                      const newExps = [...formData.experiences]
                                      newExps[index].designation = e.target.value
                                      handleChange('experiences', newExps)
                                    }}
                                    placeholder="Enter designation"
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    From Date
                                  </Label>
                                  <Input
                                    type="date"
                                    value={exp.from_date}
                                    onChange={(e) => {
                                      const newExps = [...formData.experiences]
                                      newExps[index].from_date = e.target.value
                                      handleChange('experiences', newExps)
                                    }}
                                    className="h-11"
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">
                                    To Date
                                  </Label>
                                  <Input
                                    type="date"
                                    value={exp.to_date}
                                    onChange={(e) => {
                                      const newExps = [...formData.experiences]
                                      newExps[index].to_date = e.target.value
                                      handleChange('experiences', newExps)
                                    }}
                                    className="h-11"
                                    disabled={exp.is_current}
                                  />
                                </div>
                                
                                <div className="space-y-2 sm:col-span-2">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={exp.is_current}
                                      onChange={(e) => {
                                        const newExps = [...formData.experiences]
                                        newExps[index].is_current = e.target.checked
                                        if (e.target.checked) {
                                          newExps[index].to_date = ''
                                        }
                                        handleChange('experiences', newExps)
                                      }}
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <span className="text-sm">Currently working here</span>
                                  </label>
                                </div>
                                
                                <div className="space-y-2 sm:col-span-2">
                                  <Label className="text-sm font-medium">
                                    Responsibilities
                                  </Label>
                                  <Textarea
                                    value={exp.responsibilities}
                                    onChange={(e) => {
                                      const newExps = [...formData.experiences]
                                      newExps[index].responsibilities = e.target.value
                                      handleChange('experiences', newExps)
                                    }}
                                    placeholder="Describe key responsibilities"
                                    rows={3}
                                    className="resize-none"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bank Details */}
                  {activeSection === 'bank' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-[#1897C6]" />
                          Bank Account Details
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="account_holder_name" className="text-sm font-medium">
                              Account Holder Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="account_holder_name"
                              value={formData.account_holder_name}
                              onChange={(e) => handleChange('account_holder_name', e.target.value)}
                              placeholder="As per bank records"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bank_name" className="text-sm font-medium">
                              Bank Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="bank_name"
                              value={formData.bank_name}
                              onChange={(e) => handleChange('bank_name', e.target.value)}
                              placeholder="e.g., State Bank of India"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="account_number" className="text-sm font-medium">
                              Account Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="account_number"
                              value={formData.account_number}
                              onChange={(e) => handleChange('account_number', e.target.value)}
                              placeholder="Enter account number"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm_account_number" className="text-sm font-medium">
                              Confirm Account Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="confirm_account_number"
                              value={formData.confirm_account_number}
                              onChange={(e) => handleChange('confirm_account_number', e.target.value)}
                              placeholder="Re-enter account number"
                              className="h-11"
                            />
                            {formData.account_number && formData.confirm_account_number && 
                             formData.account_number !== formData.confirm_account_number && (
                              <p className="text-xs text-red-500">Account numbers do not match</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="ifsc_code" className="text-sm font-medium">
                              IFSC Code <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="ifsc_code"
                              value={formData.ifsc_code}
                              onChange={(e) => handleChange('ifsc_code', e.target.value.toUpperCase())}
                              placeholder="e.g., SBIN0001234"
                              maxLength={11}
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="branch_name" className="text-sm font-medium">
                              Branch Name
                            </Label>
                            <Input
                              id="branch_name"
                              value={formData.branch_name}
                              onChange={(e) => handleChange('branch_name', e.target.value)}
                              placeholder="Enter branch name"
                              className="h-11"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="account_type" className="text-sm font-medium">
                              Account Type
                            </Label>
                            <Select value={formData.account_type} onValueChange={(value) => handleChange('account_type', value)}>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Savings">Savings</SelectItem>
                                <SelectItem value="Current">Current</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="upi_id" className="text-sm font-medium">
                              UPI ID (Optional)
                            </Label>
                            <Input
                              id="upi_id"
                              value={formData.upi_id}
                              onChange={(e) => handleChange('upi_id', e.target.value)}
                              placeholder="yourname@upi"
                              className="h-11"
                            />
                          </div>
                        </div>
                      </div>

                      <Card className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-blue-900">Important Note</p>
                              <p className="text-xs text-blue-800">
                                Please ensure that the account details are correct. Salary will be credited to this account.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>

                {/* Footer Navigation */}
                <div className="border-t bg-muted/30 px-6 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentSectionIndex === 0}
                      className="gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Step {currentSectionIndex + 1} of {sections.length}
                      </span>
                    </div>
                    
                    {isLastSection ? (
                      <Button
                        type="submit"
                        className="gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90"
                      >
                        <Save className="h-4 w-4" />
                        {isEditMode ? 'Update Teacher Information' : 'Submit for Onboarding'}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </form>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}


export default function AddTeacherPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#1897C6] border-t-transparent" />
      </div>
    }>
      <AddTeacherContent />
    </Suspense>
  )
}
