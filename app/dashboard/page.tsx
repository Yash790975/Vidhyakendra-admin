import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Users, GraduationCap, Bell, UserPlus, AlertCircle, BookOpen, Calendar, TrendingUp, Award, DollarSign, Clock, CheckCircle2, XCircle, Crown, Eye } from 'lucide-react'
import Link from 'next/link'
import { StatsCard } from '@/components/stats-card'

export default function DashboardPage() {
  // Mock data - replace with actual API calls
  const stats = {
    totalStudents: 1248,
    activeStudents: 1210,
    totalTeachers: 85,
    activeTeachers: 82,
    pendingTeachers: 3,
    pendingStudents: 12,
    activeNotices: 8,
    totalClasses: 42,
  }

  const planInfo = {
    plan: 'Premium Plan',
    expiryDate: '2024-12-31',
    daysLeft: 45,
    studentsLimit: 2000,
    teachersLimit: 100,
  }

  const classesByStandard = [
    { standard: 'Class 1', sections: ['A', 'B'], totalStudents: 85 },
    { standard: 'Class 2', sections: ['A', 'B', 'C'], totalStudents: 120 },
    { standard: 'Class 3', sections: ['A', 'B'], totalStudents: 95 },
    { standard: 'Class 4', sections: ['A', 'B', 'C'], totalStudents: 118 },
    { standard: 'Class 5', sections: ['A', 'B'], totalStudents: 92 },
    { standard: 'Class 6', sections: ['A', 'B', 'C'], totalStudents: 125 },
    { standard: 'Class 7', sections: ['A', 'B'], totalStudents: 98 },
    { standard: 'Class 8', sections: ['A', 'B', 'C'], totalStudents: 135 },
    { standard: 'Class 9', sections: ['A', 'B'], totalStudents: 105 },
    { standard: 'Class 10', sections: ['A', 'B', 'C'], totalStudents: 155 },
  ]

  const recentActivities = [
    { id: 1, type: 'student', action: 'New student enrolled', name: 'Rahul Sharma', time: '2 hours ago' },
    { id: 2, type: 'teacher', action: 'Teacher activated', name: 'Priya Patel', time: '4 hours ago' },
    { id: 3, type: 'notice', action: 'Notice published', name: 'Annual Function 2024', time: '1 day ago' },
    { id: 4, type: 'student', action: 'Student attendance marked', name: 'Class 10-A', time: '1 day ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Header with Plan Info */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#1897C6] to-[#67BAC3] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            Welcome back! Here's an overview of your institute
          </p>
        </div>
        <Card className="bg-gradient-to-br from-[#F1AF37]/10 to-[#D88931]/10 border-[#F1AF37]/20 shadow-sm w-full lg:w-auto">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white shadow-sm">
                <Crown className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold">{planInfo.plan}</p>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">Active</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Expires in <span className="font-semibold text-[#D87331]">{planInfo.daysLeft} days</span> <span className="hidden sm:inline">•</span>
                  <span className="block sm:inline sm:ml-1">{new Date(planInfo.expiryDate).toLocaleDateString('en-IN')}</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
          color="primary"
        />
        <StatsCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={GraduationCap}
          trend={{ value: 2.4, isPositive: true }}
          color="secondary"
        />
        <StatsCard
          title="Active Classes"
          value={stats.totalClasses}
          icon={BookOpen}
          color="accent"
        />
        <StatsCard
          title="Pending Approvals"
          value={stats.pendingTeachers + stats.pendingStudents}
          icon={AlertCircle}
          color="warning"
        />
      </div>

      {/* Super Admin Notices Section */}
      <Card className="shadow-sm border">
        <CardHeader className="pb-4 border-b bg-muted/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">Admin Announcements</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Important updates from super admin</p>
              </div>
            </div>
            <Link href="/dashboard/admin-notices">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3">
            {[
              {
                id: 1,
                title: 'System Maintenance Schedule',
                content: 'The platform will undergo scheduled maintenance on Sunday, 2:00 AM - 6:00 AM IST. Please ensure all data is saved before this time.',
                category: 'maintenance',
                priority: 'high',
                isPinned: true,
                publishDate: '2024-01-15',
                imageUrl: '/images/maintenance-banner.jpg',
                linkUrl: 'https://status.vidhyakendra.edu/maintenance',
              },
              {
                id: 2,
                title: 'New Features Released',
                content: 'We have added new attendance tracking and performance analytics features. Check out the updates in the latest release notes.',
                category: 'announcement',
                priority: 'medium',
                isPinned: false,
                publishDate: '2024-01-14',
                docUrl: '/documents/release-notes.pdf',
              },
            ].map((notice) => (
              <Card
                key={notice.id}
                className="group cursor-pointer border hover:border-[#1897C6]/50 transition-all hover:shadow-md bg-card"
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-start gap-2">
                        {notice.isPinned && (
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-100 mt-0.5">
                            <Bell className="h-3 w-3 text-amber-600" />
                          </div>
                        )}
                        <h3 className="font-semibold text-sm sm:text-base flex-1 group-hover:text-[#1897C6] transition-colors leading-snug">
                          {notice.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {notice.content}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Badge variant="outline" className="text-xs">
                          {notice.category}
                        </Badge>
                        <Badge
                          variant={notice.priority === 'high' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {notice.priority}
                        </Badge>
                        {(notice.imageUrl || notice.linkUrl || notice.docUrl) && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            Has attachment
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                          <Calendar className="h-3 w-3" />
                          <span suppressHydrationWarning>
                            {new Date(notice.publishDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="/dashboard/teachers/add">
              <Card className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#1897C6] transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-[#1897C6]/5 to-[#67BAC3]/5 group-hover:from-[#1897C6]/10 group-hover:to-[#67BAC3]/10 transition-all">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white shadow-lg group-hover:scale-110 transition-transform">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Add Teacher</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Onboard new faculty</p>
                    </div>
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#1897C6] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/students/add">
              <Card className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#F1AF37] transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-[#F1AF37]/5 to-[#D88931]/5 group-hover:from-[#F1AF37]/10 group-hover:to-[#D88931]/10 transition-all">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Add Student</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Enroll new student</p>
                    </div>
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-[#F1AF37] group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/notices/create">
              <Card className="group cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#D87331] transition-all hover:shadow-md">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-[#D87331]/5 to-[#D88931]/5 group-hover:from-[#D87331]/10 group-hover:to-[#D88931]/10 transition-all">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#D87331] to-[#D88931] text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Bell className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base">Create Notice</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Publish announcement</p>
                    </div>
                    <Bell className="h-5 w-5 text-[#D87331] group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    activity.type === 'student' ? 'bg-[#1897C6]/10' :
                    activity.type === 'teacher' ? 'bg-[#F1AF37]/10' :
                    'bg-[#D87331]/10'
                  }`}>
                    {activity.type === 'student' && <Users className="h-5 w-5 text-[#1897C6]" />}
                    {activity.type === 'teacher' && <GraduationCap className="h-5 w-5 text-[#F1AF37]" />}
                    {activity.type === 'notice' && <Bell className="h-5 w-5 text-[#D87331]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classes Overview & Pending Approvals */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Students Section Class Wise */}
        <Card className="border-2 shadow-sm">
          <CardHeader className="border-b bg-muted/30 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1897C6] text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg font-semibold">Students by Class</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Class-wise student distribution</p>
                </div>
              </div>
              <Badge variant="outline" className="border-[#1897C6] text-[#1897C6] font-semibold">
                {stats.totalClasses} Classes
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {classesByStandard.map((cls, index) => (
                <div
                  key={index}
                  className="group border-2 rounded-lg p-4 hover:border-[#1897C6] hover:shadow-md transition-all bg-card"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1897C6] text-white font-bold text-lg">
                        {cls.standard.replace('Class ', '')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base text-foreground">{cls.standard}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {cls.sections.length} {cls.sections.length === 1 ? 'Section' : 'Sections'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-[#1897C6]" />
                            <span className="text-xs font-semibold text-[#1897C6]">{cls.totalStudents} Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-medium text-muted-foreground mr-1">Sections:</span>
                      {cls.sections.map((section) => (
                        <div
                          key={section}
                          className="flex h-7 w-7 items-center justify-center rounded border-2 border-muted bg-muted/50 text-xs font-semibold text-foreground group-hover:border-[#1897C6] group-hover:bg-[#1897C6] group-hover:text-white transition-all"
                        >
                          {section}
                        </div>
                      ))}
                    </div>
                    <Link href={`/dashboard/students/all?class=${cls.standard.replace('Class ', '')}`}>
                      <Button
                        size="sm"
                        className="bg-[#1897C6] hover:bg-[#1897C6]/90 text-white"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        View Students
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="shadow-sm border-2">
          <CardHeader className="pb-3 bg-gradient-to-r from-[#D87331]/5 to-[#D88931]/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#D87331] to-[#D88931] text-white shadow-sm">
                <Clock className="h-5 w-5" />
              </div>
              <CardTitle className="text-base sm:text-lg">Pending Approvals</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="space-y-3">
              <Link href="/dashboard/teachers/onboarding">
                <Card className="group cursor-pointer border-2 border-transparent hover:border-[#F1AF37] transition-all hover:shadow-md">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F1AF37] to-[#D88931] text-white shadow-md group-hover:scale-110 transition-transform">
                        <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm sm:text-base">Teacher Applications</p>
                          <Badge className="bg-[#F1AF37] text-white border-0">{stats.pendingTeachers}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Waiting for your review</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F1AF37] group-hover:translate-x-1 transition-transform hidden sm:block" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/students/onboarding">
                <Card className="group cursor-pointer border-2 border-transparent hover:border-[#1897C6] transition-all hover:shadow-md">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1897C6] to-[#67BAC3] text-white shadow-md group-hover:scale-110 transition-transform">
                        <Users className="h-6 w-6 sm:h-7 sm:w-7" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-sm sm:text-base">Student Applications</p>
                          <Badge className="bg-[#1897C6] text-white border-0">{stats.pendingStudents}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Waiting for your review</p>
                      </div>
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#1897C6] group-hover:translate-x-1 transition-transform hidden sm:block" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
