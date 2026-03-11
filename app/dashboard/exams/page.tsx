'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookOpen, Plus, Edit, Trash2, FileText, GraduationCap, Award, Clock, Target, Users } from 'lucide-react'

// Mock data - Exam Types (Institute-wide)
const mockExamTypes = [
  { 
    id: 1, 
    name: 'Mid-Semester Test 1', 
    shortName: 'MST-1', 
    term: 'Term 1',
    duration: '2 hours',
    marksOutOf: 50,
    applicableToAllClasses: true
  },
  { 
    id: 2, 
    name: 'Mid-Semester Test 2', 
    shortName: 'MST-2', 
    term: 'Term 1',
    duration: '2 hours',
    marksOutOf: 50,
    applicableToAllClasses: true
  },
  { 
    id: 3, 
    name: 'Quarterly Examination', 
    shortName: 'Q1', 
    term: 'Term 2',
    duration: '3 hours',
    marksOutOf: 100,
    applicableToAllClasses: true
  },
  { 
    id: 4, 
    name: 'Half-Yearly Examination', 
    shortName: 'Half-Yearly', 
    term: 'Term 2',
    duration: '3 hours',
    marksOutOf: 100,
    applicableToAllClasses: true
  },
  { 
    id: 5, 
    name: 'Annual Examination', 
    shortName: 'Annual', 
    term: 'Term 3',
    duration: '3 hours',
    marksOutOf: 100,
    applicableToAllClasses: true
  },
  { 
    id: 6, 
    name: 'Unit Test', 
    shortName: 'UT', 
    term: 'Term 1',
    duration: '1 hour',
    marksOutOf: 10,
    applicableToAllClasses: true
  },
]

