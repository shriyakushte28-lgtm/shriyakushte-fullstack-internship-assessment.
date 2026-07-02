import { Navigate } from "react-router-dom";

function StudentRoute({ children }) {

    const role = localStorage.getItem("role");

    if (role !== "STUDENT") {

        return <Navigate to="/login" replace />;

    }

    return children;

}

export default StudentRoute;