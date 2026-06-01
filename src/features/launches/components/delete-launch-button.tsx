import { Button } from "@/components/ui/button";
import { deleteLaunchAction } from "@/features/launches/actions/delete-launch";

type DeleteLaunchButtonProps = {
  launchId: string;
};

export const DeleteLaunchButton = ({ launchId }: DeleteLaunchButtonProps) => {
  return (
    <form action={deleteLaunchAction}>
      <input type="hidden" name="launchId" value={launchId} />

      <Button type="submit" variant="danger">
        Delete launch
      </Button>
    </form>
  );
};
