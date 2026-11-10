import { useState } from 'react';

interface CharacterAvatarProps {
  characterKey: string;
  emoji: string;
  className?: string;
}

/**
 * public/assets/characters/{characterKey}.webp 가 있으면 그림을, 없으면 이모지를 보여준다.
 * 그림 파일을 하나씩 추가해도 앱이 깨지지 않는다.
 */
export function CharacterAvatar({ characterKey, emoji, className = '' }: CharacterAvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className={`leading-none ${className}`}>{emoji}</span>;
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/characters/${characterKey}.webp`}
      alt=""
      draggable={false}
      onError={() => setFailed(true)}
      className={`w-[1.25em] h-[1.25em] object-contain select-none ${className}`}
    />
  );
}
