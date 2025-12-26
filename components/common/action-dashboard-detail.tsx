import React from "react";
import { SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ActionDashboardDetailProps {
  editHandler: () => void;
  deleteHandler: () => void;
}

const ActionDashboardDetail: React.FC<ActionDashboardDetailProps> = (props) => {
  const { editHandler, deleteHandler } = props;

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="!p-0 h-auto w-auto cursor-pointer"
              onClick={editHandler}
            >
              <SquarePen className="!w-6 !h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialog>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="!p-0 h-auto w-auto cursor-pointer"
                >
                  <Trash className="!w-6 !h-6" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-500/80 transition-colors"
              onClick={deleteHandler}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionDashboardDetail;
