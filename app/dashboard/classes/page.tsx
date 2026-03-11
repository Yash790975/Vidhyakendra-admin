'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BookOpen, Plus, Edit, Trash2, Users, PlusCircle, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Section {
  id: string
  name: string
  capacity: number
  currentStrength: number
}

interface Class {
  id: string
  name: string
  sections: Section[]
  capacity?: number // Direct class capacity (when no sections)
  totalCapacity: number
  totalStudents: number
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: '1',
      sections: [
        { id: '1a', name: 'A', capacity: 30, currentStrength: 25 },
        { id: '1b', name: 'B', capacity: 30, currentStrength: 28 },
      ],
      totalCapacity: 60,
      totalStudents: 53,
    },
    {
      id: '2',
      name: '2',
      sections: [
        { id: '2a', name: 'A', capacity: 30, currentStrength: 27 },
        { id: '2b', name: 'B', capacity: 30, currentStrength: 29 },
      ],
      totalCapacity: 60,
      totalStudents: 56,
    },
    {
      id: '3',
      name: '3',
      sections: [
        { id: '3a', name: 'A', capacity: 35, currentStrength: 32 },
        { id: '3b', name: 'B', capacity: 35, currentStrength: 31 },
        { id: '3c', name: 'C', capacity: 35, currentStrength: 30 },
      ],
      totalCapacity: 105,
      totalStudents: 93,
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  
  const [newClassName, setNewClassName] = useState('')
  const [newClassCapacity, setNewClassCapacity] = useState('')
  const [newSections, setNewSections] = useState<Array<{ name: string; capacity: string }>>([
    { name: '', capacity: '' }
  ])

  const [newSectionName, setNewSectionName] = useState('')
  const [newSectionCapacity, setNewSectionCapacity] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const totalClasses = classes.length
  const totalSections = classes.reduce((sum, cls) => sum + cls.sections.length, 0)
  const totalCapacity = classes.reduce((sum, cls) => sum + cls.totalCapacity, 0)
  const totalStudents = classes.reduce((sum, cls) => sum + cls.totalStudents, 0)

  // Pagination calculations
  const totalPages = Math.ceil(classes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedClasses = classes.slice(startIndex, endIndex)

  const handleCreateClass = () => {
    if (!newClassName.trim()) return

    // Filter sections that have both name and capacity
    const validSections = newSections.filter(s => s.name.trim() && s.capacity)
    
    // Create sections only if valid ones exist
    const sections: Section[] = validSections.map((s, idx) => ({
      id: `${Date.now()}_${idx}`,
      name: s.name,
      capacity: parseInt(s.capacity),
      currentStrength: 0,
    }))

    // Calculate total capacity: from sections or direct class capacity
    const sectionCapacity = sections.reduce((sum, s) => sum + s.capacity, 0)
    const directCapacity = newClassCapacity ? parseInt(newClassCapacity) : 0
    const totalCapacity = sections.length > 0 ? sectionCapacity : directCapacity

    const newClass: Class = {
      id: Date.now().toString(),
      name: newClassName,
      sections, // This can be an empty array
      capacity: directCapacity || undefined,
      totalCapacity,
      totalStudents: 0,
    }

    console.log('[v0] Creating new class:', newClass)
    setClasses([...classes, newClass])
    setIsCreateDialogOpen(false)
    setNewClassName('')
    setNewClassCapacity('')
    setNewSections([{ name: '', capacity: '' }])
  }

  const handleAddSection = () => {
    if (!selectedClass || !newSectionName.trim() || !newSectionCapacity) return

    const newSection: Section = {
      id: Date.now().toString(),
      name: newSectionName,
      capacity: parseInt(newSectionCapacity),
      currentStrength: 0,
    }

    const updatedClasses = classes.map(cls => {
      if (cls.id === selectedClass.id) {
        return {
          ...cls,
          sections: [...cls.sections, newSection],
          totalCapacity: cls.totalCapacity + newSection.capacity,
        }
      }
      return cls
    })

    setClasses(updatedClasses)
    setIsAddSectionDialogOpen(false)
    setNewSectionName('')
    setNewSectionCapacity('')
    setSelectedClass(null)
  }

  const handleDeleteClass = (classId: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter(cls => cls.id !== classId))
    }
  }

  const handleDeleteSection = (classId: string, sectionId: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      const updatedClasses = classes.map(cls => {
        if (cls.id === classId) {
          const updatedSections = cls.sections.filter(s => s.id !== sectionId)
          return {
            ...cls,
            sections: updatedSections,
            totalCapacity: updatedSections.reduce((sum, s) => sum + s.capacity, 0),
            totalStudents: updatedSections.reduce((sum, s) => sum + s.currentStrength, 0),
          }
        }
        return cls
      })
      setClasses(updatedClasses)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
            Classes Management
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Create and manage classes and sections</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create New Class
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Classes</p>
                <p className="text-xl sm:text-2xl font-bold mt-1">{totalClasses}</p>
              </div>
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Sections</p>
                <p className="text-xl sm:text-2xl font-bold mt-1">{totalSections}</p>
              </div>
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#67BAC3] to-[#1897C6] text-white">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-xl sm:text-2xl font-bold mt-1">{totalCapacity}</p>
              </div>
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white">
                <PlusCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Students</p>
                <p className="text-xl sm:text-2xl font-bold mt-1">{totalStudents}</p>
              </div>
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D87331] to-[#D88931] text-white">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes List - Desktop */}
      <Card className="hidden md:block border-2">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">All Classes</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage your classes and sections</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5">
                  <TableHead className="font-semibold">Class Name</TableHead>
                  <TableHead className="font-semibold">Sections</TableHead>
                  <TableHead className="font-semibold">Capacity</TableHead>
                  <TableHead className="font-semibold">Students</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">Class {cls.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {cls.sections.length > 0 ? (
                          cls.sections.map((section) => (
                            <Badge key={section.id} variant="outline" className="text-xs">
                              {section.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground">No sections</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{cls.totalCapacity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{cls.totalStudents}</span>
                        <span className="text-xs text-muted-foreground">/ {cls.totalCapacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedClass(cls)
                            setIsAddSectionDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0"
                          title="Add Section"
                        >
                          <PlusCircle className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedClass(cls)
                            setIsEditDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0"
                          title="Edit Class"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClass(cls.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Delete Class"
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
        </CardContent>
      </Card>

      {/* Classes List - Mobile */}
      <div className="md:hidden space-y-3">
        {paginatedClasses.map((cls) => (
          <Card key={cls.id} className="border-2">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-base">Class {cls.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cls.totalStudents} / {cls.totalCapacity} Students
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {cls.sections.length} Sections
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cls.sections.map((section) => (
                    <Badge key={section.id} variant="outline" className="text-xs">
                      {section.name} ({section.currentStrength}/{section.capacity})
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedClass(cls)
                      setIsAddSectionDialogOpen(true)
                    }}
                    className="flex-1 text-xs gap-1"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Section
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedClass(cls)
                      setIsEditDialogOpen(true)
                    }}
                    className="flex-1 text-xs gap-1"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClass(cls.id)}
                    className="text-xs text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
                  {startIndex + 1}-{Math.min(endIndex, classes.length)} of {classes.length}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                >
                  <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-8 w-8 sm:h-9 sm:w-9 sm:w-auto sm:px-3 p-0 border-2 gap-2"
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
                        className={`h-8 w-8 sm:h-9 sm:w-9 p-0 border-2 font-semibold text-xs sm:text-sm ${
                          currentPage === pageNumber
                            ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3] text-white border-transparent'
                            : 'bg-transparent hover:bg-[#1897C6]/10'
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
                  className="h-8 w-8 sm:h-9 sm:w-9 sm:w-auto sm:px-3 p-0 border-2 gap-2"
                >
                  <span className="hidden sm:inline text-sm">Next</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0 border-2"
                >
                  <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Class Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Create New Class</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">Add a new class with optional sections</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <div className="space-y-2">
              <Label htmlFor="className" className="text-sm">Class Name <span className="text-red-500">*</span></Label>
              <Input
                id="className"
                placeholder="Enter class name (e.g., 1, 2, 10, etc.)"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="h-9 sm:h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classCapacity" className="text-sm">Class Capacity (Optional)</Label>
              <Input
                id="classCapacity"
                type="number"
                placeholder="Enter total capacity if no sections"
                value={newClassCapacity}
                onChange={(e) => setNewClassCapacity(e.target.value)}
                className="h-9 sm:h-10"
              />
              <p className="text-xs text-muted-foreground">
                Set this if you want a class without sections, or leave blank if adding sections below
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <Label className="text-sm">Sections (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setNewSections([...newSections, { name: '', capacity: '' }])}
                  className="gap-2 w-full sm:w-auto h-8 sm:h-9 text-xs sm:text-sm"
                >
                  <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Add Section
                </Button>
              </div>

              {newSections.map((section, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Section name (e.g., A, B, C)"
                      value={section.name}
                      onChange={(e) => {
                        const updated = [...newSections]
                        updated[index].name = e.target.value
                        setNewSections(updated)
                      }}
                      className="h-9 sm:h-10 text-sm"
                    />
                  </div>
                  <div className="flex gap-2 sm:w-auto">
                    <Input
                      type="number"
                      placeholder="Capacity"
                      value={section.capacity}
                      onChange={(e) => {
                        const updated = [...newSections]
                        updated[index].capacity = e.target.value
                        setNewSections(updated)
                      }}
                      className="flex-1 sm:w-32 h-9 sm:h-10 text-sm"
                    />
                    {newSections.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setNewSections(newSections.filter((_, i) => i !== index))}
                        className="text-red-600 h-9 sm:h-10 px-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleCreateClass} className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] w-full sm:w-auto">
              Create Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Class {selectedClass?.name}</DialogTitle>
            <DialogDescription>Manage sections for this class</DialogDescription>
          </DialogHeader>

          {selectedClass && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Sections</Label>
                <div className="space-y-2">
                  {selectedClass.sections.map((section) => (
                    <div key={section.id} className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">Section {section.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {section.currentStrength} / {section.capacity} students
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSection(selectedClass.id, section.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Section Dialog */}
      <Dialog open={isAddSectionDialogOpen} onOpenChange={setIsAddSectionDialogOpen}>
        <DialogContent className="max-w-full sm:max-w-md mx-3 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Add Section to Class {selectedClass?.name}</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">Create a new section for this class</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            <div className="space-y-2">
              <Label htmlFor="sectionName" className="text-sm">Section Name <span className="text-red-500">*</span></Label>
              <Input
                id="sectionName"
                placeholder="Enter section name (e.g., A, B, C)"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                className="h-9 sm:h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sectionCapacity" className="text-sm">Capacity <span className="text-red-500">*</span></Label>
              <Input
                id="sectionCapacity"
                type="number"
                placeholder="Enter section capacity"
                value={newSectionCapacity}
                onChange={(e) => setNewSectionCapacity(e.target.value)}
                className="h-9 sm:h-10"
              />
            </div>
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsAddSectionDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleAddSection} className="bg-gradient-to-r from-[#1897C6] to-[#67BAC3] w-full sm:w-auto">
              Add Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
