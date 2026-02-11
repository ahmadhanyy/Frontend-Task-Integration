"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  ChevronDown,
  Upload,
  X,
  FileText,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useReferenceData } from '@/hooks/useReferenceData';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useAgentForm } from '@/hooks/useAgentForm';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function CollapsibleSection({
  title,
  description,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  description: string;
  badge?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="mt-1">
                    {description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {badge !== undefined && badge > 0 && (
                  <Badge variant="destructive">
                    {badge} required
                  </Badge>
                )}
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator />
          <CardContent className="pt-6">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export interface AgentFormInitialData {
  agentName?: string;
  description?: string;
  callType?: string;
  language?: string;
  voice?: string;
  prompt?: string;
  model?: string;
  latency?: number;
  speed?: number;
  callScript?: string;
  serviceDescription?: string;
}

interface AgentFormProps {
  mode: "create" | "edit";
  initialData?: AgentFormInitialData;
}

export function AgentForm({ mode, initialData }: AgentFormProps) {
  const {
    data,
    updateField,
    saveAgent,
    testCall,
    saving,
    isDirty,
  } = useAgentForm({
    name: initialData?.agentName ?? '',
    description: initialData?.description ?? '',
    callType: initialData?.callType ?? '',
    language: initialData?.language ?? '',
    voice: initialData?.voice ?? '',
    prompt: initialData?.prompt ?? '',
    model: initialData?.model ?? '',
    latency: initialData?.latency ?? 0.5,
    speed: initialData?.speed ?? 110,
    callScript: initialData?.callScript ?? '',
    serviceDescription: initialData?.serviceDescription ?? '',
    attachments: [],
    tools: {
      allowHangUp: false,
      allowCallback: false,
      liveTransfer: false,
    },
  });

  // Test Call local state
  const [testFirstName, setTestFirstName] = useState('');
  const [testLastName, setTestLastName] = useState('');
  const [testGender, setTestGender] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [testing, setTesting] = useState(false);

  const {
    languages,
    voices,
    prompts,
    models,
    loading: referenceLoading,
  } = useReferenceData();

  const {
    uploads,
    uploadFile,
    removeFile,
    attachmentIds,
    isUploading,
  } = useFileUpload();

  useEffect(() => {
    if (attachmentIds.length > 0) {
      updateField('attachments', attachmentIds);
    }
  }, [attachmentIds, updateField]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    await Promise.all(
      Array.from(files).map(file => uploadFile(file))
    );
  };

  // Badge counts for required fields
  const basicSettingsMissing = [data.name, data.callType, data.language, data.voice, data.prompt, data.model].filter(
    (v) => !v
  ).length;

  // File upload handlers
  const ACCEPTED_TYPES = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".csv",
    ".xlsx",
    ".xls",
  ];

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const heading = mode === "create" ? "Create Agent" : "Edit Agent";
  const saveLabel = mode === "create" ? "Save Agent" : "Save Changes";

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{heading}</h1>
        <Button
          onClick={async () => {
            try {
              await saveAgent();
              toast.success("Agent saved successfully!");
            } catch (err: unknown) {
              if (err instanceof Error) {
                toast.error(err.message);
              } else {
                toast.error("Failed to save agent.");
              }
            }
          }}
          disabled={saving || isUploading || basicSettingsMissing > 0}
        >
          {saving ? "Saving..." : saveLabel}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column — Collapsible Sections */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Section 1: Basic Settings */}
          <CollapsibleSection
            title="Basic Settings"
            description="Add some information about your agent to get started."
            badge={basicSettingsMissing}
            defaultOpen
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agent-name">
                  Agent Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="agent-name"
                  placeholder="e.g. Sales Assistant"
                  value={data.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe what this agent does..."
                  value={data.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Call Type <span className="text-destructive">*</span>
                </Label>
                <Select value={data.callType} onValueChange={(v) => updateField('callType', v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select call type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound (Receive Calls)</SelectItem>
                    <SelectItem value="outbound">Outbound (Make Calls)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Language <span className="text-destructive">*</span>
                </Label>
                <Select value={data.language} onValueChange={(v) => updateField('language', v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {referenceLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      languages.map(lang => (
                        <SelectItem key={lang.id} value={lang.id}>
                          {lang.name}
                        </SelectItem>
                      )))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Voice <span className="text-destructive">*</span>
                </Label>
                <Select value={data.voice} onValueChange={(v) => updateField('voice', v)} disabled={!data.language}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {referenceLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      voices
                        .filter(v => !data.language || v.language === data.language)
                        .map(voice => (
                          <SelectItem key={voice.id} value={voice.id}>
                            <div className="flex items-center gap-2">
                              <span>{voice.name}</span>
                              <Badge variant="secondary">{voice.tag}</Badge>
                            </div>
                          </SelectItem>
                        )))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Prompt <span className="text-destructive">*</span>
                </Label>
                <Select value={data.prompt} onValueChange={(v) => updateField('prompt', v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select prompt" />
                  </SelectTrigger>
                  <SelectContent>
                    {referenceLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      prompts.map(prompt => (
                      <SelectItem key={prompt.id} value={prompt.id}>
                        {prompt.name}
                      </SelectItem>
                    )))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Model <span className="text-destructive">*</span>
                </Label>
                <Select value={data.model} onValueChange={(v) => updateField('model', v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {referenceLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      models.map(model => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    )))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Latency ({data.latency.toFixed(1)}s)</Label>
                  <Slider
                    value={[data.latency]}
                    onValueChange={([v]) => updateField('latency', v)}
                    min={0.3}
                    max={1}
                    step={0.1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.3s</span>
                    <span>1.0s</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Speed ({data.speed}%)</Label>
                  <Slider
                    value={[data.speed]}
                    onValueChange={([v]) => updateField('speed', v)}
                    min={90}
                    max={130}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>90%</span>
                    <span>130%</span>
                  </div>
                </div>
              </div>

            </div>
          </CollapsibleSection>

          {/* Section 2: Call Script */}
          <CollapsibleSection
            title="Call Script"
            description="What would you like the AI agent to say during the call?"
          >
            <div className="space-y-2">
              <Textarea
                placeholder="Write your call script here..."
                value={data.callScript}
                onChange={(e) => updateField('callScript', e.target.value)}
                rows={6}
                maxLength={20000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {data.callScript.length}/20000
              </p>
            </div>
          </CollapsibleSection>

          {/* Section 4: Service/Product Description */}
          <CollapsibleSection
            title="Service/Product Description"
            description="Add a knowledge base about your service or product."
          >
            <div className="space-y-2">
              <Textarea
                placeholder="Describe your service or product..."
                value={data.serviceDescription}
                onChange={(e) => updateField('serviceDescription', e.target.value)}
                rows={6}
                maxLength={20000}
              />
              <p className="text-xs text-muted-foreground text-right">
                {data.serviceDescription.length}/20000
              </p>
            </div>
          </CollapsibleSection>

          {/* Section 5: Reference Data */}
          <CollapsibleSection
            title="Reference Data"
            description="Enhance your agent's knowledge base with uploaded files."
          >
            <div className="space-y-4">
              {/* Drop zone */}
              <div
                className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={(e) => handleFiles(e.target.files)}
                />
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">
                  Drag & drop files here, or{" "}
                  <button
                    type="button"
                    className="text-primary underline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </button>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Accepted: .pdf, .doc, .docx, .txt, .csv, .xlsx, .xls
                </p>
              </div>

              {/* File list */}
              {uploads.length > 0 ? (
                <div className="space-y-2">
                  {uploads.map((u, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-md border px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="text-sm truncate">{u.file.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatFileSize(u.file.size)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => removeFile(u.file)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
                  <FileText className="h-10 w-10 mb-2" />
                  <p className="text-sm">No Files Available</p>
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Section 6: Tools */}
          <CollapsibleSection
            title="Tools"
            description="Tools that allow the AI agent to perform call-handling actions and manage session control."
          >
            <FieldGroup className="w-full">
              <FieldLabel htmlFor="switch-hangup">
                <Field orientation="horizontal" className="items-center">
                  <FieldContent>
                    <FieldTitle>Allow hang up</FieldTitle>
                    <FieldDescription>
                      Select if you would like to allow the agent to hang up the call
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="switch-hangup"
                    checked={data.tools.allowHangUp}
                    onCheckedChange={(v) =>
                      updateField("tools", {
                        ...data.tools,
                        allowHangUp: v,
                      })
                    }
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="switch-callback">
                <Field orientation="horizontal" className="items-center">
                  <FieldContent>
                    <FieldTitle>Allow callback</FieldTitle>
                    <FieldDescription>
                      Select if you would like to allow the agent to make callbacks
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="switch-callback"
                    checked={data.tools.allowCallback}
                    onCheckedChange={(v) =>
                      updateField("tools", {
                        ...data.tools,
                        allowCallback: v,
                      })
                    }
                  />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="switch-transfer">
                <Field orientation="horizontal" className="items-center">
                  <FieldContent>
                    <FieldTitle>Live transfer</FieldTitle>
                    <FieldDescription>
                      Select if you want to transfer the call to a human agent
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="switch-transfer"
                    checked={data.tools.liveTransfer}
                    onCheckedChange={(v) =>
                      updateField("tools", {
                        ...data.tools,
                        liveTransfer: v,
                      })
                    }
                  />
                </Field>
              </FieldLabel>
            </FieldGroup>
          </CollapsibleSection>

        </div>

        {/* Right Column — Sticky Test Call Card */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Test Call
                </CardTitle>
                <CardDescription>
                  Make a test call to preview your agent. Each test call will
                  deduct credits from your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="test-first-name">First Name</Label>
                      <Input
                        id="test-first-name"
                        placeholder="John"
                        value={testFirstName}
                        onChange={(e) => setTestFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="test-last-name">Last Name</Label>
                      <Input
                        id="test-last-name"
                        placeholder="Doe"
                        value={testLastName}
                        onChange={(e) => setTestLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={testGender}
                      onValueChange={setTestGender}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="test-phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <PhoneInput
                      defaultCountry="EG"
                      value={testPhone}
                      onChange={(value) => setTestPhone(value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={async () => {
                      if (isDirty) {
                        toast.error("Please save the agent before starting a test call.");
                        return;
                      }

                      try {
                        setTesting(true);
                        await testCall({
                          firstName: testFirstName,
                          lastName: testLastName,
                          gender: testGender,
                          phoneNumber: testPhone,
                        });
                        toast.success("Test call started successfully!");
                      } catch (err: unknown) {
                        // Narrow the unknown type safely
                        if (err instanceof Error) {
                          toast.error(err.message);
                        } else {
                          toast.error("Failed to start test call.");
                        }
                      } finally {
                        setTesting(false);
                      }
                    }}
                    disabled={!testPhone || saving || testing}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {testing ? "Calling..." : "Start Test Call"}
                  </Button>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Sticky bottom save bar */}
      <div className="sticky bottom-0 -mx-6 -mb-6 border-t bg-background px-6 py-4">
        <div className="flex justify-end">
        <Button
          onClick={async () => {
            try {
              await saveAgent();
              toast.success("Agent saved successfully!");
            } catch (err: unknown) {
              if (err instanceof Error) {
                toast.error(err.message);
              } else {
                toast.error("Failed to save agent.");
              }
            }
          }}
          disabled={saving || isUploading || basicSettingsMissing > 0}
        >
          {saving ? "Saving..." : saveLabel}
        </Button>
        </div>
      </div>
    </div>
  );
}