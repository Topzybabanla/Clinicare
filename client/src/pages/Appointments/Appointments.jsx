import { getAllAppointments } from "@/api/appointment";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router";
import Table from "../../features/appointment/admin/Table";
import Filter from "../../features/appointment/patient/Filter";
import useMetaArgs from "../../hooks/useMeta";

export default function Appointments() {
  useMetaArgs({
      title: "Appointments, Clinicare",
      description: "Book your appointment",
      keywords: "Health, clinic, Hospital",
    });


  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";
  const time = searchParams.get("time") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: [
      "getAllApointments",
      page,
      limit,
      query,
      status,
      time,
      startDate,
      endDate,
    ],
    queryFn: () => getAllAppointments(searchParams, accessToken),
  });

  const appointment = data?.data?.data?.appointments || [];
 
  const {
    handlePageChange,
    totalPages,
    hasMore,
    currentPage,
    // limit: pageLimit,
  } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  return (
    <PageWrapper>
      <div className="pb-2">
        <h1 className="font-bold text-2xl">Appointments</h1>
        <p className="text-gray-500 text-[14px] md:text-[16px]">
          Manage patients appointments.
        </p>
      </div>
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-appointments">
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
              {appointment?.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonTable />}>
                    <Table appointment={appointment} />
                  </Suspense>
                  <Paginate
                    totalPages={totalPages}
                    hasMore={hasMore}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <p className="mt-6  font-semibold text-center">
                  No appointments found
                </p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
