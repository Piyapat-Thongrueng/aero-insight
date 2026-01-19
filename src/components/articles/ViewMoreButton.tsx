import { Spinner } from "../ui/spinner";

interface ViewMoreButtonProps {
  isLoading: boolean;
  hasMore: boolean;
  onViewMore: () => void;
}

const ViewMoreButton = ({
  isLoading,
  hasMore,
  onViewMore,
}: ViewMoreButtonProps) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex w-full justify-center items-center py-10 px-7 gap-3">
      {isLoading ? (
        <>
          <Spinner className="text-black size-10" />
          <span>Loading...</span>
        </>
      ) : (
        <button
          onClick={onViewMore}
          disabled={isLoading}
          className="text-body-1 text-brown-600 text-center transition-opacity bg-gray-200 p-4 rounded-full hover:bg-gray-300 cursor-pointer"
        >
          View more
        </button>
      )}
    </div>
  );
};

export default ViewMoreButton;
