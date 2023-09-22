import React from 'react'
import '../assets/css/style.css'
import { Link, useNavigate } from "react-router-dom";

export default function Sidbar() {
  return (
    <div>

      <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">





          <li class="nav-item">

            <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-layout-text-window-reverse"></i><span>
                <Link to="/home" className=''><h4>Home</h4></Link>
              </span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-layout-text-window-reverse"></i><span>
                <Link to="/list" className=''><h4>List</h4></Link>
              </span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
          </li>
        </ul>

      </aside>

    </div>
  )
}
