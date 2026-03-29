
// =========================
// FilterGroup.tsx (layout wrapper)
// =========================
interface GroupProps {
  children: React.ReactNode;
}

export const FilterGroup = ({ children }: GroupProps) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-4 mt-4 mb-6">
      {children}
    </div>
  );
};
