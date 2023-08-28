import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PopoverContent } from "@/components/ui/popover";
import { useFetchProfileByIdQuery } from "@/slices/usersApiSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "cmdk";
import { ChevronDownIcon, Command } from "lucide-react";
import { useParams } from "react-router-dom";

export const UserDetailScreen = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchProfileByIdQuery(id);
  const { displayName, avatar } = data?.data || {};

  return (
    <>
      {/* {isLoading ? (
        <h1>Loadinh.....</h1>
      ) : (
        <>
          <div>
            <h1>{displayName}</h1>
            <img src={avatar} alt="avatar" />
          </div>
        </>
      )} */}

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Owner{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Viewer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view and comment.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Developer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and edit.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Billing</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and manage billing.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Owner</p>
                        <p className="text-sm text-muted-foreground">
                          Admin-level access to all resources.
                        </p>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">p@example.com</p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Member{" "}
                  <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="end">
                <Command>
                  <CommandInput placeholder="Select new role..." />
                  <CommandList>
                    <CommandEmpty>No roles found.</CommandEmpty>
                    <CommandGroup className="p-1.5">
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Viewer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view and comment.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Developer</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and edit.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Billing</p>
                        <p className="text-sm text-muted-foreground">
                          Can view, comment and manage billing.
                        </p>
                      </CommandItem>
                      <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                        <p>Owner</p>
                        <p className="text-sm text-muted-foreground">
                          Admin-level access to all resources.
                        </p>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
