'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Shield,
  UserPlus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Users
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

// Mock institute data based on schema
const mockInstituteData = {
  master: {
    institute_code: 'VIDHKEND123456789',
    institute_name: 'Green Valley International School',
    institute_type: 'school',
    status: 'active',
    logo_url: null,
    activated_at: '2024-01-15',
  },
  basic_info: {
    owner_name: 'Dr. Rajesh Kumar',
    designation: 'Principal',
    email: 'principal@greenvalley.edu',
    mobile: '+91 98765 43210',
    alternate_mobile: '+91 98765 43211',
    address: '123 Education Street, Knowledge Park',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
    website: 'www.greenvalley.edu',
    email_verified: true,
    mobile_verified: true,
  },
  details: {
    school_board: 'CBSE',
    school_type: 'private',
    affiliation_number: 'CBSE/AFF/123456',
    recognition_number: 'REC/2020/12345',
    classes_offered: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    medium: 'english',
    approx_students_range: '500-1000',
    established_year: 2010,
    campus_area: '5 acres',
    facilities: ['Library', 'Computer Lab', 'Science Lab', 'Sports Ground', 'Auditorium'],
  },
  subscription: {
    plan_name: 'Yearly',
    subscription_start_date: '2024-01-15',
    subscription_end_date: '2025-01-14',
    status: 'active',
  },
}

