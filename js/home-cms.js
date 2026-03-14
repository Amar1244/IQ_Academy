// ===============================
// SANITY CONFIG (✔ CORRECT)
// ===============================
const SANITY_PROJECT_ID = "uf4i0j52";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2026-01-10"; // ❗ NO "v" here

// ===============================
// LOAD ADVERTISEMENT POSTS (HOME)
// ===============================
async function loadAdvertisementPosts() {
  const query = `
    *[_type == "sectionPost" &&
      section->title == "Advertisement" &&
      section->page->slug.current == "home"
    ] | order(_createdAt desc) {
      title,
      content,
      "imageUrl": image.asset->url
    }
  `;

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;

  console.log("Sanity Fetch URL:", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Sanity Data:", data);

    const container = document.getElementById("cms-advertisement");

    if (!container) {
      console.error("❌ cms-advertisement container not found");
      return;
    }

    container.innerHTML = "";

    if (!data.result || data.result.length === 0) {
      container.innerHTML = "<p>No advertisements found.</p>";
      return;
    }

    data.result.forEach(post => {
      const col = document.createElement("div");
      col.className = "col-lg-4 col-md-6 wow fadeInUp";

      col.innerHTML = `
        <div class="course-item bg-light">
          <div class="position-relative overflow-hidden image-container">
            ${
              post.imageUrl
                ? `<img class="img-fluid" src="${post.imageUrl}" alt="${post.title}">`
                : ""
            }
          </div>
          <div class="text-center p-4 pb-0">
            <h5 class="mb-3">${post.title}</h5>
            <p>${post.content || ""}</p>
          </div>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (error) {
    console.error("❌ Sanity CMS Fetch Error:", error);
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", loadAdvertisementPosts);
