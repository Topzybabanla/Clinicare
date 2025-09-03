import PageWrapper from "@/components/PageWrapper";
import { getAllUsers } from "../../api/auth";
import { SkeletonCard } from "../../components/LazyLoader";
import ErrorAlert from "../../components/ErrorAlert";
import { useAuth } from "../../store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import usePaginate from "../../hooks/usePaginate";
import AddNewUser from "../../features/settings/usercard/AddNewUser";
import Filter from "../../features/settings/usercard/filter";
import Search from "../../components/Search";
import Paginate from "../../components/Paginate";
// import UsersCard from "../../features/settings/usercard/UsersCard";
import { lazy, Suspense } from "react";
const UsersCard = lazy(() => import("@/features/settings/usercard/UsersCard"));

export default function Users() {
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const role = searchParams.get("role") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllUsers", page, limit, query, role],
    queryFn: () => getAllUsers(searchParams, accessToken),
  });

  const { handlePageChange, totalPages, hasMore, currentPage } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });

  const users = data?.data?.data?.users || [];

  //   if (isPending) {
  //     return <SkeletonCard />;
  //   }

  return (
    <PageWrapper>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">User Data</h1>
          <p className="text-gray-500">Manage your list of users</p>
        </div>
        {/* <div className=" hidden md:flex gap-4 justify-end"></div> */}
        <div className="  flex gap-4  items-center   md:justify-end">
          <AddNewUser />
        </div>
      </div>
      <div className="flex justify-end items-center pb-10">
        <Search id="search-users">
          <Filter />
        </Search>
      </div>
      {isPending ? (
        <SkeletonCard />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              {users?.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonCard />}>
                    <div className="grid grid-cols-12 gap-4 ">
                      {users.map((item) => (
                        <div
                          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                          key={item._id}
                        >
                          <UsersCard item={item} />
                        </div>
                      ))}
                    </div>
                  </Suspense>
                  <Paginate
                    totalPages={totalPages}
                    hasMore={hasMore}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </>
              ) : (
                <p>No users found</p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
