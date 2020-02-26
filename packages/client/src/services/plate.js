import axios from "axios";

const serverURL = process.env.VUE_APP_SERVER_URL || "http://localhost:3000";

export async function analyze() {
  try {
    const { data } = await axios.get(`${serverURL}/take/picture`, {
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

export async function replaceLowConfidencePlateWithRealPlate(
  lowConfidencePlate,
  realPlate
) {
  try {
    await axios.post(`${serverURL}/revise/fail`, {
      new: realPlate,
      old: lowConfidencePlate
    });

    return true;
  } catch (error) {
    console.error(error.response.data);

    return false;
  }
}
