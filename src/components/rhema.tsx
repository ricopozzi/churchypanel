import React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";

export const Rhema = (props: IContentLoaderProps) => (
  <ContentLoader viewBox='0 0 400 160' height={110} width={400} {...props}>
    <rect x='0' y='13' rx='4' ry='4' width='400' height='9' />
    <rect x='0' y='29' rx='4' ry='4' width='100' height='8' />
    <rect x='0' y='50' rx='4' ry='4' width='400' height='10' />
    <rect x='0' y='65' rx='4' ry='4' width='400' height='10' />
    <rect x='0' y='79' rx='4' ry='4' width='100' height='10' />
    <rect x='0' y='99' rx='5' ry='5' width='400' height='200' />
  </ContentLoader>
);
