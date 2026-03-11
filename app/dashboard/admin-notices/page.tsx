'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Search,
  ArrowLeft,
  Bell,
  Calendar,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

type Notice = {
  id: number
  title: string
  content: string
  fullDescription?: string
  category: string
  priority: string
  isPinned: boolean
  publishDate: string
  expiryDate?: string
  docUrl?: string
  imageUrl?: string
  linkUrl?: string
  createdBy: string
  created_at: string
}

export default function AdminNoticesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewNotice, setViewNotice] = useState<Notice | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock data for super-admin notices
  const allNotices: Notice[] = [
    {
      id: 1,
      title: 'System Maintenance Schedule - Important',
      content: 'The platform will undergo scheduled maintenance on Sunday, 2:00 AM - 6:00 AM IST.',
      fullDescription:
        'Scheduled System Maintenance\n\nDate: January 21, 2024\nTime: 2:00 AM - 6:00 AM IST\n\nDuring this period:\n- The platform will be unavailable\n- All scheduled tasks will be paused\n- Automatic backup will be performed\n- System upgrades will be applied\n\nPlease ensure:\n- All pending work is saved before 2:00 AM\n- Inform your staff about the downtime\n- Plan your activities accordingly\n\nWe apologize for any inconvenience caused. For urgent support during maintenance, contact: support@vidhyakendra.edu',
      category: 'maintenance',
      priority: 'high',
      isPinned: true,
      publishDate: '2024-01-15',
      expiryDate: '2024-01-22',
      docUrl: '/documents/maintenance-schedule.pdf',
      imageUrl: '/images/maintenance-banner.jpg',
      linkUrl: 'https://status.vidhyakendra.edu/maintenance',
      createdBy: 'Super Admin',
      created_at: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      title: 'New Features Released - Version 2.5',
      content: 'We have added new attendance tracking and performance analytics features.',
      fullDescription:
        'We are excited to announce the release of Version 2.5 with several new features:\n\n1. Enhanced Attendance Tracking\n- Biometric integration support\n- Real-time attendance reports\n- Automated absence notifications\n\n2. Performance Analytics Dashboard\n- Student performance trends\n- Class-wise comparisons\n- Predictive analytics\n\n3. Improved User Interface\n- Faster page loads\n- Better mobile responsiveness\n- Dark mode support\n\nPlease review the attached release notes for complete details.',
      category: 'announcement',
      priority: 'medium',
      isPinned: false,
      publishDate: '2024-01-14',
      docUrl: '/documents/release-notes-v2.5.pdf',
      createdBy: 'Super Admin',
      created_at: '2024-01-14T09:15:00',
    },
    {
      id: 3,
      title: 'Policy Update: Data Privacy Compliance',
      content: 'Updated privacy policy has been implemented. Please review the new guidelines.',
      fullDescription:
        'Important Policy Update\n\nWe have updated our data privacy policy to comply with the latest regulations. All institute administrators must review and acknowledge these changes.\n\nKey Updates:\n- Enhanced data encryption standards\n- Updated consent management procedures\n- New data retention policies\n- Improved user rights management\n\nAction Required:\n- Review the attached policy document\n- Complete the compliance training module\n- Update your local procedures accordingly\n\nDeadline: January 31, 2024',
      category: 'policy',
      priority: 'urgent',
      isPinned: true,
      publishDate: '2024-01-13',
      expiryDate: '2024-02-13',
      docUrl: '/documents/privacy-policy-update.pdf',
      createdBy: 'Super Admin',
      created_at: '2024-01-13T14:20:00',
    },
    {
      id: 4,
      title: 'Training Session: New Dashboard Features',
      content: 'Join us for a training session on the new dashboard features next week.',
      fullDescription:
        'Training Session Announcement\n\nDate: January 20, 2024\nTime: 3:00 PM - 4:30 PM IST\nMode: Online (Zoom)\n\nAgenda:\n- Overview of new features\n- Live demonstration\n- Q&A session\n- Best practices\n\nRegistration Link: https://training.vidhyakendra.edu/register\n\nAll institute administrators are encouraged to attend.',
      category: 'training',
      priority: 'medium',
      isPinned: false,
      publishDate: '2024-01-12',
      expiryDate: '2024-01-20',
      createdBy: 'Super Admin',
      created_at: '2024-01-12T11:00:00',
    },
    {
      id: 5,
      title: 'Security Alert: Password Policy Update',
      content: 'New password requirements will be enforced starting February 1, 2024.',
      fullDescription:
        'Security Enhancement Notice\n\nTo strengthen account security, we are implementing new password requirements:\n\nNew Requirements:\n- Minimum 12 characters\n- At least one uppercase letter\n- At least one number\n- At least one special character\n- Cannot reuse last 5 passwords\n- Password expiry: 90 days\n\nAll users will be prompted to update their passwords upon next login after February 1, 2024.\n\nPlease inform your staff about these changes.',
      category: 'security',
      priority: 'high',
      isPinned: true,
      publishDate: '2024-01-11',
      expiryDate: '2024-02-01',
      createdBy: 'Super Admin',
      created_at: '2024-01-11T16:45:00',
    },
  ]

  const filteredNotices = allNotices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage)
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-600 text-white'
      case 'high':
        return 'bg-orange-500 text-white'
      case 'medium':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'maintenance':
        return 'border-blue-200 bg-blue-50 text-blue-700'
      case 'announcement':
        return 'border-green-200 bg-green-50 text-green-700'
      case 'policy':
        return 'border-purple-200 bg-purple-50 text-purple-700'
      case 'training':
        return 'border-teal-200 bg-teal-50 text-teal-700'
      case 'security':
        return 'border-red-200 bg-red-50 text-red-700'
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700'
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Announcements</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Important notices from super admin for all institute administrators
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notices List */}
      <div className="space-y-3">
        {paginatedNotices.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No announcements found</p>
            </CardContent>
          </Card>
        ) : (
          paginatedNotices.map((notice) => (
            <Card
              key={notice.id}
              className={`group cursor-pointer border-2 transition-all hover:shadow-lg hover:border-[#1897C6]/50 ${
                notice.isPinned ? 'border-amber-200 bg-amber-50/30' : ''
              }`}
              onClick={() => setViewNotice(notice)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex gap-4">
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="flex items-start gap-2">
                      {notice.isPinned && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 mt-0.5">
                          <Bell className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg group-hover:text-[#1897C6] transition-colors leading-snug mb-2">
                          {notice.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {notice.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(notice.category)}`}>
                        {notice.category}
                      </Badge>
                      <Badge className={`text-xs ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </Badge>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground ml-auto">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span suppressHydrationWarning>
                            {new Date(notice.publishDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        {notice.docUrl && (
                          <Badge variant="secondary" className="text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Attachment
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredNotices.length)} of {filteredNotices.length}{' '}
                announcements
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500">
                          <Bell className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-xs sm:text-sm text-muted-foreground">
                      <span>Posted by {viewNotice.createdBy}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span suppressHydrationWarning>
                          {new Date(viewNotice.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5 py-4">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`text-sm ${getCategoryColor(viewNotice.category)}`}>
                    {viewNotice.category}
                  </Badge>
                  <Badge className={`text-sm ${getPriorityColor(viewNotice.priority)}`}>
                    {viewNotice.priority}
                  </Badge>
                </div>

                {/* Content */}
                <Card className="border-2">
                  <CardHeader className="bg-muted/30 pb-3">
                    <CardTitle className="text-base">Announcement Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-muted-foreground mb-1 block">Summary</Label>
                        <p className="text-sm leading-relaxed">{viewNotice.content}</p>
                      </div>
                      {viewNotice.fullDescription && (
                        <div className="pt-4 border-t">
                          <Label className="text-xs text-muted-foreground mb-1 block">Full Details</Label>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {viewNotice.fullDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Dates */}
                {viewNotice.expiryDate && (
                  <Card className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Valid until:</span>
                        <span className="font-medium" suppressHydrationWarning>
                          {new Date(viewNotice.expiryDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Image Attachment */}
                {viewNotice.imageUrl && (
                  <Card className="border-2">
                    <CardHeader className="bg-muted/30 pb-3">
                      <CardTitle className="text-base">Attached Image</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="rounded-lg overflow-hidden border">
                        <img
                          src={viewNotice.imageUrl}
                          alt="Notice attachment"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* External Link */}
                {viewNotice.linkUrl && (
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <Button
                        className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                        onClick={() => window.open(viewNotice.linkUrl, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                        Open Link
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Document Attachment */}
                {viewNotice.docUrl && (
                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <Button
                        className="w-full gap-2 bg-green-600 hover:bg-green-700"
                        onClick={() => window.open(viewNotice.docUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                        Download Document
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1" onClick={() => setViewNotice(null)}>
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
