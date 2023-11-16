'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { Tooltip } from '@shared/ui';
import CopyIcon from '@public/icons/copy.svg';

import styles from './CopyToClipboard.module.scss';

export default function CopyToClipboard({ toCopy }: { toCopy: string | number }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);

    navigator.clipboard.writeText(toCopy.toString());
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  return (
    <Tooltip text="Copied" show={copied}>
      <Image
        src={CopyIcon}
        className={clsx(styles.image, copied && styles.image_copied)}
        alt="Copy to clipboard"
        draggable="false"
        onClick={copy}
      />
    </Tooltip>
  );
}
