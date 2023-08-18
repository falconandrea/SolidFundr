import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "../components/Layout";

const New: NextPageWithLayout = () => {
  return <p>test</p>;
};

New.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default New;
