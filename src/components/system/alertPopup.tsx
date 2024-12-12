import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface Props {
  title: string;
  description: string;
  actionText?: string;
  action: () => void;
  open: boolean;
  onOpenChange: (val: boolean) => void;
}

export default function AlertPopup({ title, description, actionText = "Continue", action, open, onOpenChange }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="flex p-4 justify-center items-center rounded-md transition-all duration-300 bg-other-background hover:opacity-80 border-none shadow-none">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex p-4 justify-center items-center rounded-md transition-all duration-300 bg-red-600 hover:bg-red-500 shadow-none"
            onClick={action}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
