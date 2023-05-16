import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import  './Layout.css';
const Layout =() =>{
    const { collapseSidebar } = useProSidebar();
    return (
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon />}>Pocetna stranica</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Moji podaci</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Moji oglasi</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Praceni oglasi</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>Ugovori</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>O nama</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <h1 style={{ color: "white", marginLeft: "5rem" }}>
         Ovde ide prijdshfjsadfkl;sahfjl shhdsf jhdfsk hdfskjh fkjdsh fkjsdhfk jdshjdfj dhfskj fhdsklja fksh sdkhf jskdfh sakjfh djs hakjf 
        </h1>
      </main>
      </div>
    );
}
export default Layout;