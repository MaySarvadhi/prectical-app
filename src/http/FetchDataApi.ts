import { api } from "./api";

export default {
  getAllCountries: () => {
    return api.getMethod("all");
  },
};
