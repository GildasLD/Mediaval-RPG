import Cookies from "js-cookie";
import moment from 'moment';

const getLocalUser = () => {
  try {

    let currentStoredUser = Cookies.get('currrent-user');
    if (currentStoredUser) {
      currentStoredUser = JSON.parse(currentStoredUser);
      return currentStoredUser;
    }
  } catch (error) {
    console.warn(`🚀 > file: User.tsx:9 > getLocalUser > error:`, error);
  }
};
const formatDate = (date, format) => {
  if (date) {
    return moment(date).locale('fr').format(format);
  }
  return moment().locale('fr').format(format);
};

export { getLocalUser, formatDate };
