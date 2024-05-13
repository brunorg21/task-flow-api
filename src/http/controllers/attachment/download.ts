import { supabaseClient } from "@/db/supabase/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function download(req: FastifyRequest, reply: FastifyReply) {
  const downloadRequestBodySchema = z.object({
    fileName: z.string(),
  });

  const { fileName } = downloadRequestBodySchema.parse(req.params);

  try {
    const { data, error } = await supabaseClient.storage
      .from("attachments")
      .download(fileName);

    const buffer = await data?.arrayBuffer();

    return reply.status(200).send({
      buffer,
    });
  } catch (error) {
    return reply.status(500).send({
      message: "Erro ao baixar imagem.",
    });
  }
}
