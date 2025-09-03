import PageWrapper from "@/components/PageWrapper";
import Search from "@/components/Search";
import Paginate from "@/components/Paginate";
import { useQuery } from "@tanstack/react-query";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import { getAllRooms } from "../../api/rooms";
import AddRooms from "../../features/rooms/AddRooms";
import usePaginate from "../../hooks/usePaginate";
import { useAuth } from "../../store";
import { useSearchParams } from "react-router";
import Filter from "../../features/rooms/Filter";
import Table from "../../features/rooms/Table";
import { Suspense } from "react";

export default function Rooms() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const params = new URLSearchParams();
  const roomType = searchParams.get("roomType") || "";
  const roomStatus = searchParams.get("roomStatus") || "";
  params.append("page", page);
  params.append("limit", limit);
  if (query) params.append("query", query);
  if (roomType) params.append("roomType", roomType);
  if (roomStatus) params.append("roomStatus", roomStatus);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllRooms", { accessToken, query, roomType, roomStatus }],
    queryFn: () => getAllRooms(params, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });
  
  const rooms = data?.data?.data?.rooms || [];
  

  return (
    <>
      <PageWrapper>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl">Rooms</h1>
            <p className="text-gray-500">Manage your Rooms</p>
          </div>
          <AddRooms />
        </div>

        <div className="flex justify-end items-center">
          <Search id="search-rooms">
            <Filter />
          </Search>
        </div>
        {isPending ? (
          <SkeletonTable />
        ) : (
          <>
            {isError ? (
              <ErrorAlert error={error?.response?.data?.message} />
            ) : (
              <>
                {rooms?.length > 0 ? (
                  <>
                    <Suspense fallback={<SkeletonTable />}>
                      <Table rooms={rooms} />
                    </Suspense>
                    <Paginate
                      totalPages={totalPages}
                      hasMore={hasMore}
                      handlePageChange={handlePageChange}
                      currentPage={currentPage}
                    />
                  </>
                ) : (
                  <p className="mt-6 font-semibold text-center">
                    No Rooms Found
                  </p>
                )}
              </>
            )}
          </>
        )}
      </PageWrapper>
    </>
  );
}
