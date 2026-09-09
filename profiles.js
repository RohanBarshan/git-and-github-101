const contributions = document.getElementById("contributions");
const repository = "ibrahim-alii/git-and-github-101";
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

fetch(`https://api.github.com/repos/${repository}/contents/profiles`)
  .then((response) => response.ok ? response.json() : Promise.reject(response.status))
  .then((files) => files.filter((file) => file.name.endsWith(".json") && file.name !== "template.json"))
  .then((files) => Promise.all(files.map((file) => fetch(file.download_url).then((response) => response.json()))))
  .then((profiles) => profiles.forEach(addProfile))
  .catch((error) => console.error("Could not load profiles:", error));
