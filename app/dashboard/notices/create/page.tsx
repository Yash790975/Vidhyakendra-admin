'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Send, Upload, Pin, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function CreateNoticePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditMode = !!editId

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    fullDescription: '',
    docUrl: '',
    category: 'general',
    priority: 'medium',
    isPinned: false,
    publishDate: '',
    expiryDate: '',
    audienceType: 'all',
    specificClasses: [] as string[],
    specificSections: [] as string[],
    specificStudents: [] as string[],
    specificTeachers: [] as string[],
    studentFilterClass: '',
    studentSearch: '',
    teacherSearch: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  // Set default publish date on client side to avoid hydration mismatch
  useEffect(() => {
    if (!isEditMode && !formData.publishDate) {
      setFormData(prev => ({
        ...prev,
        publishDate: new Date().toISOString().split('T')[0]
      }))
    }
  }, [isEditMode, formData.publishDate])

  // Mock data for edit mode
  useEffect(() => {
    if (isEditMode && editId) {
      console.log('[v0] Loading notice data for edit:', editId)
      // Simulate loading existing notice data
      // In real implementation, this would fetch from API: /api/notices/${editId}
      setTimeout(() => {
        const mockNoticeData = {
          title: 'Annual Sports Day 2024',
          content: 'Annual Sports Day will be held on March 15, 2024. All students are requested to participate.',
          fullDescription: 'Annual Sports Day 2024 will feature various athletic competitions including track events, field events, relay races, and team sports. Students from all classes are encouraged to participate. Participation certificates will be provided to all participants, and winners will receive medals and trophies.',
          docUrl: '/documents/sports-day-schedule.pdf',
          category: 'events',
          priority: 'high',
          isPinned: true,
          publishDate: '2024-01-15',
          expiryDate: '2024-03-15',
          audience: {
            type: 'all',
            classIds: null,
            sectionIds: null,
            studentIds: null,
            teacherIds: null,
          }
        }

        setFormData({
          title: mockNoticeData.title,
          content: mockNoticeData.content,
          fullDescription: mockNoticeData.fullDescription,
          docUrl: mockNoticeData.docUrl,
          category: mockNoticeData.category,
          priority: mockNoticeData.priority,
          isPinned: mockNoticeData.isPinned,
          publishDate: mockNoticeData.publishDate,
          expiryDate: mockNoticeData.expiryDate,
          audienceType: mockNoticeData.audience.type,
          specificClasses: mockNoticeData.audience.classIds || [],
          specificSections: mockNoticeData.audience.sectionIds || [],
          specificStudents: mockNoticeData.audience.studentIds || [],
          specificTeachers: mockNoticeData.audience.teacherIds || [],
          studentFilterClass: '',
          studentSearch: '',
          teacherSearch: '',
        })
      }, 300)
    }
  }, [isEditMode, editId])

  const handleSubmit = (status: 'draft' | 'published') => (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const noticeData = {
      title: formData.title,
      content: formData.content,
      fullDescription: formData.fullDescription || null,
      docUrl: formData.docUrl || null,
      audience: {
        type: formData.audienceType,
        classIds: formData.audienceType === 'specific-classes' ? formData.specificClasses : null,
        sectionIds: formData.audienceType === 'specific-classes' ? formData.specificSections : null,
        batchIds: null,
        studentIds: formData.audienceType === 'specific-users' ? formData.specificStudents : null,
        teacherIds: formData.audienceType === 'specific-users' ? formData.specificTeachers : null,
      },
      category: formData.category,
      priority: formData.priority,
      isPinned: formData.isPinned,
      publishDate: new Date(formData.publishDate),
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null,
      status,
    }

    console.log('[v0] Notice form data:', noticeData)
    
    setTimeout(() => {
      setIsLoading(false)
      router.push('/dashboard/notices')
    }, 1000)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/dashboard/notices">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
            {isEditMode ? 'Edit Notice' : 'Create Notice'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isEditMode ? 'Update notice information' : 'Create a new notice or announcement'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit('published')} className="space-y-4 sm:space-y-6">
        {/* Basic Information */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Notice Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter notice title"
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium">
                Short Content <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Enter brief notice content (will be shown in previews)"
                rows={3}
                required
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Keep it concise - this will be displayed in the notice list
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription" className="text-sm font-medium">
                Full Description (Optional)
              </Label>
              <Textarea
                id="fullDescription"
                value={formData.fullDescription}
                onChange={(e) => handleChange('fullDescription', e.target.value)}
                placeholder="Enter detailed description (optional)"
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Provide additional details that will be shown when viewing the full notice
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                  <SelectTrigger id="category" className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium">
                  Priority <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                  <SelectTrigger id="priority" className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Pin className="h-4 w-4 text-red-500" />
                  <Label htmlFor="isPinned" className="font-medium text-sm cursor-pointer">
                    Pin this notice
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Pinned notices appear at the top of the list
                </p>
              </div>
              <Switch
                id="isPinned"
                checked={formData.isPinned}
                onCheckedChange={(checked) => handleChange('isPinned', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Date Settings */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Date Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="publishDate" className="text-sm font-medium">
                  Publish Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="publishDate"
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleChange('publishDate', e.target.value)}
                  required
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Notice will be visible from this date
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-medium">
                  Expiry Date (Optional)
                </Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleChange('expiryDate', e.target.value)}
                  min={formData.publishDate}
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Notice will be hidden after this date
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Target Audience</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audienceType" className="text-sm font-medium">
                Audience Type <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.audienceType} onValueChange={(value) => handleChange('audienceType', value)}>
                <SelectTrigger id="audienceType" className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All (Students, Teachers, Parents)</SelectItem>
                  <SelectItem value="teachers">Teachers Only</SelectItem>
                  <SelectItem value="students">Students Only</SelectItem>
                  <SelectItem value="specific-classes">Specific Classes</SelectItem>
                  <SelectItem value="specific-users">Specific Users</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.audienceType === 'specific-classes' && (
              <div className="space-y-3 p-4 rounded-lg bg-muted/50 border">
                <Label className="text-sm font-medium">Select Classes & Sections</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B', 'Class 11-Science', 'Class 12-Commerce'].map((cls) => (
                    <div key={cls} className="flex items-center space-x-2">
                      <Checkbox
                        id={cls}
                        checked={formData.specificClasses.includes(cls)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleChange('specificClasses', [...formData.specificClasses, cls])
                          } else {
                            handleChange('specificClasses', formData.specificClasses.filter((c) => c !== cls))
                          }
                        }}
                      />
                      <Label htmlFor={cls} className="text-sm font-normal cursor-pointer">
                        {cls}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.audienceType === 'specific-users' && (
              <div className="space-y-4">
                {/* Select Students */}
                <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-blue-900">Select Students</Label>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                      {formData.specificStudents.length} selected
                    </Badge>
                  </div>
                  
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-xs text-blue-700">Search by Name</Label>
                      <Input
                        type="text"
                        placeholder="Search students..."
                        value={formData.studentSearch || ''}
                        onChange={(e) => handleChange('studentSearch', e.target.value)}
                        className="h-9 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-blue-700">Filter by Class</Label>
                      <Select 
                        value={formData.studentFilterClass || 'all'}
                        onValueChange={(value) => handleChange('studentFilterClass', value === 'all' ? '' : value)}
                      >
                        <SelectTrigger className="h-9 bg-white">
                          <SelectValue placeholder="All Classes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classes</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                          <SelectItem value="10">Class 10</SelectItem>
                          <SelectItem value="11">Class 11</SelectItem>
                          <SelectItem value="12">Class 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-white rounded border">
                    {[
                      { id: 'S001', name: 'Rahul Sharma', class: '10', section: 'A' },
                      { id: 'S002', name: 'Priya Patel', class: '10', section: 'A' },
                      { id: 'S003', name: 'Amit Kumar', class: '11', section: 'B' },
                      { id: 'S004', name: 'Sneha Verma', class: '12', section: 'A' },
                    ]
                      .filter(student => {
                        const matchesClass = !formData.studentFilterClass || student.class === formData.studentFilterClass
                        const matchesSearch = !formData.studentSearch || 
                          student.name.toLowerCase().includes(formData.studentSearch.toLowerCase()) ||
                          student.id.toLowerCase().includes(formData.studentSearch.toLowerCase())
                        return matchesClass && matchesSearch
                      })
                      .map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-2 rounded hover:bg-blue-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={student.id}
                              checked={formData.specificStudents.includes(student.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleChange('specificStudents', [...formData.specificStudents, student.id])
                                } else {
                                  handleChange('specificStudents', formData.specificStudents.filter((s) => s !== student.id))
                                }
                              }}
                            />
                            <div>
                              <Label htmlFor={student.id} className="text-sm font-medium cursor-pointer">
                                {student.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">Class {student.class}-{student.section}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Select Teachers */}
                <div className="p-4 rounded-lg bg-green-50 border-2 border-green-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-green-900">Select Teachers</Label>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      {formData.specificTeachers.length} selected
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-green-700">Search by Name, Code or Email</Label>
                    <Input
                      type="text"
                      placeholder="Search teachers..."
                      value={formData.teacherSearch || ''}
                      onChange={(e) => handleChange('teacherSearch', e.target.value)}
                      className="h-9 bg-white"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-white rounded border">
                    {[
                      { id: 'T001', name: 'Rajesh Kumar Singh', code: 'TCH001', email: 'rajesh@school.edu', department: 'Science' },
                      { id: 'T002', name: 'Anjali Sharma', code: 'TCH002', email: 'anjali@school.edu', department: 'Mathematics' },
                      { id: 'T003', name: 'Vikram Patel', code: 'TCH003', email: 'vikram@school.edu', department: 'English' },
                      { id: 'T004', name: 'Sunita Verma', code: 'TCH004', email: 'sunita@school.edu', department: 'Hindi' },
                    ]
                      .filter(teacher => {
                        const search = (formData.teacherSearch || '').toLowerCase()
                        return !search || 
                          teacher.name.toLowerCase().includes(search) ||
                          teacher.code.toLowerCase().includes(search) ||
                          teacher.email.toLowerCase().includes(search)
                      })
                      .map((teacher) => (
                        <div key={teacher.id} className="flex items-center justify-between p-2 rounded hover:bg-green-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={teacher.id}
                              checked={formData.specificTeachers.includes(teacher.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  handleChange('specificTeachers', [...formData.specificTeachers, teacher.id])
                                } else {
                                  handleChange('specificTeachers', formData.specificTeachers.filter((t) => t !== teacher.id))
                                }
                              }}
                            />
                            <div>
                              <Label htmlFor={teacher.id} className="text-sm font-medium cursor-pointer">
                                {teacher.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">{teacher.code} | {teacher.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    {formData.specificStudents.length} students and {formData.specificTeachers.length} teachers selected
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attachment */}
        <Card className="border-2">
          <CardHeader className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Attachment (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="docUrl" className="text-sm font-medium">
                Document URL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="docUrl"
                  type="url"
                  value={formData.docUrl}
                  onChange={(e) => handleChange('docUrl', e.target.value)}
                  placeholder="https://example.com/document.pdf"
                  className="h-10"
                />
                <Button type="button" variant="outline" size="sm" className="gap-2 shrink-0">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Upload</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Add a link to any document, PDF, or file attachment
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="border-2 sticky bottom-0 z-10">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-sm text-muted-foreground">
                {isEditMode ? 'Update the notice information' : 'All required fields must be filled before publishing'}
              </p>
              <div className="flex gap-2 w-full sm:w-auto">
                <Link href="/dashboard/notices" className="flex-1 sm:flex-none">
                  <Button type="button" variant="outline" className="w-full h-10">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none gap-2 h-10"
                  onClick={handleSubmit('draft')}
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Save Draft</span>
                  <span className="sm:hidden">Draft</span>
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90 h-10"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Publish</span>
                  <span className="sm:hidden">Publish</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
