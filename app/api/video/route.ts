import { NextRequest, NextResponse } from "next/server";

const FAL_KEY = process.env.FAL_API_KEY!;

const MODEL_IDS: Record<string, string> = {
  grok: "xai/grok-imagine-video/image-to-video",
  seedance: "bytedance/seedance-2.0/fast/image-to-video",
};

async function uploadToFal(file: File): Promise<string> {
  const res = await fetch("https://storage.fal.run/upload", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": file.type || "image/jpeg",
      "X-File-Name": file.name || "source-image.jpg",
    },
    body: await file.arrayBuffer(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`fal upload failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  if (!data.url) {
    throw new Error("fal upload failed: response url is missing");
  }

  return data.url as string;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const cause = error.cause instanceof Error ? ` (${error.cause.message})` : "";
    return `${error.name}: ${error.message}${cause}`;
  }

  return String(error);
}

export async function POST(req: NextRequest) {
  try {
    if (!FAL_KEY) {
      return NextResponse.json({ error: "FAL_API_KEY is not configured" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const model = String(formData.get("model") ?? "grok");
    const prompt = String(formData.get("prompt") ?? "natural movement, cinematic");
    const duration = Number(formData.get("duration") ?? 5);
    const resolution = String(formData.get("resolution") ?? "720p");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required" }, { status: 400 });
    }

    const modelId = MODEL_IDS[model];
    if (!modelId) {
      return NextResponse.json({ error: "invalid model" }, { status: 400 });
    }

    const imageUrl = await uploadToFal(file);
    const input: Record<string, unknown> = {
      image_url: imageUrl,
      prompt,
      resolution,
    };

    if (model === "seedance") {
      input.duration = String(Math.min(15, Math.max(4, duration || 5)));
      input.aspect_ratio = "auto";
      input.generate_audio = true;
    } else {
      input.duration = duration;
      input.aspect_ratio = "auto";
    }

    const res = await fetch(`https://queue.fal.run/${modelId}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`fal queue submit failed: ${text}`);
    }

    const data = await res.json();
    return NextResponse.json({ requestId: data.request_id, model });
  } catch (error) {
    const msg = getErrorMessage(error);
    console.error("video submit failed", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const requestId = searchParams.get("requestId");
  const model = searchParams.get("model") ?? "grok";

  if (!requestId) {
    return NextResponse.json({ error: "requestId is required" }, { status: 400 });
  }

  const modelId = MODEL_IDS[model];
  if (!modelId) {
    return NextResponse.json({ error: "invalid model" }, { status: 400 });
  }

  try {
    const statusRes = await fetch(
      `https://queue.fal.run/${modelId}/requests/${requestId}/status`,
      { headers: { Authorization: `Key ${FAL_KEY}` } }
    );
    if (!statusRes.ok) {
      const text = await statusRes.text();
      throw new Error(`status check failed: ${statusRes.status} ${text}`);
    }
    const statusData = await statusRes.json();

    if (statusData.status === "COMPLETED") {
      const resultRes = await fetch(
        `https://queue.fal.run/${modelId}/requests/${requestId}`,
        { headers: { Authorization: `Key ${FAL_KEY}` } }
      );
      if (!resultRes.ok) {
        const text = await resultRes.text();
        throw new Error(`result fetch failed: ${resultRes.status} ${text}`);
      }
      const result = await resultRes.json();
      const videoUrl = result.video?.url ?? result.data?.video?.url;
      if (!videoUrl) {
        throw new Error("result video url is missing");
      }
      return NextResponse.json({ status: "completed", videoUrl });
    }

    if (statusData.status === "FAILED") {
      return NextResponse.json({ status: "failed", error: statusData.error ?? "生成に失敗しました" });
    }

    return NextResponse.json({ status: "processing", queue_position: statusData.queue_position });
  } catch (error) {
    console.error("video poll failed", error);
    return NextResponse.json({ error: "ステータス確認に失敗しました" }, { status: 500 });
  }
}
