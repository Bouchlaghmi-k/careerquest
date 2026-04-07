export function saveProfile(profile) {
  localStorage.setItem("careerquest_profile", JSON.stringify(profile));
}

export function getProfile() {
  const data = localStorage.getItem("careerquest_profile");
  return data ? JSON.parse(data) : null;
}

export function clearProfile() {
  localStorage.removeItem("careerquest_profile");
}