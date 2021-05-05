export const goToListTrips = (history) => {
  history.push("/trips/list");
};

export const goToApplicationForm = (history) => {
  history.push("/trips/application");
};

export const goToLoginPage = (history) => {
  history.push("/login");
};

export const goToAdminHomePage = (history) => {
  history.push("/admin/trips/list");
};

export const goToCreateTrip = (history) => {
  history.push("/admin/trips/create");
};

export const goToTripsDetails = (history) => {
  history.push("/admin/trips/:id");
};

export const goToLastPage = (history) => {
  history.goBack();
};
