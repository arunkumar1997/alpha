import * as React from "react";
import ResponsiveAppBar from "@/components/AppBar";
import Reports from "@/components/Home/Reports";

export default function HomePage() {
  return (
    <>
      <ResponsiveAppBar />
      <Reports />
    </>
  );
}
