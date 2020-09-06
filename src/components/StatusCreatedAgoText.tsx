import React from 'react';

import { Status } from '../api';
import Text from './Text';

interface StatusCreatedAgoTextProps {
  status: Status;
}

export default function StatusCreatedAgoText({ status }: StatusCreatedAgoTextProps) {
  const daysAgoInMs = Date.now() - new Date(status.created_at).getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const daysAgo = Math.round(daysAgoInMs / oneDayInMs);

  return (
    <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
      Created {daysAgo} days ago
    </Text>
  );
}
