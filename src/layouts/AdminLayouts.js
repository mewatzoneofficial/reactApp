import React from "react";

const AdminLayouts = () => {
  return (
    <>
      <div className="wrapper">
        <div className="sidebar" data-background-color="dark">
          <div className="sidebar-logo">
            <div className="logo-header" data-background-color="dark">
              <a href="index.html" className="logo">
                <img
                  src=""
                  alt="navbar brand"
                  className="navbar-brand"
                  height={20}
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right" />
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left" />
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt" />
              </button>
            </div>
          </div>
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-secondary">
                <li className="nav-item active">
                  <a href="#dashboard">
                    <i className="fas fa-home" />
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a data-bs-toggle="collapse" href="#forms">
                    <i className="fas fa-users" />
                    <p>User</p>
                    <span className="caret" />
                  </a>
                  <div className="collapse" id="forms">
                    <ul className="nav nav-collapse">
                      <li>
                        <a href="forms/forms.html">
                          <span className="sub-item">users</span>
                        </a>
                      </li>
                      <li>
                        <a href="forms/forms.html">
                          <span className="sub-item">staffs</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-panel">
          <div className="main-header">
            <div className="main-header-logo">
              <div className="logo-header" data-background-color="dark">
                <a href="index.html" className="logo">
                  <img
                    src="assets/img/kaiadmin/logo_light.svg"
                    alt="navbar brand"
                    className="navbar-brand"
                    height={20}
                  />
                </a>
                <div className="nav-toggle">
                  <button className="btn btn-toggle toggle-sidebar">
                    <i className="gg-menu-right" />
                  </button>
                  <button className="btn btn-toggle sidenav-toggler">
                    <i className="gg-menu-left" />
                  </button>
                </div>
                <button className="topbar-toggler more">
                  <i className="gg-more-vertical-alt" />
                </button>
              </div>
            </div>
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
              <div className="container-fluid">
                <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
                  <div className="input-group" />
                </nav>
                <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                  <li className="nav-item topbar-icon dropdown hidden-caret">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="messageDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-envelope" />
                    </a>
                    <ul
                      className="dropdown-menu messages-notif-box animated fadeIn"
                      aria-labelledby="messageDropdown"
                    >
                      <li>
                        <div className="dropdown-title d-flex justify-content-between align-items-center">
                          Messages
                          <a href="#" className="small">
                            Mark all as read
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="message-notif-scroll scrollbar-outer">
                          <div className="notif-center">
                            <a href="#">
                              <div className="notif-img">
                                <img
                                  src="assets/img/chadengle.jpg"
                                  alt="Img Profile"
                                />
                              </div>
                              <div className="notif-content">
                                <span className="subject">Chad</span>
                                <span className="block"> Ok, Thanks ! </span>
                                <span className="time">12 minutes ago</span>
                              </div>
                            </a>
                            <a href="#">
                              <div className="notif-img">
                                <img
                                  src="assets/img/talha.jpg"
                                  alt="Img Profile"
                                />
                              </div>
                              <div className="notif-content">
                                <span className="subject">Talha</span>
                                <span className="block"> Hi, Apa Kabar ? </span>
                                <span className="time">17 minutes ago</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a className="see-all" href="javascript:void(0);">
                          See all messages
                          <i className="fa fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item topbar-icon dropdown hidden-caret">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="notifDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-bell" />
                      <span className="notification">4</span>
                    </a>
                    <ul
                      className="dropdown-menu notif-box animated fadeIn"
                      aria-labelledby="notifDropdown"
                    >
                      <li>
                        <div className="dropdown-title">
                          You have 4 new notification
                        </div>
                      </li>
                      <li>
                        <div className="notif-scroll scrollbar-outer">
                          <div className="notif-center">
                            <a href="#">
                              <div className="notif-icon notif-primary">
                                <i className="fa fa-user-plus" />
                              </div>
                              <div className="notif-content">
                                <span className="block">
                                  {" "}
                                  New user registered{" "}
                                </span>
                                <span className="time">5 minutes ago</span>
                              </div>
                            </a>
                            <a href="#">
                              <div className="notif-icon notif-danger">
                                <i className="fa fa-heart" />
                              </div>
                              <div className="notif-content">
                                <span className="block">
                                  {" "}
                                  Farrah liked Admin{" "}
                                </span>
                                <span className="time">17 minutes ago</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a className="see-all" href="javascript:void(0);">
                          See all notifications
                          <i className="fa fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item topbar-user dropdown hidden-caret">
                    <a
                      className="dropdown-toggle profile-pic"
                      data-bs-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                    >
                      <div className="avatar-sm">
                        <img
                          src="assets/img/profile.jpg"
                          alt="..."
                          className="avatar-img rounded-circle"
                        />
                      </div>
                      <span className="profile-username">
                        <span className="op-7">Hi,</span>
                        <span className="fw-bold">Hizrian</span>
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-user animated fadeIn">
                      <div className="dropdown-user-scroll scrollbar-outer">
                        <li>
                          <div className="user-box">
                            <div className="avatar-lg">
                              <img
                                src="assets/img/profile.jpg"
                                alt="image profile"
                                className="avatar-img rounded"
                              />
                            </div>
                            <div className="u-text">
                              <h4>Hizrian</h4>
                              <p className="text-muted">hello@example.com</p>
                              <a
                                href="profile.html"
                                className="btn btn-xs btn-secondary btn-sm"
                              >
                                View Profile
                              </a>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            My Profile
                          </a>
                          <a className="dropdown-item" href="#">
                            My Balance
                          </a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Account Setting
                          </a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">
                            Logout
                          </a>
                        </li>
                      </div>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="container">
            <div className="page-inner">
              <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                  <h3 className="fw-bold mb-3">Dashboard</h3>
                  <h6 className="op-7 mb-2">Admin Dashboard</h6>
                </div>
                <div className="ms-md-auto py-2 py-md-0">
                  <a href="#" className="btn btn-label-info btn-round me-2">
                    Manage
                  </a>
                  <a href="#" className="btn btn-primary btn-round">
                    Add Customer
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 col-md-3">
                  <div className="card card-stats card-round">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-stats ms-3 ms-sm-0">
                          <div className="numbers">
                            <p className="card-category">Visitors</p>
                            <h4 className="card-title">1,294</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="card card-stats card-round">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-stats ms-3 ms-sm-0">
                          <div className="numbers">
                            <p className="card-category">Order</p>
                            <h4 className="card-title">576</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-round">
                    <div className="card-header">
                      <div className="card-head-row card-tools-still-right">
                        <div className="card-title">Transaction History</div>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="table-responsive">
                        <table className="table align-items-center mb-0">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Payment Number</th>
                              <th scope="col" className="text-end">
                                Date &amp; Time
                              </th>
                              <th scope="col" className="text-end">
                                Amount
                              </th>
                              <th scope="col" className="text-end">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-icon btn-round btn-success btn-sm me-2">
                                  <i className="fa fa-check" />
                                </button>
                                Payment from #10231
                              </th>
                              <td className="text-end">Mar 19, 2020, 2.45pm</td>
                              <td className="text-end">$250.00</td>
                              <td className="text-end">
                                <span className="badge badge-success">
                                  Completed
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <button className="btn btn-icon btn-round btn-success btn-sm me-2">
                                  <i className="fa fa-check" />
                                </button>
                                Payment from #10231
                              </th>
                              <td className="text-end">Mar 19, 2020, 2.45pm</td>
                              <td className="text-end">$250.00</td>
                              <td className="text-end">
                                <span className="badge badge-success">
                                  Completed
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
              <nav className="pull-left">
                <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link" href="http://www.themekita.com">
                      ThemeKita
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {"{"}" "{"}"}
                      Help{"{"}" "{"}"}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {"{"}" "{"}"}
                      Licenses{"{"}" "{"}"}
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="copyright">
                2024, made with <i className="fa fa-heart heart text-danger" />{" "}
                by
                <a href="http://www.themekita.com">ThemeKita</a>
              </div>
              <div>
                Distributed by
                <a target="_blank" href="https://themewagon.com/">
                  ThemeWagon
                </a>
                .
              </div>
            </div>
          </footer>
        </div>
        <div className="custom-template">
          <div className="title">Settings</div>
          <div className="custom-content">
            <div className="switcher">
              <div className="switch-block">
                <h4>Logo Header</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="selected changeLogoHeaderColor"
                    data-color="dark"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="blue"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="purple"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="light-blue"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="green"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="orange"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="red"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="white"
                  />
                  <br />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="dark2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="blue2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="purple2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="light-blue2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="green2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="orange2"
                  />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="red2"
                  />
                </div>
              </div>
              <div className="switch-block">
                <h4>Navbar Header</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="dark"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="blue"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="purple"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="light-blue"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="green"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="orange"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="red"
                  />
                  <button
                    type="button"
                    className="selected changeTopBarColor"
                    data-color="white"
                  />
                  <br />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="dark2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="blue2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="purple2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="light-blue2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="green2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="orange2"
                  />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="red2"
                  />
                </div>
              </div>
              <div className="switch-block">
                <h4>Sidebar</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="changeSideBarColor"
                    data-color="white"
                  />
                  <button
                    type="button"
                    className="selected changeSideBarColor"
                    data-color="dark"
                  />
                  <button
                    type="button"
                    className="changeSideBarColor"
                    data-color="dark2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="custom-toggle">
            <i className="icon-settings" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayouts;
