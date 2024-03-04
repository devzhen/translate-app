'use client';

import debounce from 'debounce';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import {
  CARD_TYPE,
  INITIAL_TRANSLATION_STATE,
  INPUT_DEBOUNCE,
  MAX_INPUT_LENGTH,
} from '@/app/constants';
import { CardType, LangDataType } from '@/app/types';
import {
  constructInitialBadges,
  updateBadgesActiveState,
  swapBadges,
  getCurrentSourceAndTarget,
} from '@/app/utils/constructLangBadges';

import Card from '../Card';

import styles from './CardWrapper.module.css';

type CardWrapperProps = {
  requestUrl: string;
  langs: LangDataType;
};

function CardWrapper(props: CardWrapperProps) {
  const { requestUrl, langs } = props;

  const [state, setState] = useState({
    badges: constructInitialBadges(langs),
    input: INITIAL_TRANSLATION_STATE.input,
    translation: INITIAL_TRANSLATION_STATE.translation,
    isLoading: false,
  });
  const stateRef = useRef(state);

  /**
   * Swap languages handler
   */
  const onSwapHandler = () => {
    setState((prev) => ({
      ...prev,
      input: stateRef.current.translation,
      translation: stateRef.current.input,
      badges: swapBadges(prev.badges),
    }));
  };

  /**
   * Translate handler
   */
  const translateHandler = async () => {
    try {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));

      const { source, target } = getCurrentSourceAndTarget(stateRef.current.badges);

      const url = new URL(`${requestUrl}api/translation/translateText`);
      url.searchParams.set('input', stateRef.current.input);
      url.searchParams.set('source', source);
      url.searchParams.set('target', target);

      const response = await fetch(url.toString());
      const translation = await response.json();

      setState((prev) => ({
        ...prev,
        translation,
        isLoading: false,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const translateDebounced = useCallback(
    debounce(() => {
      translateHandler();
    }, INPUT_DEBOUNCE),
    [],
  );

  /**
   * Copy a text
   */
  const copyText = (text: string) => () => {
    navigator.clipboard.writeText(text);
  };

  /**
   * Play a sound
   */
  const getSound = (type: CardType) => () => {
    const { source, target } = getCurrentSourceAndTarget(stateRef.current.badges);

    const input = type === CARD_TYPE.left ? stateRef.current.input : stateRef.current.translation;
    const lang = type === CARD_TYPE.left ? source : target;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = input;
    utterance.lang = lang;

    speechSynthesis.speak(utterance);
  };

  /**
   * On Badge click handler
   */
  const onBadgeClickHandler = (type: CardType) => (source: string) => {
    setState((prev) => ({
      ...prev,
      badges: updateBadgesActiveState(type, source, prev.badges),
    }));
  };

  /**
   * On change handler
   */
  const onChange = (curr: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length > MAX_INPUT_LENGTH) {
      e.preventDefault();

      return;
    }

    setState((prev) => ({
      ...prev,
      [curr]: value,
    }));
  };

  /**
   * Is swap disables
   */
  const isSwapDisabled = () => {
    // When user select 'Detect language' option
    return state.badges[CARD_TYPE.left].active[0] === true;
  };

  /**
   * Lifecycle
   */
  useEffect(() => {
    stateRef.current = state;

    translateDebounced();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.badges, state.input, state.translation]);

  const badges = {
    [CARD_TYPE.left]: {
      text: state.badges[CARD_TYPE.left].text,
      active: state.badges[CARD_TYPE.left].active,
      source: state.badges[CARD_TYPE.left].source,
    },
    [CARD_TYPE.right]: {
      text: state.badges[CARD_TYPE.right].text,
      active: state.badges[CARD_TYPE.right].active,
      source: state.badges[CARD_TYPE.right].source,
    },
  };

  return (
    <div className={styles.container}>
      <Card
        badges={badges[CARD_TYPE.left]}
        copyText={copyText(state.input)}
        getSound={getSound(CARD_TYPE.left)}
        input={state.input}
        onChange={onChange('input')}
        onSwap={onSwapHandler}
        translate={translateHandler}
        type={CARD_TYPE.left}
        isLoading={state.isLoading}
        onBadgeClick={onBadgeClickHandler(CARD_TYPE.left)}
      />
      <Card
        badges={badges[CARD_TYPE.right]}
        copyText={copyText(state.translation)}
        getSound={getSound(CARD_TYPE.right)}
        input={state.translation}
        onChange={onChange('translation')}
        onSwap={onSwapHandler}
        translate={translateHandler}
        type={CARD_TYPE.right}
        onBadgeClick={onBadgeClickHandler(CARD_TYPE.right)}
        isSwapDisabled={isSwapDisabled()}
      />
    </div>
  );
}

export default CardWrapper;
