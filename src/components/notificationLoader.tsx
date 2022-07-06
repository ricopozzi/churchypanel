import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const NotificationLoader = (props: IContentLoaderProps) => {
  return (
    <ContentLoader
      height={200}
      width={300}
      viewBox='0 0 240 50'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
    >
      <circle cx='27' cy='27' r='18' />
      <rect x='53' y='14' rx='3' ry='3' width='180' height='13' />
      <rect x='53' y='30' rx='3' ry='3' width='10' height='10' />
      <rect x='67' y='30' rx='3' ry='3' width='74' height='10' />
    </ContentLoader>
  );
};
