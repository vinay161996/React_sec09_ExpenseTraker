const getEmailAndToken = () => {
  const email = JSON.parse(localStorage.getItem("email"));
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    email,
    token,
  };
};

export default getEmailAndToken;
