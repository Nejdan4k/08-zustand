import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `NoteHub — ${note.title}`;
  const description =
    note.content?.slice(0, 160) || "View note details in NoteHub.";
  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL ?? "http:
  }/notes/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https:
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}



export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}