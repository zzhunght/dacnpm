import Sidebar from "../../Sidebar/Sidebar";
import styles from '../DefaultLayout/DefaultLayout.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    return <>
       
        <div className="wrapper-defaultlayout">
            {/* <Header/> */}
            <div className="container-defaultlayout">
                <Sidebar/>
                <div className="content-defaultlayout">
                    {children}
                </div>
            </div>
        </div >
    </>;
}

export default DefaultLayout; 