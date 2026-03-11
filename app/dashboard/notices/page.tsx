'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  User,
  FileText,
  Bell,
  Filter,
  Download,
  Pin,
  PinOff,
  Archive,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'

// Mock data matching schema
const mockNotices = [
  {
    id: '1',
    title: 'Annual Sports Day 2024',
    content: 'Annual Sports Day will be held on March 15, 2024. All students are required to participate.',
    fullDescription: 'Annual Sports Day 2024 will feature various athletic competitions including track and field events, team sports, and cultural performances. Students from all grades are encouraged to participate. Registration forms are available at the sports office.',
    docUrl: '/documents/sports-day-2024.pdf',
    instituteId: 'inst001',
    createdBy: 'admin001',
    createdByRole: 'institute_admin',
    audience: {
      type: 'all',
      classIds: null,
      sectionIds: null,
      batchIds: null,
      studentIds: null,
      teacherIds: null,
    },
    category: 'events',
    priority: 'high',
    isPinned: true,
    publishDate: '2024-01-15T00:00:00Z',
    expiryDate: '2024-03-15T23:59:59Z',
    status: 'published',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-12T15:30:00Z',
  },
  {
    id: '2',
    title: 'Mid-Term Exam Schedule Released',
    content: 'Mid-term examinations will commence from February 20, 2024.',
    fullDescription: 'The mid-term examination schedule for all classes has been finalized. Please check the detailed timetable attached. Students are advised to prepare accordingly.',
    docUrl: '/documents/exam-schedule.pdf',
    instituteId: 'inst001',
    createdBy: 'teacher001',
    createdByRole: 'teacher',
    audience: {
      type: 'students',
      classIds: ['class001', 'class002'],
      sectionIds: null,
      batchIds: null,
      studentIds: null,
      teacherIds: null,
    },
    category: 'academic',
    priority: 'high',
    isPinned: true,
    publishDate: '2024-01-20T00:00:00Z',
    expiryDate: '2024-02-20T23:59:59Z',
    status: 'published',
    created_at: '2024-01-18T14:00:00Z',
    updated_at: null,
  },
  {
    id: '3',
    title: 'Republic Day Holiday',
    content: 'The institute will remain closed on January 26, 2024 on account of Republic Day.',
    fullDescription: null,
    docUrl: null,
    instituteId: 'inst001',
    createdBy: 'admin001',
    createdByRole: 'institute_admin',
    audience: {
      type: 'all',
      classIds: null,
      sectionIds: null,
      batchIds: null,
      studentIds: null,
      teacherIds: null,
    },
    category: 'holiday',
    priority: 'medium',
    isPinned: false,
    publishDate: '2024-01-10T00:00:00Z',
    expiryDate: '2024-01-27T23:59:59Z',
    status: 'published',
    created_at: '2024-01-08T09:00:00Z',
    updated_at: null,
  },
  {
    id: '4',
    title: 'Parent-Teacher Meeting',
    content: 'Parent-Teacher meeting scheduled for February 10, 2024.',
    fullDescription: 'Parents are requested to attend the PTM to discuss student progress and academic performance.',
    docUrl: null,
    instituteId: 'inst001',
    createdBy: 'admin001',
    createdByRole: 'institute_admin',
    audience: {
      type: 'all',
      classIds: null,
      sectionIds: null,
      batchIds: null,
      studentIds: null,
      teacherIds: null,
    },
    category: 'general',
    priority: 'medium',
    isPinned: false,
    publishDate: '2024-01-25T00:00:00Z',
    expiryDate: '2024-02-10T23:59:59Z',
    status: 'draft',
    created_at: '2024-01-23T11:00:00Z',
    updated_at: '2024-01-24T16:20:00Z',
  },
  {
    id: '5',
    title: 'URGENT: Fee Payment Deadline',
    content: 'Last date for fee payment is January 31, 2024.',
    fullDescription: 'Students who fail to pay fees by the deadline will face late payment penalties. Please contact the accounts office for any queries.',
    docUrl: null,
    instituteId: 'inst001',
    createdBy: 'admin001',
    createdByRole: 'institute_admin',
    audience: {
      type: 'students',
      classIds: null,
      sectionIds: null,
      batchIds: null,
      studentIds: null,
      teacherIds: null,
    },
    category: 'urgent',
    priority: 'high',
    isPinned: true,
    publishDate: '2024-01-20T00:00:00Z',
    expiryDate: '2024-01-31T23:59:59Z',
    status: 'published',
    created_at: '2024-01-19T08:00:00Z',
    updated_at: null,
  },
]

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<'published' | 'draft' | 'archived' | 'expired'>('published')
  const [viewNotice, setViewNotice] = useState<typeof mockNotices[0] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const publishedNotices = mockNotices.filter(n => n.status === 'published')
  const draftNotices = mockNotices.filter(n => n.status === 'draft')
  const archivedNotices = mockNotices.filter(n => n.status === 'archived')
  const expiredNotices = mockNotices.filter(n => n.status === 'expired')

  const handleDelete = (id: string) => {
    console.log('[v0] Deleting notice:', id)
    // TODO: Implement delete API call
  }

  const handleTogglePin = (id: string) => {
    console.log('[v0] Toggling pin for notice:', id)
    // TODO: Implement toggle pin API call
  }

  const handleArchive = (id: string) => {
    console.log('[v0] Archiving notice:', id)
    // TODO: Implement archive API call
  }

  const getCategoryConfig = (category: string) => {
    const configs: Record<string, { label: string; className: string }> = {
      urgent: { label: 'Urgent', className: 'bg-red-50 text-red-700 border-red-300' },
      academic: { label: 'Academic', className: 'bg-blue-50 text-blue-700 border-blue-300' },
      events: { label: 'Events', className: 'bg-purple-50 text-purple-700 border-purple-300' },
      news: { label: 'News', className: 'bg-green-50 text-green-700 border-green-300' },
      general: { label: 'General', className: 'bg-[#1897C6]/10 text-[#1897C6] border-[#1897C6]/30' },
      holiday: { label: 'Holiday', className: 'bg-[#F1AF37]/10 text-[#F1AF37] border-[#F1AF37]/30' },
    }
    return configs[category] || configs.general
  }

  const getPriorityConfig = (priority: string | null) => {
    if (!priority) return null
    const configs: Record<string, { label: string; className: string }> = {
      high: { label: 'High Priority', className: 'bg-red-50 text-red-700 border-red-300' },
      medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 border-amber-300' },
      low: { label: 'Low', className: 'bg-blue-50 text-blue-700 border-blue-300' },
    }
    return configs[priority]
  }

  const getAudienceLabel = (audience: typeof mockNotices[0]['audience']) => {
    if (audience.type === 'all') return 'All'
    if (audience.type === 'teachers') return 'Teachers'
    if (audience.type === 'students') return 'Students'
    if (audience.type === 'specific-classes') return `${audience.classIds?.length || 0} Classes`
    if (audience.type === 'specific-users') return 'Specific Users'
    return audience.type
  }

  const filteredNotices = (() => {
    let notices = selectedStatus === 'published' ? publishedNotices :
                   selectedStatus === 'draft' ? draftNotices :
                   selectedStatus === 'archived' ? archivedNotices : expiredNotices

    if (selectedCategory !== 'all') {
      notices = notices.filter(n => n.category === selectedCategory)
    }

    if (searchQuery) {
      notices = notices.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return notices.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  })()

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
            Notices & Announcements
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage institute notices, events, and announcements
          </p>
        </div>
        <Link href="/dashboard/notices/create">
          <Button className="w-full sm:w-auto gap-2 bg-gradient-to-r from-[#1897C6] to-[#67BAC3] hover:from-[#1897C6]/90 hover:to-[#67BAC3]/90">
            <Plus className="h-4 w-4" />
            <span>Create Notice</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold">{publishedNotices.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold">{draftNotices.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white">
                <Pin className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold">
                  {mockNotices.filter(n => n.isPinned).length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Pinned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 text-white">
                <Archive className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold">{archivedNotices.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Archived</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-2">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <Tabs value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                <TabsTrigger value="published" className="text-xs sm:text-sm">
                  Published ({publishedNotices.length})
                </TabsTrigger>
                <TabsTrigger value="draft" className="text-xs sm:text-sm">
                  Drafts ({draftNotices.length})
                </TabsTrigger>
                <TabsTrigger value="archived" className="text-xs sm:text-sm">
                  Archived ({archivedNotices.length})
                </TabsTrigger>
                <TabsTrigger value="expired" className="text-xs sm:text-sm">
                  Expired ({expiredNotices.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search notices by title or content..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3]' : ''}
                >
                  All
                </Button>
                {['urgent', 'academic', 'events', 'news', 'general', 'holiday'].map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? 'bg-gradient-to-r from-[#1897C6] to-[#67BAC3] whitespace-nowrap' : 'whitespace-nowrap'}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notices Table - Desktop */}
      <Card className="border-2 hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 hover:from-[#1897C6]/5 hover:to-[#67BAC3]/5">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Audience</TableHead>
                <TableHead className="font-semibold">Publish Date</TableHead>
                <TableHead className="font-semibold">Expiry Date</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedNotices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No notices found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedNotices.map((notice) => {
                  const categoryConfig = getCategoryConfig(notice.category)
                  const priorityConfig = getPriorityConfig(notice.priority)
                  
                  return (
                    <TableRow key={notice.id} className="hover:bg-gradient-to-r hover:from-[#1897C6]/5 hover:to-transparent">
                      <TableCell className="py-4">
                        <div className="flex items-start gap-2">
                          {notice.isPinned && (
                            <Pin className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-sm">{notice.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{notice.content}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col gap-1">
                          <Badge className={`${categoryConfig.className} text-xs w-fit`}>
                            {categoryConfig.label}
                          </Badge>
                          {priorityConfig && (
                            <Badge className={`${priorityConfig.className} text-xs w-fit`}>
                              {priorityConfig.label}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{getAudienceLabel(notice.audience)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span suppressHydrationWarning>{new Date(notice.publishDate).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {notice.expiryDate ? (
                          <div className="flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span suppressHydrationWarning>{new Date(notice.expiryDate).toLocaleDateString()}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">No expiry</span>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-[#1897C6]/10 hover:text-[#1897C6]"
                            onClick={() => setViewNotice(notice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Link href={`/dashboard/notices/create?edit=${notice.id}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-[#F1AF37]/10 hover:text-[#F1AF37]"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleTogglePin(notice.id)}>
                                {notice.isPinned ? (
                                  <>
                                    <PinOff className="mr-2 h-4 w-4" />
                                    Unpin
                                  </>
                                ) : (
                                  <>
                                    <Pin className="mr-2 h-4 w-4" />
                                    Pin
                                  </>
                                )}
                              </DropdownMenuItem>
                              {notice.docUrl && (
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Attachment
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleArchive(notice.id)}>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDelete(notice.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Notices Cards - Mobile */}
      <div className="space-y-3 md:hidden">
        {paginatedNotices.length === 0 ? (
          <Card className="border-2">
            <CardContent className="p-8 text-center text-muted-foreground">
              No notices found
            </CardContent>
          </Card>
        ) : (
          paginatedNotices.map((notice) => {
            const categoryConfig = getCategoryConfig(notice.category)
            const priorityConfig = getPriorityConfig(notice.priority)
            
            return (
              <Card key={notice.id} className="border-2">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {notice.isPinned && (
                          <Pin className="h-4 w-4 text-red-500 shrink-0" />
                        )}
                        <h3 className="font-semibold text-sm line-clamp-1">{notice.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{notice.content}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewNotice(notice)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/notices/create?edit=${notice.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTogglePin(notice.id)}>
                          {notice.isPinned ? (
                            <>
                              <PinOff className="mr-2 h-4 w-4" />
                              Unpin
                            </>
                          ) : (
                            <>
                              <Pin className="mr-2 h-4 w-4" />
                              Pin
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleArchive(notice.id)}>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(notice.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${categoryConfig.className} text-xs`}>
                      {categoryConfig.label}
                    </Badge>
                    {priorityConfig && (
                      <Badge className={`${priorityConfig.className} text-xs`}>
                        {priorityConfig.label}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{getAudienceLabel(notice.audience)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span suppressHydrationWarning>{new Date(notice.publishDate).toLocaleDateString()}</span>
                    </div>
                    {notice.expiryDate && (
                      <div className="flex items-center gap-1">
                        <span>→</span>
                        <span suppressHydrationWarning>{new Date(notice.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="border-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredNotices.length)} of {filteredNotices.length} notices
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Notice Dialog */}
      <Dialog open={!!viewNotice} onOpenChange={() => setViewNotice(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {viewNotice && (
            <>
              <DialogHeader className="border-b pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <DialogTitle className="text-xl sm:text-2xl font-bold">
                        {viewNotice.title}
                      </DialogTitle>
                      {viewNotice.isPinned && (
                        <Pin className="h-5 w-5 text-red-500 fill-red-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{viewNotice.createdByRole === 'institute_admin' ? 'Admin' : 'Teacher'}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span suppressHydrationWarning>{new Date(viewNotice.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5 py-4">
                {/* Badges Section */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getCategoryConfig(viewNotice.category).className} text-xs sm:text-sm px-2.5 py-1`}>
                    <span className="mr-1">{getCategoryConfig(viewNotice.category).icon}</span>
                    {getCategoryConfig(viewNotice.category).label}
                  </Badge>
                  {viewNotice.priority && (
                    <Badge className={`${getPriorityConfig(viewNotice.priority)?.className} text-xs sm:text-sm px-2.5 py-1`}>
                      {getPriorityConfig(viewNotice.priority)?.label}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs sm:text-sm px-2.5 py-1">
                    <Users className="h-3 w-3 mr-1" />
                    {getAudienceLabel(viewNotice.audience)}
                  </Badge>
                </div>

                {/* Content Section */}
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 pb-3">
                    <CardTitle className="text-base">Notice Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Summary</Label>
                        <p className="text-sm leading-relaxed">{viewNotice.content}</p>
                      </div>
                      {viewNotice.fullDescription && (
                        <div className="pt-4 border-t">
                          <Label className="text-xs text-muted-foreground mb-1 block">Full Description</Label>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{viewNotice.fullDescription}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Date Information */}
                <Card className="border-2">
                  <CardHeader className="bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 pb-3">
                    <CardTitle className="text-base">Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Publish Date</Label>
                          <p className="font-semibold text-sm" suppressHydrationWarning>
                            {new Date(viewNotice.publishDate).toLocaleDateString('en-IN', { 
                              day: 'numeric', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Expiry Date</Label>
                          <p className="font-semibold text-sm" suppressHydrationWarning>
                            {viewNotice.expiryDate
                              ? new Date(viewNotice.expiryDate).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })
                              : 'No expiry'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Attachment */}
                {viewNotice.docUrl && (
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <Button 
                        className="w-full gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" 
                        onClick={() => window.open(viewNotice.docUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                        Download Attachment
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setViewNotice(null)}
                >
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#1897C6] to-[#67BAC3]"
                  onClick={() => window.location.href = `/dashboard/notices/create?edit=${viewNotice.id}`}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Notice
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
