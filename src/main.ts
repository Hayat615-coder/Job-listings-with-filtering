import "./style.css";

const filterContainer = document.getElementById(
  "filter-container",
) as HTMLDivElement;
const clearBtn = document.querySelector(".clear") as HTMLButtonElement | null;
const jobListings = document.querySelectorAll(
  "li",
) as NodeListOf<HTMLLIElement>;
const innerDiv = filterContainer.querySelector(
  ".inner-filter",
) as HTMLDivElement;

function filterJobs() {
  const activeFilters = Array.from(innerDiv.querySelectorAll("button"))
    .map((btn) => btn.querySelector("span")?.textContent?.trim() || "")
    .filter((text) => text !== "");

  if (activeFilters.length === 0) {
    filterContainer.classList.add("hidden");
  } else {
    filterContainer.classList.remove("hidden");
  }

  jobListings.forEach((job) => {
    const jobTags = Array.from(job.querySelectorAll("button")).map(
      (btn) => btn.textContent?.trim() || "",
    );

    const isMatching = activeFilters.every((filter) =>
      jobTags.includes(filter),
    );

    if (isMatching || activeFilters.length === 0) {
      job.classList.remove("hidden");
    } else {
      job.classList.add("hidden");
    }
  });
}

jobListings.forEach((job) => {
  const jobTags = job.querySelectorAll("button");

  jobTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const tagText = tag.textContent?.trim();
      if (!tagText) return;

      const existingFilters = Array.from(
        innerDiv.querySelectorAll("button span"),
      ).map((span) => span.textContent?.trim());

      if (existingFilters.includes(tagText)) return;

      const newBtn = document.createElement("button");
      newBtn.className =
        "text-[hsl(180,29%,50%)] bg-[hsl(180,29%,96%)] flex flex-row gap-2 items-center font-bold rounded-sm pl-2 text-md cursor-pointer";

      newBtn.innerHTML = `<span>${tagText}</span><img class="clear text-white bg-[hsl(180,29%,50%)] hover:bg-black w-full h-full rounded-sm p-3 cursor-pointer" src="./src/assets/icon-remove.svg" alt="Remove" />`;

      const removeIcon = newBtn.querySelector<HTMLElement>(".clear");
      removeIcon?.addEventListener("click", (e) => {
        e.stopPropagation();
        newBtn.remove();
        filterJobs();
      });

      innerDiv.appendChild(newBtn);
      filterJobs();
    });
  });
});

clearBtn?.addEventListener("click", () => {
  innerDiv.innerHTML = "";
  filterJobs();
});
