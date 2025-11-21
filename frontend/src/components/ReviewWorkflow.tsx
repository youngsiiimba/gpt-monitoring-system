import { useState, useEffect } from "react";
import { workflowItems, type WorkflowItem, type WorkflowStatus } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  FileText,
  User,
  Calendar,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";

const statusConfig: Record<WorkflowStatus, { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: "Draft", color: "#4B5563", icon: <FileText className="h-4 w-4" /> },
  submitted: { label: "Submitted", color: "#3B82F6", icon: <ArrowRight className="h-4 w-4" /> },
  under_review: { label: "Under Review", color: "#F59E0B", icon: <Clock className="h-4 w-4" /> },
  approved: { label: "Approved", color: "#10B981", icon: <CheckCircle2 className="h-4 w-4" /> },
  rejected: { label: "Rejected", color: "#D63636", icon: <XCircle className="h-4 w-4" /> },
  returned: { label: "Returned", color: "#F59E0B", icon: <AlertCircle className="h-4 w-4" /> },
};

export default function ReviewWorkflow() {
  useEffect(() => {
    const dismissed = localStorage.getItem("mrs_onboarding_dismissed");
    if (!dismissed) {
      window.dispatchEvent(new CustomEvent("openOnboarding", { detail: { page: "review" } }));
    }
  }, []);
  const [selectedItem, setSelectedItem] = useState<WorkflowItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [filterStatus, setFilterStatus] = useState<WorkflowStatus | "all">("all");

  const filteredItems = filterStatus === "all" 
    ? workflowItems 
    : workflowItems.filter(item => item.status === filterStatus);

  const handleItemClick = (item: WorkflowItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
    setReviewComment(item.comments || "");
  };

  const handleApprove = () => {
    // Mock approval action
    alert("Report approved successfully!");
    setIsDialogOpen(false);
  };

  const handleReject = () => {
    // Mock rejection action
    if (!reviewComment.trim()) {
      alert("Please provide a comment for rejection.");
      return;
    }
    alert("Report rejected. Comments saved.");
    setIsDialogOpen(false);
  };

  const handleReturn = () => {
    // Mock return action
    if (!reviewComment.trim()) {
      alert("Please provide comments for returning the report.");
      return;
    }
    alert("Report returned to Programme Manager for correction.");
    setIsDialogOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
          Review & Approval Workflow
        </h1>
        <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
          Manage quarterly report submissions, reviews, and approvals
        </p>
        
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex flex-wrap gap-2" data-onboarding="review.filters">
        <Button
          variant={filterStatus === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterStatus("all")}
          className="h-9 text-[14px]"
        >
          All ({workflowItems.length})
        </Button>
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = workflowItems.filter(item => item.status === status).length;
          return (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status as WorkflowStatus)}
              className="h-9 text-[14px]"
            >
              {config.icon}
              <span className="ml-2">{config.label} ({count})</span>
            </Button>
          );
        })}
      </div>

      {/* Workflow Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const config = statusConfig[item.status];
          return (
            <Card
              key={item.id}
              className="p-4 border border-[#E5E7EB] dark:border-[#374151] cursor-pointer hover:border-[#4B5563] transition-colors"
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-[16px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-1">
                    {item.projectName}
                  </h3>
                  <p className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                    {item.department}
                  </p>
                </div>
                <Badge
                  style={{ backgroundColor: config.color, color: "white" }}
                  className="flex items-center gap-1"
                >
                  {config.icon}
                  {config.label}
                </Badge>
              </div>

              <div className="space-y-2 text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>Quarter: {item.quarter}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span>Submitted by: {item.submittedBy}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>Submitted: {item.submittedDate}</span>
                </div>
                {item.reviewedBy && (
                  <div className="flex items-center gap-2">
                    <FileCheck className="h-3 w-3" />
                    <span>Reviewed by: {item.reviewedBy}</span>
                  </div>
                )}
                {item.comments && (
                  <div className="flex items-start gap-2 mt-2 pt-2 border-t border-[#E5E7EB] dark:border-[#374151]">
                    <MessageSquare className="h-3 w-3 mt-0.5" />
                    <span className="line-clamp-2">{item.comments}</span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Workflow Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151]">
          <DialogHeader>
            <DialogTitle className="text-[20px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
              {selectedItem?.projectName}
            </DialogTitle>
            <DialogDescription className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
              {selectedItem?.department} - {selectedItem?.quarter}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6 mt-4">
              {/* Workflow Status Timeline */}
              <div className="bg-[#F4F4F4] dark:bg-[#1F2937] rounded-[4px] p-4 border border-[#E5E7EB] dark:border-[#374151]">
                <h4 className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-3">
                  Workflow Status
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <div className="flex-1">
                      <div className="text-[12px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                        Submitted by Programme Manager
                      </div>
                      <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB]">
                        {selectedItem.submittedBy} on {selectedItem.submittedDate}
                      </div>
                    </div>
                  </div>
                  {selectedItem.reviewedBy && (
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        selectedItem.status === "approved" ? "bg-[#10B981]" :
                        selectedItem.status === "rejected" || selectedItem.status === "returned" ? "bg-[#D63636]" :
                        "bg-[#F59E0B]"
                      }`} />
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                          Reviewed by Reviewer
                        </div>
                        <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB]">
                          {selectedItem.reviewedBy} on {selectedItem.reviewedDate}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedItem.approvedBy && (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <div className="flex-1">
                        <div className="text-[12px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                          Approved by Treasury Manager
                        </div>
                        <div className="text-[11px] text-[#4B5563] dark:text-[#D1D5DB]">
                          {selectedItem.approvedBy} on {selectedItem.approvedDate}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Deviation Explanation */}
              {selectedItem.deviationExplanation && (
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-[4px] p-4">
                  <h4 className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    Deviation Explanation
                  </h4>
                  <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                    {selectedItem.deviationExplanation}
                  </p>
                </div>
              )}

              {/* Review Comments */}
              {selectedItem.comments && (
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-[4px] p-4">
                  <h4 className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    Review Comments
                  </h4>
                  <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                    {selectedItem.comments}
                  </p>
                </div>
              )}

              {/* Action Buttons (for reviewers/managers) */}
              {(selectedItem.status === "submitted" || selectedItem.status === "under_review") && (
                <div className="space-y-4 pt-4 border-t border-[#E5E7EB] dark:border-[#374151]">
                  <div>
                    <Label htmlFor="review-comment" className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                      Review Comment
                    </Label>
                    <Textarea
                      id="review-comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Enter your review comments..."
                      className="mt-2 min-h-[100px] border-[#E5E7EB] dark:border-[#374151]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleApprove}
                      className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={handleReturn}
                      variant="outline"
                      className="flex-1 border-[#E5E7EB] dark:border-[#374151]"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Return for Correction
                    </Button>
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="flex-1 border-[#D63636] text-[#D63636] hover:bg-[#D63636] hover:text-white"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

