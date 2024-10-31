import { Story } from "@models/stories";
import { useMutation, useQuery } from "@tanstack/react-query";
import { env } from "../env";

export const isShort = (story: Story) => {
  if (!story.translations.en) return false;
  return story.translations.en.length <= 100;
};

const fetchStories = async () => {
  const response = await fetch(`${env().API_URL}/admin/stories`);
  return response.json() as Promise<Story[]>;
};

export const useStories = () => {
  const query = useQuery({
    queryKey: ["admin", "stories"],
    queryFn: fetchStories,
  });
  return { query };
};

const deleteStory = async (id: string) => {
  const response = await fetch(`${env().API_URL}/admin/stories/${id}`, {
    method: "DELETE",
  });
  return response.json() as Promise<string>;
};

export const useDeleteStory = () => {
  const mutation = useMutation({
    mutationFn: deleteStory,
  });
  return { mutation };
};

export const createStory = async (story: Story) => {
  const response = await fetch(`${env().API_URL}/admin/stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(story),
  });
  return response.json() as Promise<Story>;
};

export const useCreateStory = () => {
  const mutation = useMutation({
    mutationFn: createStory,
  });
  return { mutation };
};

export const updateStory = async (story: Story) => {
  const response = await fetch(`${env().API_URL}/admin/stories/${story.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(story),
  });
  return response.json() as Promise<Story>;
};

export const useUpdateStory = () => {
  const mutation = useMutation({
    mutationFn: updateStory,
  });
  return { mutation };
};
