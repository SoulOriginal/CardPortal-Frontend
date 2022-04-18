export default function ({ store, redirect, route }) {
  const role = store.getters["auth/role"];
  var routeAuth = route.fullPath.indexOf(`/${role}`);
  if (routeAuth == -1) {
    return redirect(`/${role}`);
  }
  if (!store.getters["auth/check"]) {
    return redirect("/login");
  }
}
