import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  selectedDepartment: string;
  selectedStatus: string;
  selectedQuarter: string;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onQuarterChange: (value: string) => void;
  departments: string[];
}

export default function FilterBar({
  selectedDepartment,
  selectedStatus,
  selectedQuarter,
  onDepartmentChange,
  onStatusChange,
  onQuarterChange,
  departments,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div className="flex-1 min-w-[200px]">
        <Label className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB] mb-2 block">
          Department
        </Label>
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className="h-10 rounded-[4px] border-[#E5E7EB] text-[16px] focus:border-[#4B5563] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB]">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <Label className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB] mb-2 block">
          Status
        </Label>
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="h-10 rounded-[4px] border-[#E5E7EB] text-[16px] focus:border-[#4B5563] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="On Track">On Track</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 min-w-[200px]">
        <Label className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB] mb-2 block">
          Quarter
        </Label>
        <Select value={selectedQuarter} onValueChange={onQuarterChange}>
          <SelectTrigger className="h-10 rounded-[4px] border-[#E5E7EB] text-[16px] focus:border-[#4B5563] dark:border-[#374151] dark:bg-[#1F2937] dark:text-[#F9FAFB]">
            <SelectValue placeholder="All Quarters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Quarters</SelectItem>
            <SelectItem value="Q1">Q1</SelectItem>
            <SelectItem value="Q2">Q2</SelectItem>
            <SelectItem value="Q3">Q3</SelectItem>
            <SelectItem value="Q4">Q4</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

