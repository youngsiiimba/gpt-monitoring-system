import { useState, useEffect } from "react";
import { evidenceFiles, type Evidence } from "@/data/mockData";
import { projects } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  FileText, 
  Image, 
  FileSpreadsheet, 
  Download, 
  Trash2,
  Calendar,
  User,
  X
} from "lucide-react";

const getFileIcon = (fileType: string) => {
  if (fileType.includes("pdf")) return <FileText className="h-5 w-5 text-[#D63636]" />;
  if (fileType.includes("image")) return <Image className="h-5 w-5 text-blue-600" />;
  if (fileType.includes("spreadsheet") || fileType.includes("excel")) return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
  return <FileText className="h-5 w-5 text-[#4B5563]" />;
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

export default function EvidenceUpload() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadDescription, setUploadDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId)
    : null;

  const projectEvidence = selectedProjectId
    ? evidenceFiles.filter(e => e.projectId === selectedProjectId)
    : [];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    // Mock upload action
    alert(`Successfully uploaded ${selectedFiles.length} file(s) for ${selectedProject?.name}`);
    setSelectedFiles([]);
    setUploadDescription("");
    setIsUploadDialogOpen(false);
  };

  const handleDelete = (evidenceId: number) => {
    if (confirm("Are you sure you want to delete this evidence file?")) {
      // Mock delete action
      alert("Evidence file deleted successfully.");
    }
  };

  useEffect(() => {
    const dismissed = localStorage.getItem("mrs_onboarding_dismissed");
    if (!dismissed) {
      window.dispatchEvent(new CustomEvent("openOnboarding", { detail: { page: "evidence" } }));
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
            Evidence & Document Management
          </h1>
          <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
            Upload and manage evidence documents for programme indicators
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsUploadDialogOpen(true)}
            className="h-9 text-[14px] bg-[#1F2937] hover:bg-[#4B5563] text-white"
            data-onboarding="evidence.upload"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Evidence
          </Button>
        </div>
      </div>

      {/* Project Selection */}
      <div className="mb-6">
        <Label className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2 block">
          Select Programme
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project, idx) => (
            <Card
              key={project.id}
              data-onboarding={idx === 0 ? 'evidence.projects' : undefined}
              className={`p-3 border cursor-pointer transition-colors ${
                selectedProjectId === project.id
                  ? "border-[#1F2937] bg-[#F4F4F4] dark:bg-[#111827]"
                  : "border-[#E5E7EB] dark:border-[#374151] hover:border-[#4B5563]"
              }`}
              onClick={() => setSelectedProjectId(project.id)}
            >
              <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                {project.name}
              </div>
              <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                {project.department}
              </div>
              <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB] mt-2">
                {evidenceFiles.filter(e => e.projectId === project.id).length} evidence file(s)
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Evidence Files List */}
      {selectedProjectId && (
        <div>
          <h2 className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-4">
            Evidence Files for {selectedProject?.name}
          </h2>
          {projectEvidence.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectEvidence.map((evidence) => (
                <Card
                  key={evidence.id}
                  className="p-4 border border-[#E5E7EB] dark:border-[#374151]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      {getFileIcon(evidence.fileType)}
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] truncate">
                          {evidence.fileName}
                        </div>
                        <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-1">
                          {formatFileSize(evidence.fileSize)}
                        </div>
                        {evidence.description && (
                          <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-2">
                            {evidence.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-[#E5E7EB] dark:border-[#374151]"
                        onClick={() => alert("Download functionality - file would be downloaded")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 border-[#D63636] text-[#D63636] hover:bg-[#D63636] hover:text-white"
                        onClick={() => handleDelete(evidence.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-[#4B5563] dark:text-[#D1D5DB] pt-3 border-t border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {evidence.uploadedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {evidence.uploadedDate}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#F4F4F4] dark:bg-[#111827] rounded-[4px] border border-[#E5E7EB] dark:border-[#374151]">
              <FileText className="h-12 w-12 text-[#4B5563] dark:text-[#D1D5DB] mx-auto mb-3" />
              <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                No evidence files uploaded for this programme yet.
              </p>
              <Button
                onClick={() => setIsUploadDialogOpen(true)}
                variant="outline"
                className="mt-4 border-[#E5E7EB] dark:border-[#374151]"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Evidence
              </Button>
            </div>
          )}
        </div>
      )}

      {!selectedProjectId && (
        <div className="text-center py-12 bg-[#F4F4F4] dark:bg-[#111827] rounded-[4px] border border-[#E5E7EB] dark:border-[#374151]">
          <FileText className="h-12 w-12 text-[#4B5563] dark:text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
            Please select a programme to view or upload evidence files.
          </p>
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
              Upload Evidence Files
            </DialogTitle>
            <DialogDescription className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
              Upload supporting documents, reports, or images as evidence for programme indicators
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="project-select" className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                Programme
              </Label>
              <select
                id="project-select"
                value={selectedProjectId || ""}
                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                className="w-full mt-2 px-3 py-2 border border-[#E5E7EB] dark:border-[#374151] rounded-[4px] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] text-[14px]"
              >
                <option value="">Select a programme...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="file-upload" className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                Files (PDF, Excel, Images)
              </Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] flex items-center gap-2">
                      <FileText className="h-3 w-3" />
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="Describe the evidence files..."
                className="mt-2 min-h-[80px] border-[#E5E7EB] dark:border-[#374151]"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleUpload}
                disabled={!selectedProjectId || selectedFiles.length === 0}
                className="flex-1 bg-[#1F2937] hover:bg-[#4B5563] text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <Button
                onClick={() => {
                  setIsUploadDialogOpen(false);
                  setSelectedFiles([]);
                  setUploadDescription("");
                }}
                variant="outline"
                className="border-[#E5E7EB] dark:border-[#374151]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

