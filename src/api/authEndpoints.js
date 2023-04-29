import httpClient from "./httpClient"; // not using this yet

const AUTH_ENDPOINT = "/api/login";  // not using this yet

const SigninUser = (formData) =>
  //   httpClient.post(
  //     AUTH_ENDPOINT,
  //     formData
  //   );

  // faking for now
  Promise.resolve({
    jwt: "1234567890",
    status: 200,
    data: {
      user: {
        name: "name",
        email: "email",
      },
    },
  });

export { SigninUser };
