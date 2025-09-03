import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router";
import { getAllPatients } from "../../api/patients";
import PatientFilter from "./PatientFilter";
import { lazy, Suspense } from "react";
const Table = lazy(() => import("@/pages/patients/Table"));

export default function Patients() {
  const [searchParams] = useSearchParams();
  const { accessToken } = useAuth();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllPatients", page, limit, query],
    queryFn: () => getAllPatients(searchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const patients = data?.data?.data?.patients || [];
  // const patients = users.filter((user) => user.role === "patient");

  return (
    <PageWrapper>
      <div className="flex justify-between items-center pb-2">
        <div className="">
          <h1 className="font-bold text-2xl">Patient Data</h1>
          <p className="text-gray-500 text-[14px] md:text-[16px]">
            Manage your list of patients.
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center pb-10">
        <Search id="search-users">
          <PatientFilter />
        </Search>
      </div>
      <div className="flex items-center md:justify-end mt-5"></div>
      {isPending ? (
        <SkeletonTable />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              {/* {patients?.length > 0 ? ( */}
              <>
                <Suspense fallback={<SkeletonTable />}>
                  <Table patients={patients} />
                </Suspense>
                <Paginate
                  totalPages={totalPages}
                  hasMore={hasMore}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </>
              {/* ) : (
                <p className="mt-6 font-semibold text-center">
                  {" "}
                  No patients found{" "}
                </p>
              )} */}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
