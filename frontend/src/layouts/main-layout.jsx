import { Outlet, useNavigate } from "react-router-dom";
import supabase from "../client";
export default function MainLayout(){
  const navigate = useNavigate();

  const logoutUser = () => {
    const { error } = supabase.auth.signOut();

    if(error){
      console.log("failed to log out user");
    } else {
      navigate("/login");    
    }
  }
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><button className="btn btn-link" onClick={() => logoutUser()}>Logout</button></li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  )
}
