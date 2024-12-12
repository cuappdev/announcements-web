"use client";

import Footer from "@/components/common/footer";
import NavBar from "@/components/common/navBar";
import PageHeader from "@/components/common/pageHeader";
import LandingActiveSection from "@/components/landing/landingActiveSection";
import LandingCreateAnnouncement from "@/components/landing/landingCreateAnnouncement";
import LandingPastSection from "@/components/landing/landingPastSection";
import LandingUpcomingSection from "@/components/landing/landingUpcomingSection";
import { Announcement } from "@/models/announcement";
import ApiClient from "@/services/apiClient";
import { useUserStore } from "@/stores/useUserStore";
import { Constants } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AnnouncementForm from "../announcement/announcementForm";
import errorToast from "../system/errorToast";

export default function Landing() {
  const apiClient = ApiClient.createInstance();
  const { user } = useUserStore();

  // TODO: Add debug toggle
  const debug: boolean = false;

  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | undefined>(undefined);

  // Fetch Announcements
  const fetchAnnouncements = async () => {
    if (!user) return [];

    try {
      ApiClient.setAuthToken(apiClient, user.idToken);
      return await ApiClient.get<Announcement[]>(apiClient, "/announcements", { params: { debug } });
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

  // Edit Announcement
  const editAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setShowForm(true);
  };

  // Close Form
  const closeForm = (refetch: boolean) => {
    setShowForm(false);
    setEditingAnnouncement(undefined);

    if (refetch) fetchAnnouncementsQuery.refetch();
  };

  return user?.name !== "" ? (
    <div className="flex flex-col gap-16 md:gap-20 lg:gap-[132px]">
      <NavBar />

      {showForm ? <AnnouncementForm onClose={closeForm} editingAnnouncement={editingAnnouncement} /> : null}

      <div className="flex flex-col gap-16 md:gap-20 lg:w-[1128px] lg:mx-auto">
        <div className="flex flex-col gap-8 px-4 md:px-8 lg:hidden">
          <PageHeader
            title={`Welcome, ${user?.name.substring(0, user.name.indexOf(" "))}!`}
            subtitle={"Send announcements to our applications."}
          />
          <LandingCreateAnnouncement action={() => setShowForm(true)} />
          <LandingUpcomingSection announcements={fetchAnnouncementsQuery.data} />
          <LandingActiveSection
            announcements={fetchAnnouncementsQuery.data}
            onEditClick={editAnnouncement}
            onRefetch={() => fetchAnnouncementsQuery.refetch()}
          />
          <LandingPastSection announcements={fetchAnnouncementsQuery.data} onEditClick={editAnnouncement} />
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
              <LandingActiveSection
                announcements={fetchAnnouncementsQuery.data}
                onEditClick={editAnnouncement}
                onRefetch={() => fetchAnnouncementsQuery.refetch()}
              />
              <LandingPastSection announcements={fetchAnnouncementsQuery.data} onEditClick={editAnnouncement} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ) : null;
}
