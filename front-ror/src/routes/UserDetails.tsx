import { useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div>
      <h1>User Details</h1>
      <p className="text-blue-400 cursor-pointer" onClick={() => navigate(-1)}>
        Return
      </p>
    </div>
  );
};
export default UserDetails;