// Mock data - Subjects by Class and Section
const mockSubjectsByClass = [
  {
    class: '1',
    sections: [
      {
        section: 'A',
        students: 30,
        subjects: [
          { id: 1, name: 'English', code: 'ENG-1A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 2, name: 'Mathematics', code: 'MATH-1A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 3, name: 'Hindi', code: 'HIN-1A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 4, name: 'Environmental Studies', code: 'EVS-1A', hasTheory: true, hasPractical: true, theoryMarks: 70, practicalMarks: 30 },
        ]
      },
      {
        section: 'B',
        students: 28,
        subjects: [
          { id: 5, name: 'English', code: 'ENG-1B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 6, name: 'Mathematics', code: 'MATH-1B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 7, name: 'Hindi', code: 'HIN-1B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 8, name: 'Environmental Studies', code: 'EVS-1B', hasTheory: true, hasPractical: true, theoryMarks: 70, practicalMarks: 30 },
        ]
      }
    ]
  },
  {
    class: '2',
    sections: [
      {
        section: 'A',
        students: 32,
        subjects: [
          { id: 9, name: 'English', code: 'ENG-2A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 10, name: 'Mathematics', code: 'MATH-2A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 11, name: 'Hindi', code: 'HIN-2A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 12, name: 'Environmental Studies', code: 'EVS-2A', hasTheory: true, hasPractical: true, theoryMarks: 70, practicalMarks: 30 },
          { id: 13, name: 'Computer Science', code: 'CS-2A', hasTheory: true, hasPractical: true, theoryMarks: 60, practicalMarks: 40 },
        ]
      }
    ]
  },
  {
    class: '10',
    sections: [
      {
        section: 'A',
        students: 45,
        subjects: [
          { id: 14, name: 'Mathematics', code: 'MATH-10A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 15, name: 'Science', code: 'SCI-10A', hasTheory: true, hasPractical: true, theoryMarks: 80, practicalMarks: 20 },
          { id: 16, name: 'English', code: 'ENG-10A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 17, name: 'Social Studies', code: 'SST-10A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 18, name: 'Hindi', code: 'HIN-10A', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 19, name: 'Computer Applications', code: 'CA-10A', hasTheory: true, hasPractical: true, theoryMarks: 50, practicalMarks: 50 },
        ]
      },
      {
        section: 'B',
        students: 42,
        subjects: [
          { id: 20, name: 'Mathematics', code: 'MATH-10B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 21, name: 'Science', code: 'SCI-10B', hasTheory: true, hasPractical: true, theoryMarks: 80, practicalMarks: 20 },
          { id: 22, name: 'English', code: 'ENG-10B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 23, name: 'Social Studies', code: 'SST-10B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 24, name: 'Hindi', code: 'HIN-10B', hasTheory: true, hasPractical: false, theoryMarks: 100, practicalMarks: 0 },
          { id: 25, name: 'Computer Applications', code: 'CA-10B', hasTheory: true, hasPractical: true, theoryMarks: 50, practicalMarks: 50 },
        ]
      }
    ]
  }
]

export default function ExamsPage() {
  const [showAddExamDialog, setShowAddExamDialog] = useState(false)
  const [showAddSubjectDialog, setShowAddSubjectDialog] = useState(false)
  const [showEditExamDialog, setShowEditExamDialog] = useState(false)
  const [selectedClassSection, setSelectedClassSection] = useState<{class: string, section: string} | null>(null)
  const [showEditSubjectDialog, setShowEditSubjectDialog] = useState(false)
  const [selectedExam, setSelectedExam] = useState<any>(null)
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [selectedClass, setSelectedClass] = useState<string>('all')

  const filteredClasses = selectedClass === 'all' 
    ? mockSubjectsByClass 
    : mockSubjectsByClass.filter(c => c.class === selectedClass)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">Exams Management</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Configure exam types and subject allocation</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="border-2">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#1897C6]" />
                <Badge className="bg-[#1897C6] text-xs">{mockExamTypes.length}</Badge>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{mockExamTypes.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Exam Types</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <Badge className="bg-green-600 text-xs">{mockSubjectsByClass.length}</Badge>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{mockSubjectsByClass.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Classes</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                <Badge className="bg-purple-600 text-xs">
                  {mockSubjectsByClass.reduce((acc, c) => acc + c.sections.length, 0)}
                </Badge>
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {mockSubjectsByClass.reduce((acc, c) => acc + c.sections.length, 0)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Sections</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                <Badge className="bg-orange-600 text-xs">
                  {mockSubjectsByClass.reduce((acc, c) => 
                    acc + c.sections.reduce((sAcc, s) => sAcc + s.subjects.length, 0), 0
                  )}
                </Badge>
              </div>
              <p className="text-xl sm:text-2xl font-bold">
                {mockSubjectsByClass.reduce((acc, c) => 
                  acc + c.sections.reduce((sAcc, s) => sAcc + s.subjects.length, 0), 0
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Subjects</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="exam-types" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="exam-types" className="flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 text-xs sm:text-sm">
              <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="truncate">Exam Types</span>
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 text-xs sm:text-sm">
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="truncate">Subjects by Class</span>
            </TabsTrigger>
          </TabsList>

          {/* Exam Types Content */}
          <TabsContent value="exam-types" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Examination Types</CardTitle>
                    <CardDescription className="mt-1.5">
                      Define exam types that apply to all classes across the institute
                    </CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowAddExamDialog(true)} 
                    className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] w-full md:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exam Type
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {mockExamTypes.map((exam) => (
                    <Card key={exam.id} className="border-2 hover:border-[#1897C6] transition-colors">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                          <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center shrink-0">
                              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{exam.name}</h3>
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <Badge variant="outline" className="font-mono text-xs">{exam.shortName}</Badge>
                                <Badge className="bg-purple-600 text-xs">{exam.term}</Badge>
                                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span>{exam.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1897C6]">
                                  <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                  <span>{exam.marksOutOf} Marks</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 self-end sm:self-start">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedExam(exam)
                                setShowEditExamDialog(true)
                              }}
                              className="flex-1 sm:flex-none"
                            >
                              <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                              <span className="hidden sm:inline text-xs">Edit</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:bg-red-50 hover:text-red-700 flex-1 sm:flex-none"
                            >
                              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />
                              <span className="hidden sm:inline text-xs">Delete</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Content */}
          <TabsContent value="subjects" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Subject Configuration</CardTitle>
                    <CardDescription className="mt-1.5">
                      Manage subjects for each class and section
                    </CardDescription>
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {mockSubjectsByClass.map(c => (
                        <SelectItem key={c.class} value={c.class}>Class {c.class}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 sm:space-y-8">
                  {filteredClasses.map((classData) => (
                    <div key={classData.class}>
                      {/* Class Header */}
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 border-b-2">
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-[#1897C6]" />
                        <h3 className="text-base sm:text-lg font-bold">Class {classData.class}</h3>
                      </div>
                      
                      {/* Sections Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                        {classData.sections.map((section) => (
                          <Card key={section.section} className="border-2">
                            <CardHeader className="pb-4 bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] flex items-center justify-center">
                                    <GraduationCap className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <CardTitle className="text-base mb-1">Section {section.section}</CardTitle>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="secondary" className="text-xs">
                                        <Users className="h-3 w-3 mr-1" />
                                        {section.students}
                                      </Badge>
                                      <Badge className="bg-[#1897C6] text-xs">
                                        <BookOpen className="h-3 w-3 mr-1" />
                                        {section.subjects.length}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] shrink-0"
                                  onClick={() => {
                                    setSelectedClassSection({ class: classData.class, section: section.section })
                                    setShowAddSubjectDialog(true)
                                  }}
                                >
                                  <Plus className="h-3 w-3 sm:mr-1" />
                                  <span className="hidden sm:inline text-xs">Add Subject</span>
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <div className="space-y-3">
                                {section.subjects.map((subject) => (
                                  <Card key={subject.id} className="border hover:border-[#1897C6] hover:shadow-sm transition-all">
                                    <CardContent className="p-3 sm:p-4">
                                      <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                                            <BookOpen className="h-4 w-4 text-white" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm sm:text-base mb-1.5 truncate">{subject.name}</h4>
                                            <div className="flex flex-wrap items-center gap-1.5">
                                              <Badge variant="outline" className="text-xs font-mono">{subject.code}</Badge>
                                              {subject.hasTheory && (
                                                <Badge className="bg-blue-600 text-xs">Theory</Badge>
                                              )}
                                              {subject.hasPractical && (
                                                <Badge className="bg-green-600 text-xs">Practical</Badge>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex gap-1 shrink-0">
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 w-8 p-0 hover:bg-blue-50"
                                            onClick={() => {
                                              setSelectedSubject(subject)
                                              setShowEditSubjectDialog(true)
                                            }}
                                            title="Edit Subject"
                                          >
                                            <Edit className="h-3.5 w-3.5 text-blue-600" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                                            title="Delete Subject"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Exam Dialog */}
        <Dialog open={showAddExamDialog} onOpenChange={setShowAddExamDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Exam Type</DialogTitle>
              <DialogDescription>
                Create a new exam type that will be applicable to all classes
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="exam-name">Exam Name *</Label>
                <Input 
                  id="exam-name" 
                  placeholder="e.g., Mid-Semester Test 1" 
                  className="mt-1.5" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="short-name">Short Name *</Label>
                  <Input 
                    id="short-name" 
                    placeholder="e.g., MST-1" 
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label htmlFor="term">Term *</Label>
                  <Input 
                    id="term" 
                    placeholder="e.g., Term 1, Q1" 
                    className="mt-1.5" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration *</Label>
                  <Input 
                    id="duration" 
                    placeholder="e.g., 2 hours" 
                    className="mt-1.5" 
                  />
                </div>
                <div>
                  <Label htmlFor="marks-out-of">Marks Out Of *</Label>
                  <Input 
                    id="marks-out-of"
                    type="number"
                    min="10"
                    max="150"
                    placeholder="10-150" 
                    className="mt-1.5" 
                  />
                  <p className="text-xs text-muted-foreground mt-1">Range: 10 to 150 marks</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddExamDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                Add Exam Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Exam Dialog */}
        <Dialog open={showEditExamDialog} onOpenChange={setShowEditExamDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedExam && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Exam Type</DialogTitle>
                  <DialogDescription>
                    Update exam type details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="edit-exam-name">Exam Name *</Label>
                    <Input 
                      id="edit-exam-name" 
                      defaultValue={selectedExam.name}
                      className="mt-1.5" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-short-name">Short Name *</Label>
                      <Input 
                        id="edit-short-name" 
                        defaultValue={selectedExam.shortName}
                        className="mt-1.5" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-term">Term *</Label>
                      <Input 
                        id="edit-term" 
                        defaultValue={selectedExam.term}
                        className="mt-1.5" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-duration">Duration *</Label>
                      <Input 
                        id="edit-duration" 
                        defaultValue={selectedExam.duration}
                        className="mt-1.5" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-marks">Marks Out Of *</Label>
                      <Input 
                        id="edit-marks"
                        type="number"
                        min="10"
                        max="150"
                        defaultValue={selectedExam.marksOutOf}
                        className="mt-1.5" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">Range: 10 to 150 marks</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditExamDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                    Save Changes
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Subject Dialog */}
        <Dialog open={showAddSubjectDialog} onOpenChange={setShowAddSubjectDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Subject</DialogTitle>
              <DialogDescription>
                Add a new subject to Class {selectedClassSection?.class} Section {selectedClassSection?.section}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Selected Class & Section - Read Only */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Class {selectedClassSection?.class} - Section {selectedClassSection?.section}</p>
                    <p className="text-xs text-muted-foreground">Selected class and section</p>
                  </div>
                </div>
              </div>

              {/* Subject Name */}
              <div>
                <Label htmlFor="subject-name">Subject Name *</Label>
                <Input 
                  id="subject-name" 
                  placeholder="e.g., Mathematics, Science, English" 
                  className="mt-1.5" 
                />
              </div>

              {/* Auto-generated Code Preview */}
              <div className="p-3 bg-muted rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs text-muted-foreground">Auto-Generated Code</Label>
                    <p className="text-sm font-mono font-semibold mt-0.5">MATH-{selectedClassSection?.class}{selectedClassSection?.section}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Auto</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">Code will be generated based on subject name</p>
              </div>

              {/* Subject Type */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Subject Type *</Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all">
                    <input type="checkbox" defaultChecked className="rounded w-4 h-4 accent-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Theory</p>
                      <p className="text-xs text-muted-foreground">Written examination component</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-300 transition-all">
                    <input type="checkbox" className="rounded w-4 h-4 accent-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Practical</p>
                      <p className="text-xs text-muted-foreground">Hands-on practical component</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddSubjectDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                Add Subject
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Subject Dialog */}
        <Dialog open={showEditSubjectDialog} onOpenChange={setShowEditSubjectDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedSubject && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Subject</DialogTitle>
                  <DialogDescription>
                    Update subject details and marks distribution
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="edit-subject-name">Subject Name *</Label>
                    <Input 
                      id="edit-subject-name" 
                      defaultValue={selectedSubject.name}
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-subject-code">Subject Code *</Label>
                    <Input 
                      id="edit-subject-code" 
                      defaultValue={selectedSubject.code}
                      className="mt-1.5" 
                    />
                  </div>
                  
                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <h4 className="text-sm font-semibold mb-3">Marks Distribution</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded-lg border-2">
                        <div className="flex items-center gap-2 mb-3">
                          <input type="checkbox" defaultChecked={selectedSubject.hasTheory} className="rounded w-4 h-4" />
                          <Label className="text-sm font-medium">Theory Component</Label>
                        </div>
                        <Input 
                          type="number"
                          placeholder="Theory marks" 
                          defaultValue={selectedSubject.theoryMarks}
                        />
                      </div>

                      <div className="p-3 bg-white rounded-lg border-2">
                        <div className="flex items-center gap-2 mb-3">
                          <input type="checkbox" defaultChecked={selectedSubject.hasPractical} className="rounded w-4 h-4" />
                          <Label className="text-sm font-medium">Practical Component</Label>
                        </div>
                        <Input 
                          type="number"
                          placeholder="Practical marks" 
                          defaultValue={selectedSubject.practicalMarks}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEditSubjectDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3]">
                    Save Changes
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
