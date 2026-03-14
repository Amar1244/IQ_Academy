// ===============================
// SANITY CONFIG
// ===============================
const SANITY_PROJECT_ID = "uf4i0j52";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-01-10";

// ===============================
// GENERIC PAGE LOADER
// ===============================
async function loadPageSections(pageSlug) {
  const query = `
    *[_type == "websiteSection" && page->slug.current == "${pageSlug}"]
    | order(order asc) {
      _id,
      title,
      "posts": *[_type == "sectionPost" && section._ref == ^._id]
        | order(order asc, _createdAt desc) {
          title,
          content,
          "imageUrl": image.asset->url
        }
    }
  `;

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById("cms-root");
    if (!container) return;

    container.innerHTML = "";

    data.result.forEach(section => {
      const sectionWrapper = document.createElement("div");
      sectionWrapper.className = "container-xxl py-5";

      sectionWrapper.innerHTML = `
        <div class="container">
          <div class="text-center mb-5">
            <h6 class="section-title bg-white text-center text-primary px-3">
              ${section.title}
            </h6>
          </div>
          <div class="row g-4"></div>
        </div>
      `;

      const row = sectionWrapper.querySelector(".row");

      section.posts.forEach(post => {
        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 wow fadeInUp";

        col.innerHTML = `
          <div class="course-item bg-light">
            <div class="position-relative overflow-hidden image-container">
              <img class="img-fluid" src="${post.imageUrl || ""}" alt="${post.title}">
            </div>
            <div class="text-center p-4 pb-0">
              <h5 class="mb-3">${post.title}</h5>
              <p>${post.content || ""}</p>
            </div>
          </div>
        `;

        row.appendChild(col);
      });

      container.appendChild(sectionWrapper);
    });

  } catch (err) {
    console.error("CMS ERROR:", err);
  }
}
