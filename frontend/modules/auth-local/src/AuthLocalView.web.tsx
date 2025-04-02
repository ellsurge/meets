import * as React from 'react';

import { AuthLocalViewProps } from './AuthLocal.types';

export default function AuthLocalView(props: AuthLocalViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
