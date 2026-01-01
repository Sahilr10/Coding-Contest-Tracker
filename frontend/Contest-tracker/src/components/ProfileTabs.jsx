import { useState } from "react";
import Overview from "./Overview";
import ConnectedAccounts from "./ConnectedAccounts";
import ContestStats from "./ContestStats";
import Analytics from "./Analytics";
import Notifications from "./Notifications";
import Settings from "./Settings";

const tabs = [
  "Overview",
  "Connected Accounts",
  "Contest Stats",
  "Analytics",
  "Notifications",
  "Settings",
];

const ProfileTabs = ({ user, fetchUser }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <div className="w-full overflow-x-auto flex justify-center no-scrollbar">
        <div className="inline-flex items-center gap-1 bg-[#0b1224] border border-white/10 rounded-full p-1 shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
                ${
                  activeTab === tab
                    ? "bg-white text-black shadow"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Overview" && <Overview user={user} />}

      {activeTab === "Connected Accounts" && (
        <ConnectedAccounts user={user} fetchUser={fetchUser} />
      )}

      {activeTab === "Contest Stats" && (
        <ContestStats user={user} fetchUser={fetchUser} />
      )}

      {activeTab === "Analytics" && (
        <Analytics user={user} fetchUser={fetchUser} />
      )}

      {activeTab === "Notifications" && (
        <Notifications user={user} fetchUser={fetchUser} />
      )}

      {activeTab === "Settings" && (
        <Settings user={user} fetchUser={fetchUser} />
      )}
    </>
  );
};

export default ProfileTabs;
