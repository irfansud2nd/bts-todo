"use client";

import { Checklist, baseUrl } from "@/lib/constants";
import { useEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const checklistId = params.id;
  const token = sessionStorage.getItem("token");
  const [checklist, setChecklist] = useState<Checklist | undefined>(undefined);

  const getChecklist = async () => {
    try {
      const response = await fetch(`${baseUrl}/checklist/${checklistId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log(response, result);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getChecklist();
  }, []);
  return <div>{checklistId}</div>;
};
export default page;
