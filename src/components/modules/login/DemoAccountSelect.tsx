"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userCredentials } from "@/constants";

interface DemoAccountSelectProps {
  onSelectRole: (email: string, password: string) => void;
}

export function DemoAccountSelect({ onSelectRole }: DemoAccountSelectProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Demo Account (for testing)</p>

      <Select
        onValueChange={(role) => {
          const selectedUser = userCredentials.find((user) => user.role === role);
          if (selectedUser) {
            onSelectRole(selectedUser.email, selectedUser.password);
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a demo role" />
        </SelectTrigger>

        <SelectContent>
          {userCredentials.map((user) => (
            <SelectItem key={user.role} value={user.role}>
              {user.role.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
