import { account } from "@/appwrite";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";

export type Preferences = Awaited<ReturnType<typeof account.getPrefs>>;

const prefsQueryKey = ["prefs"];

export const usePreferences = () => {
  const prefsQuery = useSuspenseQuery({
    queryKey: prefsQueryKey,
    queryFn: () => account.getPrefs(),
  });

  const prefsMutation = useMutation({
    mutationFn: (prefs: Partial<Preferences>) => account.updatePrefs(prefs),
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!prefsMutation.isSuccess) return;
    queryClient.setQueryData(prefsQueryKey, prefsMutation.data.prefs);
  }, [prefsMutation, queryClient]);

  return { prefsQuery, prefsMutation };
};
