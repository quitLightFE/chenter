import pb from "@/lib/pocketbase";

export const loginUser = async data => {
  const authData = await pb
    .collection("users")
    .authWithPassword(
      data.email,
      data.password
    );

  return authData;
};

export const registerUser = async data => {
  const body = {
    email: data.email,
    password: data.password,
    passwordConfirm: data.password,
    name: data.name
  };

  const user = await pb
    .collection("users")
    .create(body);

  await loginUser({
    email: data.email,
    password: data.password
  });

  return user;
};

export const logoutUser = () => {
  pb.authStore.clear();
};

export const isAuthenticated = () => {
  return pb.authStore.isValid;
};

export const forgotPassword = async ({ email }) => {
  return await pb.collection("users").requestPasswordReset(email);
};