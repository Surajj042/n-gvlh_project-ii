"use client";

import { Button } from "@/components/ui/button";
import { addAnnouncement } from "@/lib/actions/forum.action";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SimpleMdeReact from "react-simplemde-editor";
import z from "zod";

const announcementSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

type AnnouncementFormType = z.infer<typeof announcementSchema>;

const AnnouncementForm = ({ announcement }: { announcement?: string }) => {
  const { userId } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnnouncementFormType>({
    resolver: zodResolver(announcementSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!userId) return;
      await addAnnouncement({
        userId: userId as string,
        title: data.title,
        description: data.description,
      });
      router.back();
    } catch (e) {
      setSubmitting(true);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="z-auto w-auto space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-3xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            className="bg-meeting text-meeting h-10 w-full rounded-sm p-3"
            placeholder="Announcement Title"
            {...register("title")}
          />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Announcement Description" {...field} />
          )}
        />
        <Button variant="pink2blue" className="text-white">
          Submit New Announcement
        </Button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
