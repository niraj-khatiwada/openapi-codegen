"use client";

import {
  healthControllerCheckOptions,
  healthControllerCheckQueryKey,
} from "@/api/gen/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    ...healthControllerCheckOptions(),
  });

  return (
    <>
      Health Check:
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>Query Key:</p>
      <pre>{JSON.stringify(healthControllerCheckQueryKey(), null, 2)}</pre>
    </>
  );
}
