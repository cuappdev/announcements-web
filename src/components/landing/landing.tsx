"use client";

import LandingActiveSection from "@/components/landing/landingActiveSection";
import LandingCreateAnnouncement from "@/components/landing/landingCreateAnnouncement";
import Footer from "@/components/common/footer";
import LandingPastSection from "@/components/landing/landingPastSection";
import LandingUpcomingSection from "@/components/landing/landingUpcomingSection";
import { Announcement } from "@/models/announcement";
import PageHeader from "@/components/common/pageHeader";
import NavBar from "@/components/common/navBar";
import { useUserStore } from "@/stores/useUserStore";
import ApiClient from "@/services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { Constants } from "@/utils/constants";
import { useState } from "react";
import AnnouncementForm from "../announcement/announcementForm";

export default function Landing() {
  const apiClient = ApiClient.createInstance();
  const { user } = useUserStore();

  // TODO: Add debug toggle
  const debug: boolean = false;

  const [showForm, setShowForm] = useState<boolean>(false);

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

      {showForm ? <AnnouncementForm onClose={() => setShowForm(false)} /> : null}

      <div className="flex flex-col gap-16 md:gap-20 lg:w-[1128px] lg:mx-auto">
        <div className="flex flex-col gap-8 px-4 md:px-8 lg:hidden">
          <PageHeader
            title={`Welcome, ${user?.name.substring(0, user.name.indexOf(" "))}!`}
            subtitle={"Send announcements to our applications."}
          />
          <LandingCreateAnnouncement action={() => setShowForm(true)} />
          <LandingUpcomingSection announcements={fetchAnnouncementsQuery.data} />
          <LandingActiveSection announcements={fetchAnnouncementsQuery.data} />
          <LandingPastSection announcements={fetchAnnouncementsQuery.data} />
        </div>
        <div className="max-lg:hidden flex flex-col gap-8">
          <PageHeader
            title={`Welcome, ${user?.name.substring(0, user.name.indexOf(" "))}!`}
            subtitle={"Send announcements to our applications."}
          />
          <div className="flex flex-row gap-8">
            <div className="flex flex-col gap-8 w-[499px]">
              <LandingCreateAnnouncement action={() => setShowForm(true)} />
              <LandingUpcomingSection announcements={fetchAnnouncementsQuery.data} />
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <LandingActiveSection announcements={fetchAnnouncementsQuery.data} />
              <LandingPastSection announcements={fetchAnnouncementsQuery.data} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ) : null;
}
