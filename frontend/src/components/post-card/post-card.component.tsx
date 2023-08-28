import {
  ChevronDownIcon,
  CircleIcon,
  Link1Icon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { ThumbsUp } from "lucide-react";

export const PostCard = () => {
  return (
    <Card className="bg-background">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>shadcn/ui</CardTitle>
          <CardDescription>
            Beautifully designed components built with Radix UI and Tailwind
            CSS.
          </CardDescription>
        </div>

        <Button variant="secondary" className="px-3 shadow-none">
          <Link1Icon className="mr-2 h-4 w-4" />
          View
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-3 w-3" />
            20k
          </div>

          <div>Uploaded on April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
};
