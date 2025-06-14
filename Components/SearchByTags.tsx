import React, { useState, useEffect } from "react";
import axios from "axios";

export const SearchByTags = () => {
  const [tag, setTag] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const search = async () => {
    const res = await axios.get(`/api/search?tag=${tag}`);
    setResults(res.data);
  };

  useEffect(() => {
    if (tag) search();
  }, [tag]);

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search by skill/tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="border p-2 w-full"
      />
      <div className="space-y-2">
        {results.map((res, idx) => (
          <div key={idx} className="border p-3 rounded bg-white shadow">
            <p><strong>Name:</strong> {res.name}</p>
            <p><strong>Email:</strong> {res.email}</p>
            <p><strong>Skills:</strong> {res.skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};