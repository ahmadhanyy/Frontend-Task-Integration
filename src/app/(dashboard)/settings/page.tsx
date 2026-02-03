"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  X,
  User,
  Shield,
  Tag,
  Users,
  CreditCard,
  Webhook,
  FileText,
  Upload,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="profile" orientation="vertical" className="gap-6">
        <TabsList className="gap-1 p-2">
          <TabsTrigger value="profile" className="px-4 py-2">
            <User />
            Profile Details
          </TabsTrigger>
          <TabsTrigger value="security" className="px-4 py-2">
            <Shield />
            Security
          </TabsTrigger>
          <TabsTrigger value="tags" className="px-4 py-2">
            <Tag />
            Tags
          </TabsTrigger>
          <TabsTrigger value="users" className="px-4 py-2">
            <Users />
            Users
          </TabsTrigger>
          <TabsTrigger value="billing" className="px-4 py-2">
            <CreditCard />
            Billing & Usage
          </TabsTrigger>
          <TabsTrigger value="api" className="px-4 py-2">
            <Webhook />
            API & Webhooks
          </TabsTrigger>
          <TabsTrigger value="summary-template" className="px-4 py-2">
            <FileText />
            Summary Template
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
        <TabsContent value="tags">
          <TagsTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
        <TabsContent value="api">
          <ApiTab />
        </TabsContent>
        <TabsContent value="summary-template">
          <SummaryTemplateTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
          <CardDescription>
            Update your photo and personal details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-medium">
                JD
              </div>
              <div className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors hover:border-primary/50 hover:bg-muted/50">
                <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This will be displayed on your profile.
            </p>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" placeholder="Acme Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john@example.com"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select disabled defaultValue="admin">
              <SelectTrigger id="role" className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location & Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select>
              <SelectTrigger id="country" className="w-full">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="gb">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="ae">United Arab Emirates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select>
              <SelectTrigger id="timezone" className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-12">(UTC-12:00) Baker Island</SelectItem>
                <SelectItem value="utc-8">(UTC-08:00) Pacific Time</SelectItem>
                <SelectItem value="utc-7">(UTC-07:00) Mountain Time</SelectItem>
                <SelectItem value="utc-6">(UTC-06:00) Central Time</SelectItem>
                <SelectItem value="utc-5">(UTC-05:00) Eastern Time</SelectItem>
                <SelectItem value="utc-0">(UTC+00:00) London, Dublin</SelectItem>
                <SelectItem value="utc+1">(UTC+01:00) Berlin, Paris</SelectItem>
                <SelectItem value="utc+3">(UTC+03:00) Moscow, Riyadh</SelectItem>
                <SelectItem value="utc+4">(UTC+04:00) Dubai, Baku</SelectItem>
                <SelectItem value="utc+5.5">(UTC+05:30) Mumbai, Kolkata</SelectItem>
                <SelectItem value="utc+8">(UTC+08:00) Singapore, Beijing</SelectItem>
                <SelectItem value="utc+9">(UTC+09:00) Tokyo, Seoul</SelectItem>
                <SelectItem value="utc+10">(UTC+10:00) Sydney, Melbourne</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="font-normal">
              Subscribe to newsletter
            </Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Require a verification code when signing in.
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TagsTab() {
  const [tags] = useState([
    { id: "1", name: "VIP", color: "default" },
    { id: "2", name: "New Lead", color: "secondary" },
    { id: "3", name: "Follow Up", color: "outline" },
    { id: "4", name: "Urgent", color: "destructive" },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>
          Manage tags used across your workspace for organizing contacts and
          conversations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input placeholder="New tag name..." className="max-w-xs" />
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Tag
          </Button>
        </div>
        <Separator />
        <div className="space-y-2">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between rounded-md border px-4 py-2"
            >
              <Badge
                variant={
                  tag.color as "default" | "secondary" | "outline" | "destructive"
                }
              >
                {tag.name}
              </Badge>
              <Button variant="ghost" size="icon-sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UsersTab() {
  const [users] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Member",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage team members and their roles in your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon-sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Manage your subscription and billing details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <p className="font-medium">Pro Plan</p>
              <p className="text-sm text-muted-foreground">
                $49/month &middot; Billed monthly
              </p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>
            Your current usage for this billing period.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Contacts</span>
              <span className="text-muted-foreground">2,450 / 10,000</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 w-1/4 rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Messages Sent</span>
              <span className="text-muted-foreground">8,200 / 50,000</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 w-[16%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>AI Summaries</span>
              <span className="text-muted-foreground">340 / 1,000</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div className="h-2 w-[34%] rounded-full bg-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ApiTab() {
  const [showKey, setShowKey] = useState(false);
  const apiKey = "sk-olimi-xxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Manage API keys for integrating with external services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 rounded-md border p-3">
            <code className="flex-1 text-sm">
              {showKey ? apiKey : "sk-olimi-••••••••••••••••••••••••••••"}
            </code>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Generate New Key
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Configure webhook endpoints to receive real-time event
            notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[
              {
                url: "https://example.com/webhooks/messages",
                event: "message.received",
              },
              {
                url: "https://example.com/webhooks/contacts",
                event: "contact.created",
              },
            ].map((webhook) => (
              <div
                key={webhook.url}
                className="flex items-center justify-between rounded-md border px-4 py-2"
              >
                <div>
                  <p className="text-sm font-medium">{webhook.url}</p>
                  <p className="text-xs text-muted-foreground">
                    {webhook.event}
                  </p>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="https://your-app.com/webhook" className="flex-1" />
            <Button>Add Webhook</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryTemplateTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary Template</CardTitle>
        <CardDescription>
          Customize the template used for generating AI conversation summaries.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="template">Template</Label>
          <Textarea
            id="template"
            rows={12}
            placeholder="Enter your summary template..."
            defaultValue={`## Conversation Summary

**Customer:** {{customer_name}}
**Date:** {{date}}
**Agent:** {{agent_name}}

### Key Points
{{key_points}}

### Action Items
{{action_items}}

### Sentiment
{{sentiment}}`}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Available variables: {"{{customer_name}}"}, {"{{date}}"},{" "}
          {"{{agent_name}}"}, {"{{key_points}}"}, {"{{action_items}}"},{" "}
          {"{{sentiment}}"}, {"{{duration}}"}, {"{{channel}}"}
        </p>
      </CardContent>
      <CardFooter>
        <Button>Save Template</Button>
      </CardFooter>
    </Card>
  );
}
