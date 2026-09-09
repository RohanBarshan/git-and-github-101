const profileFiles = [
  "profiles/example.json",
  ...Array.from({ length: 20 }, (_, index) => `profiles/student-${String(index + 1).padStart(2, "0")}.json`)
];

const contributions = document.getElementById("contributions");
const labels = {
  major: "Major",
  learning: "Wants to build or learn",
  favorite: "Favorite language or tool"
};

function addProfile(profile) {
  if (!profile.name) return;

  const card = document.createElement("article");
  card.className = "contribution";
  const heading = document.createElement("h2");
  heading.textContent = profile.name;
  card.append(heading);

  Object.entries(profile)
    .filter(([key, value]) => key !== "name" && value)
    .forEach(([key, value]) => {
      const line = document.createElement("p");
      const label = document.createElement("strong");
      label.textContent = `${labels[key] || `${key.charAt(0).toUpperCase()}${key.slice(1)}`}:`;
      line.append(label, ` ${value}`);
      card.append(line);
    });

  contributions.append(card);
}

Promise.all(
  profileFiles.map((file) => fetch(file)
    .then((response) => response.ok ? response.json() : null)
    .catch(() => null))
).then((profiles) => profiles.filter(Boolean).forEach(addProfile));
