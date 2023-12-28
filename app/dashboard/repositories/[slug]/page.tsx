'use client';
import React from 'react';

import Repository from '@/containers/repository';

export default function Page({ params }: { params: { slug: string } }) {
  return <Repository slug={params.slug as string} />;
}
