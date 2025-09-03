import React from "react";
import { formatDate, usersRoleColors } from "../../../utils/constants";
import Edit from "../Edit";
import DeleteUser from "../DeleteUser";
import { useAuth } from "../../../store";

export default function UserCards({ item }) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-lg p-6 max-w-[400px] w-full mt-4  ">
      <div className="flex gap-3">
        <div className="avatar avatar-placeholder">
          <div className="w-12 h-12  rounded-full bg-gray-300">
            {item?.avatar ? (
              <img
                src={item?.avatar}
                alt={item?.fullname}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ) : (
              <span className="text-sm flex items-center justify-center">
                {item?.fullname
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1 flex-1">
          <h2 className="text-lg font-semibold">{item?.fullname}</h2>
          <p className="text-gray-500 text-sm">{item?.email}</p>

          {/* <p
            className={`text-sm font-bold rounded-full px-2 w-fit
              ${item?.role === 'patient' ? 'bg-red-200 text-red-500' : ''}
              ${item?.role === 'doctor' ? 'bg-green-200 text-green-500' : ''}
              ${item?.role === 'admin' ? 'bg-blue-200 text-blue-500' : ''}
            `}
          >
            {item?.role}
          </p> */}
          <div
            className={`capitalize badge badge-sm font-semibold my-2 ${
              usersRoleColors[item.role]
            }`}
          >
            {item.role}
          </div>

          <p className="text-gray-500 text-sm">{item?.phone}</p>
          <p className="text-gray-400 text-xs">
            Joined: {formatDate(item.createdAt)}
          </p>
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="flex justify-end gap-2 mt-4">
          <Edit item={item} />
          <DeleteUser item={item} />
        </div>
      )}
    </div>
  );
}
