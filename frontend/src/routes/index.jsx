import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import StudentRegister from "../pages/StudentRegister";
import Payments from "../pages/Payments";
import Tables from "../pages/Tables";
import TableStudents from "../pages/TableStudents"
import TablePayments from "../pages/TablePayments";
import TableTotalStudents from "../pages/TableTotalStudents";
import TableMonthlyPerYear from "../pages/TableMonthlyPerYear";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-admin" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/table-students" element={<TableStudents />} />
        <Route path="/table-payments" element={<TablePayments/>} />
        <Route path="/table-total-students" element={<TableTotalStudents/>}/>
        <Route path="/table-monthly-per-year" element={<TableMonthlyPerYear/>}/>
      </Routes>
    </BrowserRouter>
  );
}

