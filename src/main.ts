import "./style.css";

const allBtns = document.querySelectorAll(
  ".frontend, .midweight, .javascript, .django, .python, .junior, .react, .saas, .html, .css, .ror, .vue, .backend, .senior, .fullstack",
) as NodeListOf<HTMLButtonElement>;

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

function filterJobs(filter: string) {
  const activeFilters = Array.from(allBtns).map((btn) =>
    btn.textContent?.trim(),
  );
  console.log(activeFilters);

  if (activeFilters.includes(filter)) {
    filterContainer.classList.remove("hidden");
  }

  return activeFilters;
}

jobListings.forEach((job) => {
  const jobTag = job.querySelectorAll("button");
  console.log(jobTag);

  jobTag.forEach((tag) => {
    tag.addEventListener("click", () => {
      filterContainer.classList.remove("hidden");

      const tagText = tag.textContent?.trim();
      console.log(tagText);

      const newBtn = document.createElement("button");
      newBtn.className =
        "text-[hsl(180,29%,50%)] bg-[hsl(180,29%,96%)] flex flex-row gap-2 items-center font-bold rounded-sm pl-2 text-md cursor-pointer";

      newBtn.innerHTML = `
        ${tagText},
        <img
          class="clear text-white bg-[hsl(180,29%,50%)] hover:bg-black w-full h-full rounded-sm p-3 cursor-pointer"
          src="./src/assets/icon-remove.svg"
          alt="Remove"
        />
      `;

      innerDiv.appendChild(newBtn);

      const clearBtns = newBtn.querySelector<HTMLElement>(".clear");
      clearBtns?.addEventListener("click", () => {
        newBtn.classList.add("hidden");
      });
    });
  });
});

clearBtn?.addEventListener("click", () => {
  innerDiv.innerHTML = "";
  filterContainer.classList.add("hidden");
});

filterJobs("frontend");
