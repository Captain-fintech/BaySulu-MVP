import { NextRequest, NextResponse } from 'next/server';

const OPENAI_URL = 'https://api.openai.com/v1/videos';

export async function POST(req: NextRequest) {
  try {
    const demo = process.env.DEMO_MODE === 'true';

    // Получаем настройки из запроса (текст задания, длительность и т.д.)
    const { prompt, duration = 8, resolution = '1280x720' } = await req.json();

    // === ДЕМО-РЕЖИМ (БЕСПЛАТНО) ===
    if (demo) {
      // Возвращаем готовый тестовый ролик (нейтральный пример)
      return NextResponse.json({
        status: 'completed',
        demo: true,
        // публичный тестовый mp4 (для демонстрации видео-плеера)
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        note: 'Демо-режим: видео не генерируется, просто показываем тестовый ролик.'
      });
    }

    // === РЕАЛЬНЫЙ РЕЖИМ (Sora 2, платно по секундам) ===
    const model = process.env.SORA_MODEL || 'sora-2';
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Нет OPENAI_API_KEY в .env.local' }, { status: 500 });
    }

    // 1) Создаём задачу рендера видео
    const createRes = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        duration,     // напр. 5–20 сек
        resolution,   // '1280x720' и т.п.
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.text();
      return NextResponse.json({ error: `Create failed: ${err}` }, { status: 500 });
    }

    const job = await createRes.json() as { id: string; status: string };

    // 2) Опрос статуса (просто для простоты; в продакшене лучше вебхук)
    const startedAt = Date.now();
    const TIMEOUT_MS = 90_000;
    const INTERVAL_MS = 2000;

    let status = job.status;
    let lastPayload: any = null;

    while (Date.now() - startedAt < TIMEOUT_MS) {
      await new Promise(r => setTimeout(r, INTERVAL_MS));
      const statusRes = await fetch(`${OPENAI_URL}/${job.id}`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (!statusRes.ok) {
        const err = await statusRes.text();
        return NextResponse.json({ error: `Status failed: ${err}` }, { status: 500 });
      }
      lastPayload = await statusRes.json();
      status = lastPayload.status;
      if (status === 'completed' || status === 'failed' || status === 'canceled') break;
    }

    if (status !== 'completed') {
      return NextResponse.json({
        jobId: job.id,
        status,
        note: 'Видео ещё рендерится. Подождите немного и повторите.',
      }, { status: 202 });
    }

    // 3) Получаем ссылку на видео
    const contentRes = await fetch(`${OPENAI_URL}/${job.id}/content`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!contentRes.ok) {
      const err = await contentRes.text();
      return NextResponse.json({ error: `Content fetch failed: ${err}` }, { status: 500 });
    }
    const content = await contentRes.json() as {
      assets: Array<{ type: string; url: string }>;
    };
    const video = content.assets?.find(a => a.type === 'video') ?? content.assets?.[0];

    return NextResponse.json({
      jobId: job.id,
      status: 'completed',
      url: video?.url,
      assets: content.assets,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}
