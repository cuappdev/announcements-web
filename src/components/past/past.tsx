"use client";

import { useLoading } from "@/hooks/useLoading";
import { Announcement } from "@/models/announcement";
import { AppName } from "@/models/enums/appName";
import { SortType } from "@/models/enums/sortType";
import ApiClient from "@/services/apiClient";
import { useUserStore } from "@/stores/useUserStore";
import { Constants } from "@/utils/constants";
import { dateInRange, filterPastAnnouncements, sortAnnouncementsByStartDate } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { ListFilter } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import Footer from "../common/footer";
import LoadingScreen from "../common/loadingScreen";
import NavBar from "../common/navBar";
import PageHeader from "../common/pageHeader";
import Divider from "../system/divider";
import errorToast from "../system/errorToast";
import InputSearch from "../system/input/inputSearch";
import { InputSelect } from "../system/input/inputSelect";
import PastAnnouncementCell from "./pastAnnouncementCell";
import PastFilter from "./pastFilter";

export default function Past() {
  const apiClient = ApiClient.createInstance();
  const { user } = useUserStore();

  const [searchText, setSearchText] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<SortType>(SortType.MOST_RECENT);
  const [listedAnnouncements, setListedAnnouncements] = useState<Announcement[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterDateRange, setFilterDateRange] = useState<DateRange | undefined>(undefined);
  const [filterApps, setFilterApps] = useState<AppName[]>([]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // Fetch Announcements
  const fetchAnnouncements = async () => {
    if (!user) return [];

    try {
      ApiClient.setAuthToken(apiClient, user.idToken);
      const allAnnouncements = await ApiClient.get<Announcement[]>(apiClient, "/announcements", {
        params: { debug: false },
      });
      const pastAnnouncements = sortAnnouncementsByStartDate(filterPastAnnouncements(allAnnouncements ?? [])).reverse();
      return pastAnnouncements;
    } catch (err) {
      console.error(err);
      errorToast();
      return [];
    }
  };
  const fetchAnnouncementsQuery = useQuery({
    queryKey: [Constants.queryKey.fetchAnnouncements, user],
    queryFn: async () => fetchAnnouncements(),
    enabled: !!user,
  });

  // Logic
  useEffect(() => {
    if (!fetchAnnouncementsQuery.data) return;

    // Searching
    const searched = fetchAnnouncementsQuery.data.filter((announcement) => {
      const title = announcement.title.toLowerCase().replace(/\s/g, "");
      const search = searchText.toLowerCase().replace(/\s/g, "");
      return title.includes(search);
    });

    // Sorting
    const sorted = [...searched].sort((a, b) => {
      switch (selectedSort) {
        case SortType.MOST_RECENT:
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case SortType.OLDEST:
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case SortType.TITLE_A_Z:
          return a.title.localeCompare(b.title);
        case SortType.TITLE_Z_A:
          return b.title.localeCompare(a.title);
        default:
          return 0; // No sorting if selectedSort is invalid
      }
    });

    // Filtering
    const hasOverlap = (arr1: AppName[], arr2: AppName[]) => {
      if (filterApps.length === 0) return true;
      return arr1.some((item) => arr2.includes(item));
    };
    const withinRange = (announcement: Announcement) => {
      const startDate = filterDateRange?.from;
      const endDate = filterDateRange?.to;
      if (!startDate || !endDate) return true;

      // Beginning of start date to end of end date
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      return (
        dateInRange(startDate, endDate, new Date(announcement.startDate)) ||
        dateInRange(startDate, endDate, new Date(announcement.endDate))
      );
    };
    const filtered = sorted.filter(
      (announcement) => hasOverlap(announcement.apps, filterApps) && withinRange(announcement)
    );
    setListedAnnouncements(filtered);
    setShowFilters(false);
  }, [searchText, selectedSort, filterDateRange, filterApps, fetchAnnouncementsQuery.data]);

  // Loading Screen
  const { isLoading } = useLoading(Constants.timer.loadingScreen, fetchAnnouncementsQuery.isFetched);
  useEffect(() => {
    // Disable scrolling when isLoading is true
    if (isLoading) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLoading]);

  return (
    <>
      <LoadingScreen canDismiss={fetchAnnouncementsQuery.isFetched} />

      <div className="flex flex-col gap-16 md:gap-20 lg:gap-[132px] bg-other-background min-h-screen">
        <NavBar />
        <div className="flex flex-col gap-6 px-4 md:gap-8 lg:px-0 lg:w-[1128px] lg:mx-auto">
          {/* Header */}
          <PageHeader title="Past Announcements" subtitle="All of the previous inactive announcements." />

          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-3">
            <InputSearch text={searchText} placeholder="Search announcements" onChange={handleSearchChange} />
            <div className="flex flex-row justify-between md:flex-1">
              <div
                className="flex flex-row gap-3 items-center px-4 py-3 rounded-md bg-neutral-white border border-other-stroke opacity-hover"
                onClick={() => setShowFilters(true)}
              >
                <ListFilter className="size-[16px] stroke-neutral-400" />
                <p className="b1 text-neutral-500">
                  {filterDateRange && filterApps.length !== 0
                    ? "Filter - 2"
                    : filterDateRange || filterApps.length !== 0
                    ? "Filter - 1"
                    : "Filter"}
                </p>
              </div>
              {showFilters ? (
                <PastFilter
                  initialDateRange={filterDateRange}
                  initialApps={filterApps}
                  onCancel={() => setShowFilters(false)}
                  onApply={(newDateRange, newApps) => {
                    setFilterDateRange(newDateRange);
                    setFilterApps(newApps);
                  }}
                />
              ) : null}
              <div className="flex flex-row gap-2 items-center">
                <p className="b1 text-neutral-300">SORT BY</p>
                <InputSelect selected={selectedSort} setSelected={(selected) => setSelectedSort(selected)} />
              </div>
            </div>
          </div>

          {/* Table Header */}
          <p className="b1 text-neutral-500">{`${listedAnnouncements.length} ${
            listedAnnouncements.length === 1 ? "announcement" : "announcements"
          }`}</p>
          <div className="max-md:hidden flex flex-col p-6 bg-neutral-white rounded-lg">
            <div className="flex flex-row gap-6 items-center">
              <h6 className="w-[48px] text-neutral-400">Image</h6>
              <h6 className="max-lg:flex-grow text-neutral-400 lg:w-[164px]">Title</h6>
              <h6 className="w-[144px] text-neutral-400">Start Time</h6>
              <h6 className="w-[144px] text-neutral-400">End Time</h6>
              <h6 className="max-lg:hidden w-[164px] text-neutral-400">Scheduler</h6>
              <h6 className="w-[144px] text-neutral-400 lg:w-[216px]">Apps</h6>
            </div>
            {listedAnnouncements.map((announcement) => (
              <div key={announcement.id}>
                <Divider style="horizontal" className="bg-other-stroke my-4" />
                <PastAnnouncementCell announcement={announcement} />
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-4 md:hidden">
            {listedAnnouncements.map((announcement) => (
              <PastAnnouncementCell key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="lg:w-[1128px] lg:mx-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
