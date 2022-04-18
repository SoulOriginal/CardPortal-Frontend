export default ({ store, redirect }) => {
  const role = store.getters["auth/role"];
  if (!store.getters["auth/check"]) {
    return redirect("/login");
  }
};
