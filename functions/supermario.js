exports.handler = async () => {
  console.log("Function called");

  const data = { name: "mk", age: "24", job: "NextJs Developer" };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
