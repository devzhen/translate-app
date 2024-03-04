import { NextRequest } from 'next/server';
import path from 'ramda/src/path';

import { SYSTRAN_ENDPOINT, SYSTRAN_KEY } from '@/app/constants';

export const GET = async (req: NextRequest) => {
  let searchParams = req.nextUrl.searchParams;
  const input = searchParams.get('input');
  const source = searchParams.get('source') || 'auto';
  const target = searchParams.get('target');

  if (!input) {
    return new Response(`The required query param 'input' was not provided`, {
      status: 500,
    });
  }

  if (!target) {
    return new Response(`The required query param 'target' was not provided`, {
      status: 500,
    });
  }

  searchParams = new URLSearchParams();
  searchParams.set('input', input);
  searchParams.set('target', target);
  searchParams.set('source', source);
  searchParams.set('withInfo', 'true');
  searchParams.set('withSource', 'true');
  searchParams.set('withAnnotations', 'true');

  let json = {};

  try {
    const res = await fetch(`${SYSTRAN_ENDPOINT}/text/translate?${searchParams.toString()}`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${SYSTRAN_KEY}`,
      },
    });

    json = await res.json();

    if ('error' in json) {
      return new Response(path(['error', 'message'], json), {
        status: 500,
      });
    }
  } catch (err) {
    return new Response((err as Error).message, {
      status: 500,
    });
  }

  return Response.json(path(['outputs', '0', 'output'], json));
};
