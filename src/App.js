import { useState, useContext, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import DashboardPage from './admin/pages/DashboardPage'
import TypographyPage from './admin/pages/TypographyPage'
import ProfilePage from './admin/profile/ProfilePage'
import ChangePasswordPage from './admin/profile/ChangePasswordPage';
import UserPreferencesPage from './admin/profile/UserPreferencesPage'
import AdminBlankPage from './admin/pages/AdminBlankPage';
import AuthLayout from './admin/auth/AuthLayout';
import { AuthContext } from './shared/context/auth-context';
import StaticPages from './admin/pages/setting/static/StaticPages';
import SiteInformation from './admin/pages/setting/general/SiteInformation';
import AddUser from './admin/pages/roles-and-permissions/AddUser';
import ViewUser from './admin/pages/roles-and-permissions/ViewUser';
import AddNews from './admin/pages/news/AddNews';
import ViewNews from './admin/pages/news/ViewNews';
import AddBlog from './admin/pages/blogs/AddBlog';
import ViewBlog from './admin/pages/blogs/ViewBlog';
import AddJob from './admin/pages/jobs/AddJob';
import ViewJob from './admin/pages/jobs/ViewJob';
import AddEnt from './admin/pages/entertainment/AddEnt';
import ViewEnt from './admin/pages/entertainment/ViewEnt';

import 'font-awesome/css/font-awesome.min.css';
import './assets/css/app.css';

function App() {
    const auth = useContext(AuthContext);
    // console.log("Newest context", auth)
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('userData'));
        const resetToken = JSON.parse(localStorage.getItem('ResetToken'));
        // console.log("This is reset token", resetToken);
        if(data?.token && data?.userId){
            auth.login(data?.userId, data?.token);
        }
        if(resetToken?.rToken ){
            auth.Reset(resetToken?.userId, resetToken?.rToken);
        }
    }, [auth.login])
    
   
  return (
    <>
      {auth.siteData && (
        <Helmet>
          <title>{auth.siteData?.title || "Just Dubai Admin"}</title>
          <link
            rel="icon"
            type="image/x-icon"
            href={
              "http://localhost:8000/" + auth.siteData?.f_icon || "logo.jpg"
            }
          />
          <meta
            name="description"
            content="Beginner friendly page for learning React Helmet."
          />
        </Helmet>
      )}
      <BrowserRouter>
        <Routes>
          {!auth.isLoggedIn ? (
            <>
              <Route
                exact
                path="/login"
                element={<AuthLayout childComponent="LoginPage" />}
              />
              <Route
                exact
                path="/reset-password"
                element={<AuthLayout childComponent="ResetPage" />}
              />
              {auth?.resetToken && (
                <Route
                  exact
                  path="/reset-password/:userId"
                  element={<AuthLayout childComponent="ChangePasswordPage" />}
                />
              )}
              <Route
                exact
                path="*"
                element={<AuthLayout childComponent="LoginPage" />}
              />
            </>
          ) : (
            <>
              <Route exact path="/" element={<DashboardPage />} />
              <Route exact path="/profile" element={<ProfilePage />} />
              <Route exact path="/reset-password/:userId" element={<AuthLayout childComponent="ChangePasswordPage" />}/>
              <Route exact path="/change-password/:userId" element={<ChangePasswordPage />}/>
              <Route exact path="/preferences" element={<UserPreferencesPage />}/>
              <Route exact path="/typography" element={<TypographyPage />} />
              <Route exact path="/blank-page" element={<AdminBlankPage />} />

              {/* Entertainment */}
              <Route exact path="/entertainment/add-ent" element={<AddEnt />} />
              <Route exact path="/entertainment/view-ent" element={<ViewEnt />} />

              {/* Jobs */}
              <Route exact path="/jobs/add-job" element={<AddJob />} />
              <Route exact path="/jobs/view-job" element={<ViewJob />} />

              {/* Blogs */}
              <Route exact path="/blogs/add-blog" element={<AddBlog />} />
              <Route exact path="/blogs/view-blog" element={<ViewBlog />} />

              {/* News */}
              <Route exact path="/news/add-news" element={<AddNews />} />
              <Route exact path="/news/view-news" element={<ViewNews />} />

              {/* Roles and permissions */}
              <Route exact path="/roles-and-permissions/add-user" element={<AddUser />}/>
              <Route exact path="/roles-and-permissions/view-user" element={<ViewUser />}/>

              {/* Settings */}
              <Route exact path="/settings/general-settings/site-information" element={<SiteInformation />}/>
              <Route exact path="/settings/general-settings/static-pages" element={<StaticPages />} />
              <Route exact path="*" element={<DashboardPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
