import React, { useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


const UsersStatusCard = ({ activeUsersPercent, inActiveUsersPercent, activeUsersCount, inActiveUsersCount, totalUsers, activeGroupsPercent, inActiveGroupsPercent, activeGroupsCount, inActiveGroupsCount, totalGroups }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [state, setState] = useState({
    users_graph: "all_users"
  });

  const handleChangeEvent = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }))
  }

  // Users Data
  const usersData = {
    // labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label:['Users (%)'],
        data: [activeUsersPercent, inActiveUsersPercent],
        backgroundColor: ['#2C77FF', '#003696'],
        borderColor: ['#2C77FF', '#003696'],
        borderWidth: 1,
      },
    ],
  };

  // UserGroup Data
  const usersGroupData = {
    // labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        label:['User Group (%)'],
        data: [activeGroupsPercent, inActiveGroupsPercent],
        backgroundColor: ['#2C77FF', '#003696'],
        borderColor: ['#2C77FF', '#003696'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="relative w-full h-full bg-white dark:bg-darkBg px-8 xl:px-4 2xl:px-8 py-8 xl:py-4 2xl:py-4 border border-gray2 dark:border-opacity-10 rounded-3xl drop-shadow-md dark:dorp-shadow-none">
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <img src="../assets/icons/icon-users-dashboard.svg" alt="icon-users" className="w-[36px] h-[36px]" />
            <div className="text-lg font-semibold ml-2 text-navyblue1 dark:text-gray4">{state.users_graph == "all_users" ? "Users" : "User Groups"}</div>
          </div>
          <div className="ml-auto">
            <select
              name="users_graph"
              id="users_graph"
              onChange={(e) => handleChangeEvent(e)}
              className="ed-form__select appearance-none relative min-w-[150px] h-[38px] text-sm dark:bg-darkBg dark:text-gray2 border border-gray2 dark:border-opacity-50 rounded-full py-1 px-4 mt-1 focus:border-secondary focus:outline-none">
              <option defaultValue disabled>Select</option>
              <option value="all_users" selected={state.users_graph == "all_users"}>All Users</option>
              <option value="all_groups" selected={state.users_graph == "all_groups"}>All Groups</option>
            </select>
          </div>
        </div>

        {state.users_graph == "all_users" &&
          <div className="ed-dashboard__users-chart flex items-center relative">
            <Doughnut
              data={usersData}
            />

            <div className="flex flex-column justify-center absolute left-[80px] xl:left-[75px] 2xl:left-[75px] top-[43%] bottom-auto origin-center">
              <div>
                <div className="text-xl xl:text-2xl dark:text-gray4 font-bold leading-tight tracking-tighter">{activeUsersPercent} %</div>
                <div className="text-base font-medium text-center text-gray3">Active </div>
              </div>
            </div>

            <div className="ml-20 xl:ml-5 2xl:ml-auto relative">
              <div className="mb-10 whitespace-nowrap">
                <span className="text-gray3 text-base">Total Users:</span>
                <strong className="ml-2 dark:text-gray3">{totalUsers}</strong>
              </div>
              <div className="flex items-center whitespace-nowrap relative pl-6 mb-2 text-base text-gray3 before:content-[' '] before:absolute before:left-0 before:top-auto before:w-[15px] before:h-[15px] before:bg-primary before:rounded-full">
                Active - <strong className="ml-1 text-black3 dark:text-gray3">{activeUsersCount}</strong>
              </div>
              <div className="flex items-center whitespace-nowrap relative pl-6 mb-2 text-base text-gray3 before:content-[' '] before:absolute before:left-0 before:top-auto before:w-[15px] before:h-[15px] before:bg-black5 before:rounded-full">
                In-active - <strong className="ml-1 text-black3 dark:text-gray3">{inActiveUsersCount}</strong>
              </div>
            </div>
          </div>
        }

        {state.users_graph == "all_groups" &&
          <div className="ed-dashboard__users-chart flex items-center relative">
             <Doughnut
              data={usersGroupData}
            />

            <div className="flex flex-column justify-center absolute left-[80px] xl:left-[75px] 2xl:left-[85px] top-[43%] bottom-auto origin-center">
              <div>
                <div className="text-xl xl:text-2xl dark:text-gray4 font-bold leading-tight tracking-tighter">{activeGroupsPercent} %</div>
                <div className="text-base font-medium text-center text-gray3">Active</div>
              </div>
            </div>

            <div className="ml-20 xl:ml-5 2xl:ml-auto relative">
              <div className="mb-10">
                <span className="text-gray3  text-base whitespace-nowrap">Total Groups:</span>
                <strong className="ml-2 dark:text-gray3">{totalGroups}</strong>
              </div>
              <div className="flex items-center whitespace-nowrap relative pl-6 mb-2 text-base text-gray3 before:content-[' '] before:absolute before:left-0 before:top-auto before:w-[15px] before:h-[15px] before:bg-primary before:rounded-full">
                Active - <strong className="ml-1 text-black3 dark:text-gray3">{activeGroupsCount}</strong>
              </div>
              <div className="flex items-center whitespace-nowrap relative pl-6 mb-2 text-base text-gray3 before:content-[' '] before:absolute before:left-0 before:top-auto before:w-[15px] before:h-[15px] before:bg-black5 before:rounded-full">
                In-active - <strong className="ml-1 text-black3 dark:text-gray3">{inActiveGroupsCount}</strong>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}
export default UsersStatusCard;