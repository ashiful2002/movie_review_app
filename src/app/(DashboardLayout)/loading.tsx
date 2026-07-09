import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <>
      <div className="flex justify-center h-screen items-center gap-6">
        <Spinner className="size-6" />{" "}
        <span>Loading User Dashboard Status...</span>
      </div>{" "}
    </>
  );
};

export default loading;
