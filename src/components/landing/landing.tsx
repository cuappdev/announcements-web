"use client";

import ActiveAnnouncements from "@/components/landing/ActiveAnnouncements";
import CreateAnnouncementEntry from "@/components/landing/CreateAnnouncementEntry";
import Footer from "@/components/landing/Footer";
import PastAnnouncements from "@/components/landing/PastAnnouncements";
import UpcomingAnnouncements from "@/components/landing/UpcomingAnnouncements";
import { Announcement } from "@/models/announcement";
import PageHeader from "@/components/shared/PageHeader";
import NavBar from "@/components/shared/NavBar";
import { useUserStore } from "@/stores/useUserStore";
import ApiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Constants } from "@/utils/constants";

export default function Landing() {
  const apiClient = ApiClient.createInstance();
  const { user } = useUserStore();

  // TODO: Add debug toggle
  const debug: boolean = false;

  // Fetch Announcements
  const fetchAnnouncements = async () => {
    if (!user) return [];

    try {
      ApiClient.setAuthToken(apiClient, user.idToken);
      return await ApiClient.get<Announcement[]>(apiClient, "/announcements", { params: { debug } });
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  const fetchAnnouncementsQuery = useQuery({
    queryKey: [Constants.queryKey.fetchAnnouncements, user],
    queryFn: async () => fetchAnnouncements(),
    enabled: !!user,
  });

  return user?.name !== "" ? (
    <div className="flex flex-col gap-16">
      <NavBar />
      <div className="flex flex-col gap-16 md:gap-20 lg:w-[1128px] lg:mx-auto">
        <div className="flex flex-col gap-8 px-4 md:px-8 lg:hidden">
          <PageHeader
            title={`Welcome, ${user?.name.substring(0, user.name.indexOf(" "))}!`}
            subtitle={"Send announcements to our applications"}
          />
          <CreateAnnouncementEntry />
          <UpcomingAnnouncements announcements={fetchAnnouncementsQuery.data} />
          <ActiveAnnouncements announcements={fetchAnnouncementsQuery.data} />
          <PastAnnouncements announcements={fetchAnnouncementsQuery.data} />
        </div>
        <div className="max-lg:hidden flex flex-col gap-8">
          <PageHeader
            title={`Welcome, ${user?.name.substring(0, user.name.indexOf(" "))}!`}
            subtitle={"Send announcements to our applications"}
          />
          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-8 w-[499px]">
              <CreateAnnouncementEntry />
              <UpcomingAnnouncements announcements={fetchAnnouncementsQuery.data} />
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <ActiveAnnouncements announcements={fetchAnnouncementsQuery.data} />
              <PastAnnouncements announcements={fetchAnnouncementsQuery.data} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ) : null;
}