// Mock admins data based on schema
const mockAdmins = [
  {
    _id: '1',
    name: 'Dr. Rajesh Kumar',
    email: 'principal@greenvalley.edu',
    mobile: '+91 98765 43210',
    role: 'super_admin',
    status: 'active',
    last_login_at: '2024-02-17 09:30 AM',
    permissions: {
      can_manage_students: true,
      can_manage_teachers: true,
      can_manage_fees: true,
      can_manage_exams: true,
      can_view_reports: true,
      can_manage_settings: true,
    },
    created_at: '2024-01-15',
  },
  {
    _id: '2',
    name: 'Ms. Priya Sharma',
    email: 'priya.sharma@greenvalley.edu',
    mobile: '+91 98765 43212',
    role: 'admin',
    status: 'active',
    last_login_at: '2024-02-16 02:45 PM',
    permissions: {
      can_manage_students: true,
      can_manage_teachers: true,
      can_manage_fees: false,
      can_manage_exams: true,
      can_view_reports: true,
      can_manage_settings: false,
    },
    created_at: '2024-01-20',
  },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('institute')
  const [addAdminOpen, setAddAdminOpen] = useState(false)
  const [viewAdminOpen, setViewAdminOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [showPassword, setShowPassword] = useState(false)
  
  // Form state for new admin
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    role: 'admin',
    permissions: {
      can_manage_students: false,
      can_manage_teachers: false,
      can_manage_fees: false,
      can_manage_exams: false,
      can_view_reports: false,
      can_manage_settings: false,
    },
  })

  const handleAddAdmin = () => {
    console.log('[v0] Adding new admin:', newAdmin)
    // Reset form and close dialog
    setNewAdmin({
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: 'admin',
      permissions: {
        can_manage_students: false,
        can_manage_teachers: false,
        can_manage_fees: false,
        can_manage_exams: false,
        can_view_reports: false,
        can_manage_settings: false,
      },
    })
    setAddAdminOpen(false)
  }

  const handleViewAdmin = (admin: any) => {
    setSelectedAdmin(admin)
    setViewAdminOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your institute profile and admin accounts</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1">
            <TabsTrigger value="institute" className="text-sm py-2.5">
              <Building2 className="h-4 w-4 mr-2" />
              Institute Details
            </TabsTrigger>
            <TabsTrigger value="admins" className="text-sm py-2.5">
              <Users className="h-4 w-4 mr-2" />
              Admin Management
            </TabsTrigger>
          </TabsList>

          {/* Institute Details Tab */}
          <TabsContent value="institute" className="space-y-6">
            {/* Basic Information */}
            <Card className="border-2">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                    <CardDescription>Your institute's primary details</CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={mockInstituteData.master.status === 'active' 
                      ? 'border-green-600 text-green-600 bg-green-50' 
                      : 'border-yellow-600 text-yellow-600 bg-yellow-50'}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {mockInstituteData.master.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      Institute Name
                    </div>
                    <p className="text-base font-semibold">{mockInstituteData.master.institute_name}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Institute Code
                    </div>
                    <p className="text-base font-mono font-semibold text-[#1897C6]">{mockInstituteData.master.institute_code}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4" />
                      Owner / Principal
                    </div>
                    <p className="text-base font-semibold">{mockInstituteData.basic_info.owner_name}</p>
                    <p className="text-sm text-muted-foreground">{mockInstituteData.basic_info.designation}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </div>
                    <p className="text-base">{mockInstituteData.basic_info.email}</p>
                    {mockInstituteData.basic_info.email_verified && (
                      <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Primary Mobile
                    </div>
                    <p className="text-base">{mockInstituteData.basic_info.mobile}</p>
                    {mockInstituteData.basic_info.mobile_verified && (
                      <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      Alternate Mobile
                    </div>
                    <p className="text-base">{mockInstituteData.basic_info.alternate_mobile || 'Not provided'}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Globe className="h-4 w-4" />
                      Website
                    </div>
                    <p className="text-base text-[#1897C6]">{mockInstituteData.basic_info.website}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Activated On
                    </div>
                    <p className="text-base">{new Date(mockInstituteData.master.activated_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Address
                    </div>
                    <p className="text-base">
                      {mockInstituteData.basic_info.address}, {mockInstituteData.basic_info.city}, {mockInstituteData.basic_info.state} - {mockInstituteData.basic_info.pincode}, {mockInstituteData.basic_info.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Institute Details */}
            <Card className="border-2">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg">Academic Details</CardTitle>
                <CardDescription>Educational specifications and facilities</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">School Board</div>
                    <Badge variant="outline" className="border-[#1897C6] text-[#1897C6] font-semibold">
                      {mockInstituteData.details.school_board}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">School Type</div>
                    <p className="text-base font-semibold capitalize">{mockInstituteData.details.school_type}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Affiliation Number</div>
                    <p className="text-base font-mono">{mockInstituteData.details.affiliation_number}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Recognition Number</div>
                    <p className="text-base font-mono">{mockInstituteData.details.recognition_number}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Medium of Instruction</div>
                    <p className="text-base font-semibold capitalize">{mockInstituteData.details.medium}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Student Range</div>
                    <p className="text-base font-semibold">{mockInstituteData.details.approx_students_range} students</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Established Year</div>
                    <p className="text-base font-semibold">{mockInstituteData.details.established_year}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Campus Area</div>
                    <p className="text-base font-semibold">{mockInstituteData.details.campus_area}</p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Classes Offered</div>
                    <div className="flex flex-wrap gap-2">
                      {mockInstituteData.details.classes_offered.map((cls) => (
                        <Badge key={cls} variant="outline" className="border-2">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <div className="text-sm font-medium text-muted-foreground mb-2">Facilities</div>
                    <div className="flex flex-wrap gap-2">
                      {mockInstituteData.details.facilities.map((facility) => (
                        <Badge key={facility} variant="outline" className="border-[#1897C6] text-[#1897C6]">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Details */}
            <Card className="border-2">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg">Subscription Details</CardTitle>
                <CardDescription>Your current subscription plan and status</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Plan</div>
                    <Badge className="bg-[#1897C6] text-white">
                      {mockInstituteData.subscription.plan_name}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Start Date</div>
                    <p className="text-base font-semibold">
                      {new Date(mockInstituteData.subscription.subscription_start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">End Date</div>
                    <p className="text-base font-semibold">
                      {new Date(mockInstituteData.subscription.subscription_end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {mockInstituteData.subscription.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admin Management Tab */}
          <TabsContent value="admins" className="space-y-6">
            <Card className="border-2">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Admin Accounts</CardTitle>
                    <CardDescription>Manage administrators who can access the system</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setAddAdminOpen(true)}
                    className="bg-[#1897C6] hover:bg-[#1897C6]/90"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Admin
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockAdmins.map((admin) => (
                    <Card key={admin._id} className="border-2 hover:border-[#1897C6] transition-all">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1897C6] text-white font-bold text-lg">
                              {admin.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-base">{admin.name}</h3>
                                <Badge 
                                  variant="outline" 
                                  className={admin.role === 'super_admin' 
                                    ? 'border-purple-600 text-purple-600 bg-purple-50' 
                                    : 'border-blue-600 text-blue-600 bg-blue-50'}
                                >
                                  {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={admin.status === 'active' 
                                    ? 'border-green-600 text-green-600 bg-green-50' 
                                    : 'border-red-600 text-red-600 bg-red-50'}
                                >
                                  {admin.status}
                                </Badge>
                              </div>
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-3.5 w-3.5" />
                                  {admin.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="h-3.5 w-3.5" />
                                  {admin.mobile}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Last login: {admin.last_login_at}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewAdmin(admin)}
                            >
                              <Eye className="h-4 w-4 mr-1.5" />
                              View
                            </Button>
                            {admin.role !== 'super_admin' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Admin Dialog */}
        <Dialog open={addAdminOpen} onOpenChange={setAddAdminOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <DialogDescription>
                Create a new admin account with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="+91 98765 43210"
                    value={newAdmin.mobile}
                    onChange={(e) => setNewAdmin({ ...newAdmin, mobile: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <Label className="text-base">Permissions</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_manage_students"
                      checked={newAdmin.permissions.can_manage_students}
                      onCheckedChange={(checked) => 
                        setNewAdmin({ 
                          ...newAdmin, 
                          permissions: { ...newAdmin.permissions, can_manage_students: checked as boolean } 
                        })
                      }
                    />
                    <label htmlFor="can_manage_students" className="text-sm font-medium cursor-pointer">
                      Manage Students
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_manage_teachers"
                      checked={newAdmin.permissions.can_manage_teachers}
                      onCheckedChange={(checked) => 
                        setNewAdmin({ 
                          ...newAdmin, 
                          permissions: { ...newAdmin.permissions, can_manage_teachers: checked as boolean } 
                        })
                      }
                    />
                    <label htmlFor="can_manage_teachers" className="text-sm font-medium cursor-pointer">
                      Manage Teachers
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_manage_fees"
                      checked={newAdmin.permissions.can_manage_fees}
                      onCheckedChange={(checked) => 
                        setNewAdmin({ 
                          ...newAdmin, 
                          permissions: { ...newAdmin.permissions, can_manage_fees: checked as boolean } 
                        })
                      }
                    />
                    <label htmlFor="can_manage_fees" className="text-sm font-medium cursor-pointer">
                      Manage Fees
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_manage_exams"
                      checked={newAdmin.permissions.can_manage_exams}
                      onCheckedChange={(checked) => 
                        setNewAdmin({ 
                          ...newAdmin, 
                          permissions: { ...newAdmin.permissions, can_manage_exams: checked as boolean } 
                        })
                      }
                    />
                    <label htmlFor="can_manage_exams" className="text-sm font-medium cursor-pointer">
                      Manage Exams
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_view_reports"
                      checked={newAdmin.permissions.can_view_reports}
                      onCheckedChange={(checked) => 
                        setNewAdmin({ 
                          ...newAdmin, 
                          permissions: { ...newAdmin.permissions, can_view_reports: checked as boolean } 
                        })
                      }
                    />
                    <label htmlFor="can_view_reports" className="text-sm font-medium cursor-pointer">
                      View Reports
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="can_manage_settings"
                      checked={newAdmin.permissions.can_manage_settings}
                      onCheckedChange={(checked) => 
                        setNewAdmin({ 
                          ...newAdmin, 
                          permissions: { ...newAdmin.permissions, can_manage_settings: checked as boolean } 
                        })
                      }
                    />
                    <label htmlFor="can_manage_settings" className="text-sm font-medium cursor-pointer">
                      Manage Settings
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddAdminOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddAdmin}
                className="bg-[#1897C6] hover:bg-[#1897C6]/90"
              >
                Add Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Admin Dialog */}
        <Dialog open={viewAdminOpen} onOpenChange={setViewAdminOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Admin Details</DialogTitle>
              <DialogDescription>
                View admin information and permissions
              </DialogDescription>
            </DialogHeader>
            {selectedAdmin && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{selectedAdmin.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Role</p>
                    <Badge 
                      variant="outline" 
                      className={selectedAdmin.role === 'super_admin' 
                        ? 'border-purple-600 text-purple-600 bg-purple-50' 
                        : 'border-blue-600 text-blue-600 bg-blue-50'}
                    >
                      {selectedAdmin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{selectedAdmin.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <p className="font-semibold">{selectedAdmin.mobile}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge 
                      variant="outline" 
                      className={selectedAdmin.status === 'active' 
                        ? 'border-green-600 text-green-600 bg-green-50' 
                        : 'border-red-600 text-red-600 bg-red-50'}
                    >
                      {selectedAdmin.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Login</p>
                    <p className="font-semibold">{selectedAdmin.last_login_at}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Created On</p>
                    <p className="font-semibold">
                      {new Date(selectedAdmin.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-semibold">Permissions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(selectedAdmin.permissions).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        {value ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm">
                          {key.replace('can_', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewAdminOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
