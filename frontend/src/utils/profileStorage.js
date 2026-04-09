const PROFILE_STORAGE_KEY = "careerquest_profile";
const PROFILE_UPDATED_EVENT = "careerquest-profile-updated";

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
}

export function getProfile() {
  const data = localStorage.getItem(PROFILE_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
}

export function subscribeToProfileUpdates(callback) {
  const handler = () => {
    callback(getProfile());
  };

  window.addEventListener(PROFILE_UPDATED_EVENT, handler);

  return () => {
    window.removeEventListener(PROFILE_UPDATED_EVENT, handler);
  };
}