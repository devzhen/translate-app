import ISO6391 from 'iso-639-1';

import { SYSTRAN_ENDPOINT, SYSTRAN_KEY } from '@/app/constants';
import { LangDataType } from '@/app/types';

export const GET = async () => {
  try {
    const res = await fetch(`${SYSTRAN_ENDPOINT}/supportedLanguages`, {
      method: 'GET',
      headers: {
        Authorization: `Key ${SYSTRAN_KEY}`,
      },
    });

    const json = await res.json();

    if (json.error) {
      return Response.json(
        { error: json.error?.message, status: json.error?.statusCode },
        {
          status: json.error?.statusCode,
        },
      );
    }

    const acc: LangDataType = {};
    for (let i = 0; i < json.languagePairs.length; i++) {
      const langItem = json.languagePairs[i];
      const langName = ISO6391.getName(langItem.source);

      if (!langName) {
        continue;
      }

      const item = acc[langItem.source] || {};

      if (!item.name) {
        item.name = langName;
      }
      item.source = langItem.source;

      const prevPairs = acc[langItem.source]?.pairs || [];

      item.pairs = [...prevPairs, langItem.target];

      acc[langItem.source] = item;
    }

    return Response.json(acc);
  } catch (err) {}
};
