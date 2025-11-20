import { Alert, AlertDescription, AlertTitle } from "./ui/alert.tsx";
import { Badge } from "./ui/badge.tsx";
import { Button } from "./ui/button.tsx";
import { Card } from "./ui/card.tsx";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import { Textarea } from "./ui/textarea.tsx";
import { projects } from "../data/mockData.ts";
import { AlertCircle, Calculator, FileText, Save, Send } from "lucide-react";
import { useState } from "react";

export default function ReportSubmission() {
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
        null,
    );
    const [actualValue, setActualValue] = useState<string>("");
    const [deviationExplanation, setDeviationExplanation] = useState<string>(
        "",
    );
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedProject = selectedProjectId
        ? projects.find((p) => p.id === selectedProjectId)
        : null;

    const variance = selectedProject && actualValue
        ? Number(actualValue) - selectedProject.target
        : 0;

    const variancePercent = selectedProject && selectedProject.target > 0
        ? ((variance / selectedProject.target) * 100).toFixed(1)
        : "0";

    const validateForm = (): boolean => {
        const errors: string[] = [];

        if (!selectedProjectId) {
            errors.push("Please select a programme.");
        }

        if (!actualValue || isNaN(Number(actualValue))) {
            errors.push("Please enter a valid actual value.");
        }

        if (selectedProject && actualValue) {
            const actual = Number(actualValue);
            const variancePercent =
                ((actual - selectedProject.target) / selectedProject.target) *
                100;

            if (
                Math.abs(variancePercent) > 10 && !deviationExplanation.trim()
            ) {
                errors.push(
                    "Deviation explanation is required when variance exceeds 10%.",
                );
            }
        }

        setValidationErrors(errors);
        return errors.length === 0;
    };

    const handleSaveDraft = () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            alert("Draft saved successfully!");
            setIsSubmitting(false);
        }, 500);
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            alert(
                `Report submitted successfully for ${selectedProject?.name}!\n\nActual: ${actualValue} ${selectedProject?.unit}\nVariance: ${
                    variance > 0 ? "+" : ""
                }${variance} (${variancePercent}%)`,
            );
            setIsSubmitting(false);
            // Reset form
            setActualValue("");
            setDeviationExplanation("");
            setValidationErrors([]);
        }, 500);
    };

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-6 md:mb-8">
                <h1 className="text-[24px] md:text-[28px] font-bold text-[#1F2937] dark:text-[#F9FAFB] mb-2">
                    Quarterly Report Submission
                </h1>
                <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                    Submit quarterly performance data with validation and
                    deviation explanations
                </p>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <Alert className="mb-6 border-[#D63636] bg-red-50 dark:bg-red-950/20">
                    <AlertCircle className="h-4 w-4 text-[#D63636]" />
                    <AlertTitle className="text-[14px] font-medium">
                        Validation Errors
                    </AlertTitle>
                    <AlertDescription className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB] mt-2">
                        <ul className="list-disc list-inside space-y-1">
                            {validationErrors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            {/* Programme Selection */}
            <Card className="p-6 mb-6 border border-[#E5E7EB] dark:border-[#374151]">
                <Label className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-3 block">
                    Select Programme
                </Label>
                <select
                    value={selectedProjectId || ""}
                    onChange={(e) => {
                        setSelectedProjectId(Number(e.target.value));
                        setActualValue("");
                        setDeviationExplanation("");
                        setValidationErrors([]);
                    }}
                    className="w-full px-3 py-2 border border-[#E5E7EB] dark:border-[#374151] rounded-[4px] bg-white dark:bg-[#1F2937] text-[#1F2937] dark:text-[#F9FAFB] text-[14px]"
                >
                    <option value="">Select a programme...</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name} - {project.department}
                        </option>
                    ))}
                </select>
            </Card>

            {/* Report Form */}
            {selectedProject && (
                <div className="space-y-6">
                    {/* Programme Info */}
                    <Card className="p-6 border border-[#E5E7EB] dark:border-[#374151]">
                        <h2 className="text-[18px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                            Programme Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                                    Programme
                                </Label>
                                <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mt-1">
                                    {selectedProject.name}
                                </div>
                            </div>
                            <div>
                                <Label className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                                    Department
                                </Label>
                                <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mt-1">
                                    {selectedProject.department}
                                </div>
                            </div>
                            <div>
                                <Label className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                                    Indicator
                                </Label>
                                <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mt-1">
                                    {selectedProject.indicator}
                                </div>
                            </div>
                            <div>
                                <Label className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                                    Quarter
                                </Label>
                                <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mt-1">
                                    {selectedProject.quarter}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 mb-6 border border-[#E5E7EB] dark:border-[#374151] bg-[#FEF3C7] dark:bg-[#78350F]/20 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="secondary"
                                className="text-[#92400E] border-[#F59E0B]"
                            >
                                <strong>SOAR Compliant (POC)</strong>
                            </Badge>
                            <span className="text-[13px] text-[#92400E] dark:text-[#FDE68A]">
                                This feature is a proof-of-concept. Full SOAR
                                functionality is a work in progress.
                            </span>
                        </div>
                        <p className="text-[12px] text-[#92400E] dark:text-[#FDE68A] mt-1">
                            Fields and metrics are{" "}
                            <strong>provisionally aligned</strong>
                            with the associated SOAR template for the selected
                            programme. Full integration is pending due to time
                            constraints.
                        </p>
                    </Card>

                    {/* Performance Data */}
                    <Card className="p-6 border border-[#E5E7EB] dark:border-[#374151]">
                        <h2 className="text-[18px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                            Performance Data
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label
                                    htmlFor="target"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Target Value
                                </Label>
                                <Input
                                    id="target"
                                    type="text"
                                    value={`${selectedProject.target.toLocaleString()} ${selectedProject.unit}`}
                                    disabled
                                    className="mt-2 bg-[#F4F4F4] dark:bg-[#111827] border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="actual"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Actual Value *
                                </Label>
                                <div className="relative mt-2">
                                    <Input
                                        id="actual"
                                        type="number"
                                        value={actualValue}
                                        onChange={(e) =>
                                            setActualValue(e.target.value)}
                                        placeholder={`Enter actual value in ${selectedProject.unit}`}
                                        className="border-[#E5E7EB] dark:border-[#374151]"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                                        {selectedProject.unit}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Variance Calculation */}
                        {actualValue && !isNaN(Number(actualValue)) && (
                            <div className="mt-4 p-4 bg-[#F4F4F4] dark:bg-[#111827] rounded-[4px] border border-[#E5E7EB] dark:border-[#374151]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calculator className="h-4 w-4 text-[#4B5563] dark:text-[#D1D5DB]" />
                                    <Label className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                                        Variance Calculation
                                    </Label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[13px]">
                                    <div>
                                        <span className="text-[#4B5563] dark:text-[#D1D5DB]">
                                            Variance:
                                        </span>
                                        <div
                                            className={`text-[16px] font-semibold mt-1 ${
                                                variance < 0
                                                    ? "text-[#D63636]"
                                                    : "text-[#1F2937] dark:text-[#F9FAFB]"
                                            }`}
                                        >
                                            {variance > 0 ? "+" : ""}
                                            {variance.toLocaleString()}{" "}
                                            {selectedProject.unit}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[#4B5563] dark:text-[#D1D5DB]">
                                            Variance %:
                                        </span>
                                        <div
                                            className={`text-[16px] font-semibold mt-1 ${
                                                Number(variancePercent) < -10
                                                    ? "text-[#D63636]"
                                                    : Number(variancePercent) <
                                                            0
                                                    ? "text-[#F59E0B]"
                                                    : "text-[#1F2937] dark:text-[#F9FAFB]"
                                            }`}
                                        >
                                            {variancePercent}%
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[#4B5563] dark:text-[#D1D5DB]">
                                            Status:
                                        </span>
                                        <div className="mt-1">
                                            <Badge
                                                variant="outline"
                                                className={variance < 0 &&
                                                        Math.abs(
                                                                Number(
                                                                    variancePercent,
                                                                ),
                                                            ) > 10
                                                    ? "border-[#D63636] text-[#D63636]"
                                                    : variance < 0
                                                    ? "border-[#F59E0B] text-[#F59E0B]"
                                                    : "border-[#10B981] text-[#10B981]"}
                                            >
                                                {variance < 0 &&
                                                        Math.abs(
                                                                Number(
                                                                    variancePercent,
                                                                ),
                                                            ) > 10
                                                    ? "Significant Deviation"
                                                    : variance < 0
                                                    ? "Below Target"
                                                    : "On/Above Target"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                    {/* Generic SOAR Fields - POC */}
                    <Card className="p-6 border border-[#E5E7EB] dark:border-[#374151]">
                        <h2 className="text-[18px] font-medium text-[#1F2937] dark:text-[#F9FAFB] mb-4">
                            Example SOAR Metrics 
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Beneficiaries / Participants */}
                            <div>
                                <Label
                                    htmlFor="beneficiaries"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Number of Beneficiaries / Participants
                                </Label>
                                <Input
                                    id="beneficiaries"
                                    type="number"
                                    placeholder="Enter number of beneficiaries"
                                    className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>

                            {/* Budget Utilization */}
                            <div>
                                <Label
                                    htmlFor="budget"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Budget Utilization (%)
                                </Label>
                                <Input
                                    id="budget"
                                    type="number"
                                    placeholder="Enter % of budget spent"
                                    className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>

                            {/* Job Creation */}
                            <div>
                                <Label
                                    htmlFor="jobs"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Job Creation (Direct / Indirect)
                                </Label>
                                <Input
                                    id="jobs"
                                    type="number"
                                    placeholder="Enter number of jobs created"
                                    className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>

                            {/* Risk / Issues */}
                            <div>
                                <Label
                                    htmlFor="risks"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Key Risks / Issues
                                </Label>
                                <Textarea
                                    id="risks"
                                    placeholder="Describe any key risks or issues"
                                    className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>

                            {/* Compliance Checks */}
                            <div>
                                <Label
                                    htmlFor="compliance"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Compliance Checks
                                </Label>
                                <Textarea
                                    id="compliance"
                                    placeholder="Notes on regulatory / audit compliance"
                                    className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>

                            {/* Comments / Notes */}
                            <div className="md:col-span-2">
                                <Label
                                    htmlFor="notes"
                                    className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]"
                                >
                                    Additional Comments / Notes
                                </Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Any additional observations or context"
                                    className="mt-2 border-[#E5E7EB] dark:border-[#374151]"
                                />
                            </div>
                        </div>

                        <p className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mt-3">
                            These fields are optional and demonstrate
                            intended SOAR compliance. Full automatic integration
                            will be available in the production version.
                        </p>
                    </Card>

                    {/* Deviation Explanation */}
                    <Card className="p-6 border border-[#E5E7EB] dark:border-[#374151]">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="h-5 w-5 text-[#F59E0B]" />
                            <h2 className="text-[18px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                                Deviation Explanation
                            </h2>
                            {actualValue && selectedProject &&
                                Math.abs(
                                        ((Number(actualValue) -
                                            selectedProject.target) /
                                            selectedProject.target) * 100,
                                    ) > 10 &&
                                (
                                    <Badge
                                        variant="destructive"
                                        className="bg-[#D63636] text-white"
                                    >
                                        Required
                                    </Badge>
                                )}
                        </div>
                        <p className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB] mb-3">
                            {actualValue && selectedProject &&
                                    Math.abs(
                                            ((Number(actualValue) -
                                                selectedProject.target) /
                                                selectedProject.target) * 100,
                                        ) > 10
                                ? "A deviation explanation is required when the variance exceeds 10%."
                                : "Provide an explanation if actual values deviate significantly from targets."}
                        </p>
                        <Textarea
                            value={deviationExplanation}
                            onChange={(e) =>
                                setDeviationExplanation(e.target.value)}
                            placeholder="Explain any deviations from the target value, including reasons, challenges, and mitigation measures..."
                            className="min-h-[120px] border-[#E5E7EB] dark:border-[#374151]"
                        />
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            onClick={handleSaveDraft}
                            disabled={isSubmitting || !actualValue}
                            variant="outline"
                            className="flex-1 border-[#E5E7EB] dark:border-[#374151]"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Draft
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !actualValue}
                            className="flex-1 bg-[#1F2937] hover:bg-[#4B5563] text-white"
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Submit Report
                        </Button>
                    </div>
                </div>
            )}

            {!selectedProject && (
                <Card className="p-12 text-center border border-[#E5E7EB] dark:border-[#374151]">
                    <FileText className="h-12 w-12 text-[#4B5563] dark:text-[#D1D5DB] mx-auto mb-3" />
                    <p className="text-[14px] text-[#4B5563] dark:text-[#D1D5DB]">
                        Please select a programme to begin submitting your
                        quarterly report.
                    </p>
                </Card>
            )}
        </div>
    );
}
