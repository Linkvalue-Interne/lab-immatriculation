import axios from "axios";

export async function analyze() {
  try {
    const { data } = await axios.get("http://rpi:3000/take/picture", {
      responseType: "json"
    });

    const { first_name: firstName, last_name: lastName } = data.user || {};

    return {
      firstName: firstName,
      lastName: lastName,
      licensePlate: data.analyzedLicensePlate
    };
  } catch (error) {
    const { status, data } = error.response;

    if (status === 404) {
      const lowConfidenceError = new Error("no license plate");
      lowConfidenceError.plate = data.analyzedLicensePlate;

      throw lowConfidenceError;
    }
  }
}
