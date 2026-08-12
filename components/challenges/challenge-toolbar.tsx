"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categoryOptions, organizationTypeOptions } from "@/lib/constants";
import type { PublicChallengeLifecycle } from "@/lib/challenges";

const lifecycleOptions: Array<{ value: PublicChallengeLifecycle; label: string }> = [
  { value: "opens-soon", label: "Opens soon" },
  { value: "registration-open", label: "Registration open" },
  { value: "building", label: "Building in progress" },
  { value: "submission-closed", label: "Submission closed" },
  { value: "under-review", label: "Under review" },
  { value: "completed", label: "Completed" },
  { value: "closed", label: "Closed" }
];

type FilterName = "category" | "orgType" | "lifecycle" | "sort";

export function ChallengeToolbar({
  resultCount,
  initialQuery
}: {
  resultCount: number;
  initialQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const current = searchParams.get("q") || "";
      const next = query.trim();
      if (current === next) return;
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set("q", next);
      else params.delete("q");
      router.replace(`${pathname}${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [pathname, query, router, searchParams]);

  function update(name: FilterName, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && !(name === "sort" && value === "newest")) params.set(name, value);
    else params.delete(name);
    router.push(`${pathname}${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  const selectedFilters = ["q", "category", "orgType", "lifecycle"].filter((name) =>
    Boolean(searchParams.get(name))
  ).length;

  return (
    <section className="challenge-toolbar" aria-label="Challenge search and filters">
      <div className="challenge-toolbar__primary">
        <label className="challenge-search">
          <span>Search challenges</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by brief or organization"
          />
        </label>
        <div className="challenge-toolbar__desktop-filters">
          <FilterControls searchParams={searchParams} update={update} idSuffix="desktop" />
        </div>
        <details className="challenge-toolbar__mobile-filters">
          <summary>
            Filters{selectedFilters ? ` (${selectedFilters})` : ""}
          </summary>
          <div>
            <FilterControls searchParams={searchParams} update={update} idSuffix="mobile" />
          </div>
        </details>
      </div>
      <div className="challenge-toolbar__summary">
        <p aria-live="polite">
          <strong>{resultCount}</strong> {resultCount === 1 ? "challenge" : "challenges"}
        </p>
        {selectedFilters ? <Link href="/challenges">Clear filters</Link> : null}
      </div>
    </section>
  );
}

function FilterControls({
  searchParams,
  update,
  idSuffix
}: {
  searchParams: ReturnType<typeof useSearchParams>;
  update: (name: FilterName, value: string) => void;
  idSuffix: string;
}) {
  return (
    <>
      <label>
        <span>Category</span>
        <select
          id={`category-${idSuffix}`}
          value={searchParams.get("category") || ""}
          onChange={(event) => update("category", event.target.value)}
        >
          <option value="">All categories</option>
          {categoryOptions.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Organization</span>
        <select
          id={`organization-${idSuffix}`}
          value={searchParams.get("orgType") || ""}
          onChange={(event) => update("orgType", event.target.value)}
        >
          <option value="">All organizations</option>
          {organizationTypeOptions.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select
          id={`lifecycle-${idSuffix}`}
          value={searchParams.get("lifecycle") || ""}
          onChange={(event) => update("lifecycle", event.target.value)}
        >
          <option value="">All lifecycle stages</option>
          {lifecycleOptions.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
      <label className="challenge-toolbar__sort">
        <span>Sort</span>
        <select
          id={`sort-${idSuffix}`}
          value={searchParams.get("sort") || "newest"}
          onChange={(event) => update("sort", event.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="deadline">Registration deadline</option>
          <option value="teams">Most registered teams</option>
        </select>
      </label>
    </>
  );
}
