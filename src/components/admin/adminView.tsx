"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { User } from "@/models/user";
import ApiClient from "@/services/apiClient";
import { useUserStore } from "@/stores/useUserStore";
import { Constants } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AlertPopup from "../system/alertPopup";
import ButtonPrimary2 from "../system/button/buttonPrimary2";
import errorToast from "../system/errorToast";
import InputSearch from "../system/input/inputSearch";

export default function UserManagement() {
  const apiClient = ApiClient.createInstance();
  const { user } = useUserStore();

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<string>("member");
  const [addUserLoading, setAddUserLoading] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User>();

  // Fetch Users
  const fetchUsers = async () => {
    if (!user) return;

    try {
      ApiClient.setAuthToken(apiClient, user.idToken);
      const users = await ApiClient.get<User[]>(apiClient, "/users");
      const filteredUsers = users.filter((u) => u.id !== user.id); // Don't show self
      return filteredUsers;
    } catch (err) {
      console.error(err);
      errorToast();
      return [];
    }
  };
  const fetchUsersQuery = useQuery({
    queryKey: [Constants.queryKey.fetchUsers, user],
    queryFn: async () => fetchUsers(),
    enabled: !!user,
  });

  // Search User
  useEffect(() => {
    if (!fetchUsersQuery.data) return;

    const filtered = fetchUsersQuery.data.filter((user) => user.email.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredUsers(filtered);
  }, [searchText, fetchUsersQuery.data]);

  // Toggle User Role
  const toggleUserRole = async (userToChange: User) => {
    if (!user) return;

    try {
      ApiClient.setAuthToken(apiClient, user.idToken);
      const updatedUser = await ApiClient.put<User>(apiClient, `/users/${userToChange.id}`, {
        isAdmin: !userToChange.isAdmin,
      });
      fetchUsersQuery.refetch();
    } catch (err) {
      console.error(err);
      errorToast();
    }
  };

  // Remove User
  const removeUser = async () => {
    if (!user || !userToDelete) return;

    try {
      ApiClient.setAuthToken(apiClient, user.idToken);
      const deletedUser = await ApiClient.delete<User>(apiClient, `/users/${userToDelete.id}`);
      fetchUsersQuery.refetch();
    } catch (err) {
      console.error(err);
      errorToast();
    }
  };

  // Add User
  const addUser = async () => {
    if (!user) return;

    try {
      setAddUserLoading(true);
      ApiClient.setAuthToken(apiClient, user.idToken);
      const addedUser = await ApiClient.post<User>(apiClient, "/users", {
        email: newUserEmail,
        isAdmin: newUserRole === "admin",
      });
      fetchUsersQuery.refetch();
      setAddUserLoading(false);
    } catch (err) {
      console.error(err);
      errorToast();
      setAddUserLoading(false);
    }
  };

  // Validate Email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      {/* Alert */}
      <AlertPopup
        title="Remove User"
        description={`Are you sure you want to remove ${userToDelete?.email}?`}
        actionText="Remove"
        action={removeUser}
        open={userToDelete !== undefined}
        onOpenChange={() => setUserToDelete(undefined)}
      />

      {/* Dialog */}
      <Dialog>
        {/* Trigger */}
        <DialogTrigger asChild>
          <Button variant="outline" className="shadow-none">
            Manage Users
          </Button>
        </DialogTrigger>

        {/* View */}
        <DialogContent>
          <DialogTitle>Manage Users</DialogTitle>

          <div className="flex flex-col gap-6">
            {/* List */}
            <div className="flex flex-col gap-3">
              <InputSearch
                text={searchText}
                placeholder="Search users..."
                onChange={(e) => setSearchText(e.target.value)}
                className="md:w-full lg:w-full"
              />
              <ScrollArea className="h-[260px] w-full rounded-md border p-4">
                <div className="flex flex-col gap-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <p className="b1 truncate mr-2">{user.email}</p>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`user-role-${user.id}`} className="sr-only">
                          Admin
                        </Label>
                        <Switch
                          id={`user-role-${user.id}`}
                          checked={user.isAdmin}
                          onCheckedChange={() => toggleUserRole(user)}
                        />
                        <span className="b2 text-neutral-400 w-14">{user.isAdmin ? "Admin" : "Member"}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setUserToDelete(user)}
                          aria-label={`Remove ${user.email}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Add User */}
            <div className="flex flex-col gap-3">
              <h6>Add New User</h6>
              <Input
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="Email"
                className="col-span-4"
              />
              <Select value={newUserRole} onValueChange={setNewUserRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <ButtonPrimary2
                text="Add User"
                action={addUser}
                disabled={!isValidEmail(newUserEmail)}
                isLoading={addUserLoading}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
