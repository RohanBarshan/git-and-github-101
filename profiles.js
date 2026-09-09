const profileFiles = [
  "profiles/example.json",
  ...Array.from({ length: 20 }, (_, index) => `profiles/student-${String(index + 1).padStart(2, "0")}.json`)
];

const contributions = document.getElementById("contributions");

function addProfile(profile) {
  if (!profile.name || !profile.major || !profile.learning || !profile.favorite) return;

  const card = document.createElement("article");
  card.className = "contribution";
  card.innerHTML = `<h2></h2><p><strong>Major:</strong> </p><p><strong>Wants to build or learn:</strong> </p><p><strong>Favorite language or tool:</strong> </p>`;
  const fields = card.querySelectorAll("h2, p");
  fields[0].textContent = profile.name;
  fields[1].append(profile.major);
  fields[2].append(profile.learning);
  fields[3].append(profile.favorite);
  contributions.append(card);
}

Promise.all(
  profileFiles.map((file) => fetch(file)
    .then((response) => response.ok ? response.json() : null)
    .catch(() => null))
).then((profiles) => profiles.filter(Boolean).forEach(addProfile));
