import React from 'react'
import Header from './pages/Header'
import Footer from './pages/Footer'
// import TableLoader from './pages/TableLoader'

function Layout({children}) {
  return (
    <>
    {/* {showLoader && <TableLoader />} */}
    <div className="layout-wrapper">
      <Header />
      <div className="main-content">
       {children}
        <Footer />
      </div>
    </div>
  </>
  )
}

export default Layout
