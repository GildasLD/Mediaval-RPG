import Cookies from "js-cookie";
import moment from "moment";

const getLocalUser = () => {
  try {
    let currentStoredUser = Cookies.get("current-user");
    if (currentStoredUser) {
      return JSON.parse(currentStoredUser);
    }
  } catch (error) {
    console.warn(`🚀 > file: User.tsx:9 > getLocalUser > error:`, error);
  }
};
const formatDate = (date, format) => {
  if (date) {
    return moment(date).locale("fr").format(format);
  }
  return moment().locale("fr").format(format);
};
export { formatDate, getLocalUser };
